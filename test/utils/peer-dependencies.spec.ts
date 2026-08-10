import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * `vue` is a peer dependency here and is **not** one upstream (#99).
 *
 * Upstream nuxt/ui keeps `vue` in `devDependencies` only, so nothing in the
 * dependency graph tells a package manager which Vue this library needs. The
 * gap is not theoretical: `reka-ui`, which we depend on, declares
 * `vue: >= 3.4.0`, so a consumer on 3.4 satisfies every declared constraint,
 * installs cleanly, and then hits `useTemplateRef is not a function` the first
 * time a component mounts — a runtime failure that install-time metadata could
 * have refused.
 *
 * That makes the declaration a deliberate divergence, which means a faithful
 * port of any upstream manifest change would delete it and look correct doing
 * so. This pins it, and pins the floor to the evidence rather than to a number
 * someone once typed: the floor is derived from the Vue APIs `src/` actually
 * imports, so raising the requirement is impossible to forget and lowering it
 * is impossible to do quietly.
 */
// Same derivation as `vitest-include.spec.ts` and `skill-manifest.spec.ts`:
// resolving a relative path against `import.meta.url` returns an `http:` URL
// under vitest, so the root comes from the vitest cwd instead.
const repoRoot = process.cwd()

/**
 * The Vue minor each API was introduced in.
 *
 * Only APIs that raise the floor are worth listing — anything available since
 * 3.0 tells us nothing. `useId` and `useTemplateRef` both landed in 3.5;
 * `defineModel` became stable in 3.4 and `toValue` in 3.3.
 */
const INTRODUCED_IN: Record<string, string> = {
  useId: '3.5',
  useTemplateRef: '3.5',
  onWatcherCleanup: '3.5',
  onEffectCleanup: '3.5',
  defineModel: '3.4',
  toValue: '3.3'
}

/**
 * Compares `major.minor` pairs component-wise.
 *
 * Not `Number('3.10')` — that is 3.1, which sorts *below* 3.9, so a naive
 * float comparison silently inverts the moment Vue reaches its tenth minor.
 * Nothing about the wrong answer would look wrong.
 */
const compare = (a: string, b: string) => {
  const [aMajor = 0, aMinor = 0] = a.split('.').map(Number)
  const [bMajor = 0, bMinor = 0] = b.split('.').map(Number)

  return aMajor - bMajor || aMinor - bMinor
}

describe('peer dependencies', () => {
  let manifest: { peerDependencies: Record<string, string>, peerDependenciesMeta?: Record<string, unknown>, devDependencies: Record<string, string> }
  let sources: string[]

  beforeAll(async () => {
    manifest = JSON.parse(await readFile(join(repoRoot, 'package.json'), 'utf8'))

    const files = await glob(['**/*.vue', '**/*.ts'], { cwd: join(repoRoot, 'src') })
    // Every assertion below is vacuous against an empty read — an empty corpus
    // imports no API and demands no floor.
    expect(files.length).toBeGreaterThan(100)

    sources = await Promise.all(files.map(file => readFile(join(repoRoot, 'src', file), 'utf8')))
  })

  it('declares `vue`, which upstream does not', () => {
    expect(manifest.peerDependencies.vue).toBeDefined()

    // Required, not optional: a build of this library without Vue is not a
    // build with a missing extra, it is not a build.
    expect(manifest.peerDependenciesMeta?.vue).toBeUndefined()
  })

  it('requires at least the Vue that `src/` actually imports', () => {
    // Named imports from `vue` itself. `useId` also exists on `reka-ui`, and
    // attributing that one to Vue would raise the floor for the wrong reason.
    const imported = new Set<string>()
    for (const source of sources) {
      for (const [, names] of source.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+'vue'/g)) {
        for (const name of names!.split(',')) {
          imported.add(name.trim().split(/\s+as\s+/)[0]!)
        }
      }
    }

    // Anchors the scan: if the import pattern ever stops matching, the floor
    // collapses to nothing and every comparison below passes vacuously.
    expect(imported.has('computed')).toBe(true)

    const demanded = [...imported]
      .filter(name => name in INTRODUCED_IN)
      .map(name => [name, INTRODUCED_IN[name]!] as const)
      .sort(([, a], [, b]) => compare(b, a))

    expect(demanded.length).toBeGreaterThan(0)

    const [api, floor] = demanded[0]!
    const declared = manifest.peerDependencies.vue!.match(/(\d+)\.(\d+)/)
    expect(declared).not.toBeNull()

    // The API is named in the failure message, so it says which import moved
    // the floor rather than only that two numbers differ.
    expect(
      compare(`${declared![1]}.${declared![2]}`, floor),
      `the \`vue\` peer range must cover \`${api}\`, which Vue added in ${floor}`
    ).toBeGreaterThanOrEqual(0)
  })

  it('develops against a Vue that satisfies its own peer range', () => {
    // The two drifting apart is how a library ends up passing its whole suite
    // on a version its consumers are not required to have.
    const peer = manifest.peerDependencies.vue!.match(/(\d+)\.(\d+)/)!
    const dev = manifest.devDependencies.vue!.match(/(\d+)\.(\d+)/)!

    expect(compare(`${dev[1]}.${dev[2]}`, `${peer[1]}.${peer[2]}`)).toBeGreaterThanOrEqual(0)
  })
})
