import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'
import { nuxtInclude, vueInclude, vueExclude } from '../vitest-include'

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
// `import.meta.url` is not a file: URL under either project's transform, so
// the directory is derived from the vitest root instead.
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
    const nuxt = await glob(nuxtInclude, { cwd: testDir, ignore: ['**/node_modules/**'] })
    const vue = await glob(vueInclude, { cwd: testDir, ignore: ['**/node_modules/**', ...vueExclude] })

    const collected = new Set([...nuxt, ...vue])
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

    expect(nuxtOnly).toEqual([])
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
