import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'
import { moduleInclude, nuxtInclude, vueInclude, vueExclude } from '../vitest-include'

/**
 * A spec that no project collects cannot fail, so nothing about the suite ever
 * says it is missing — `test/Sidebar.spec.ts` sat unrun long enough to grow a
 * full `renderEach` matrix and an axe assertion, and the only evidence was the
 * snapshot file it never created.
 *
 * This asserts the property directly: every `*.spec.ts` under `test/` is
 * reachable by at least one project's patterns. It is the one check that would
 * have caught both defects behind #83 — the orphaned file and the two projects
 * spelling `components/**` differently.
 */
// `import.meta.url` itself is a normal `file:` URL here, but resolving a
// relative path against it is not: `new URL('..', import.meta.url)` comes back
// as `http://localhost:3000/test` in both projects, and `fileURLToPath` then
// throws `The URL must be of scheme file`. Derived from the vitest root
// instead — which is also why the `beforeAll` below has to prove the root
// resolved.
const testDir = join(process.cwd(), 'test')

const listSpecs = () => glob('**/*.spec.ts', { cwd: testDir, ignore: ['**/node_modules/**'] })

describe('vitest include patterns', () => {
  // Every assertion below passes vacuously if `testDir` is wrong — an empty
  // glob has no orphans. Anchoring on this file proves the root resolved.
  beforeAll(async () => {
    expect(await listSpecs()).toContain('utils/vitest-include.spec.ts')
  })

  it('collect every spec file in the tree', async () => {
    const all = await listSpecs()
    const module = await glob(moduleInclude, { cwd: testDir, ignore: ['**/node_modules/**'] })
    const nuxt = await glob(nuxtInclude, { cwd: testDir, ignore: ['**/node_modules/**'] })
    const vue = await glob(vueInclude, { cwd: testDir, ignore: ['**/node_modules/**', ...vueExclude] })

    const collected = new Set([...module, ...nuxt, ...vue])
    const orphans = all.filter(spec => !collected.has(spec)).sort()

    // Named rather than counted: the failure message has to say which file is
    // dead, or the next person is back to diffing snapshot directories.
    expect(orphans).toEqual([])
  })

  it('agree on the shared directories, so a spec is not silently single-project', async () => {
    const nuxt = new Set(await glob(nuxtInclude, { cwd: testDir, ignore: ['**/node_modules/**'] }))
    const vue = new Set(await glob(vueInclude, { cwd: testDir, ignore: ['**/node_modules/**', ...vueExclude] }))

    // `plugins/` is nuxt-only by design and the `vueExclude` directories are
    // Nuxt-only surfaces; everything else must be in both. Anything that drops
    // out for a reason not written down in `vitest-include.ts` fails here.
    const declaredNuxtOnly = /^(?:plugins\/|components\/content\/|components\/nuxt\/)/
    const nuxtOnly = [...nuxt].filter(spec => !vue.has(spec) && !declaredNuxtOnly.test(spec)).sort()

    // Checked in both directions on purpose. Only asserting one of them repeats
    // the shape of the bug this file exists to prevent: a spec running in a
    // single project, invisibly. There is no declared vue-only category, so
    // any such spec is a mistake by definition.
    const vueOnly = [...vue].filter(spec => !nuxt.has(spec)).sort()

    expect({ nuxtOnly, vueOnly }).toEqual({ nuxtOnly: [], vueOnly: [] })
  })

  it('keep the `module` suite to itself', async () => {
    const module = new Set(await glob(moduleInclude, { cwd: testDir, ignore: ['**/node_modules/**'] }))
    const others = new Set([
      ...await glob(nuxtInclude, { cwd: testDir, ignore: ['**/node_modules/**'] }),
      ...await glob(vueInclude, { cwd: testDir, ignore: ['**/node_modules/**', ...vueExclude] })
    ])

    // Each `module/` spec boots a Nuxt instance with `loadNuxt`, which takes
    // seconds, cannot happen inside a Nuxt or happy-dom environment, and is
    // kept out of the shared fork pool on purpose (see
    // `vitest.module.config.ts`). A pattern that let one of them into another
    // project would not fail — it would run there and be slow, or hang — so
    // the separation is asserted rather than left to the patterns looking
    // right.
    expect([...module].filter(spec => others.has(spec)).sort()).toEqual([])

    // And the mirror: a `module/` spec that no project runs. `moduleInclude`
    // is the only pattern covering that directory, so a typo in it is silent.
    expect([...module].sort()).toEqual((await listSpecs()).filter(spec => spec.startsWith('module/')).sort())
  })

  it('do not leave snapshots behind for specs that no longer exist', async () => {
    const specs = new Set(await listSpecs())
    const snapshots = await glob('**/__snapshots__/*.spec.ts.snap', { cwd: testDir, ignore: ['**/node_modules/**'] })

    // `__snapshots__/Foo-vue.spec.ts.snap` and `__snapshots__/Foo.spec.ts.snap`
    // both belong to `Foo.spec.ts` one directory up — see `resolveSnapshotPath`
    // in vitest.config.ts.
    const orphans = snapshots.filter((snap) => {
      const spec = snap
        .replace('/__snapshots__/', '/')
        .replace(/-vue\.spec\.ts\.snap$/, '.spec.ts')
        .replace(/\.spec\.ts\.snap$/, '.spec.ts')
      return !specs.has(spec)
    }).sort()

    expect(orphans).toEqual([])
  })
})
