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
  toValue: '3.3'
}

/**
 * Compiler macros, which raise the floor without ever appearing in an import.
 *
 * `defineModel` is used in 22 files here and imported from `vue` in none of
 * them — `<script setup>` resolves it at compile time. Scanning only import
 * statements therefore cannot see it, which makes macros the APIs most likely
 * to raise the requirement silently: adding one leaves nothing for an
 * import-based guard to notice.
 */
const MACRO_INTRODUCED_IN: Record<string, string> = {
  defineModel: '3.4',
  defineSlots: '3.3',
  defineOptions: '3.3'
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

/**
 * The lowest `major.minor` a range admits, across every `||` alternative.
 *
 * Reading only the first pair in the string is the trap: `^3.5.0 || ^3.4.0`
 * starts with `3.5` and admits `3.4.9`, so a first-match check waves through
 * exactly the version this whole file exists to exclude — and it is the natural
 * second move for someone told they may not simply lower the floor. Repo
 * convention writes multi-major peers this way (`typescript`, `zod`,
 * `vue-router`), so the shape is expected, not hypothetical.
 *
 * Returns `null` when the range carries no version at all — `workspace:*`,
 * `catalog:`, a git URL, or the empty string, which npm reads as "anything".
 */
const lowestMinor = (range: string) => {
  const found = [...range.matchAll(/(\d+)\.(\d+)/g)].map(([, major, minor]) => `${major}.${minor}`)

  return found.length ? found.sort(compare)[0]! : null
}

describe('peer dependencies', () => {
  let manifest: { dependencies: Record<string, string>, peerDependencies: Record<string, string>, peerDependenciesMeta?: Record<string, unknown>, devDependencies: Record<string, string> }
  let dependencies: Record<string, string>
  let sources: string[]

  beforeAll(async () => {
    manifest = JSON.parse(await readFile(join(repoRoot, 'package.json'), 'utf8'))
    dependencies = manifest.dependencies

    const files = await glob(['**/*.vue', '**/*.ts'], { cwd: join(repoRoot, 'src') })
    // Every assertion below is vacuous against an empty read — an empty corpus
    // imports no API and demands no floor.
    expect(files.length).toBeGreaterThan(100)

    sources = await Promise.all(files.map(file => readFile(join(repoRoot, 'src', file), 'utf8')))
  })

  it('declares `vue` as a required peer', () => {
    // Checked for a usable range, not merely for presence: `""` is a valid
    // JSON value and npm reads it as "any version", which is looser than the
    // 3.4 this exists to exclude.
    expect(lowestMinor(manifest.peerDependencies.vue ?? ''), 'package.json must declare a `vue` peer range').not.toBeNull()

    // Required, not optional: a build of this library without Vue is not a
    // build with a missing extra, it is not a build. An explicit
    // `optional: false` means the same thing as the absent key, so it passes.
    expect(
      (manifest.peerDependenciesMeta?.vue as { optional?: boolean } | undefined)?.optional ?? false,
      'the `vue` peer must not be optional'
    ).toBe(false)
  })

  it('names only Vue APIs that exist', async () => {
    // `INTRODUCED_IN` is hand-typed, and everything downstream trusts it — a
    // misspelled key silently contributes no floor at all, so the guard would
    // go on passing while the API it was added for stopped raising anything.
    // Checked against the installed Vue rather than a second list: this cannot
    // prove *when* an API arrived, but it does prove each name is real.
    const vue = await import('vue') as Record<string, unknown>

    // Macros are excluded: they are compile-time constructs, and `vue` exporting
    // a runtime stub for them is incidental rather than the thing to check.
    const missing = Object.keys(INTRODUCED_IN).filter(name => typeof vue[name] !== 'function')

    expect(missing).toEqual([])
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

    // Macros are found by call site, not by import, because there is no import
    // to find. Anchored the same way.
    const used = new Set<string>()
    for (const [macro] of Object.entries(MACRO_INTRODUCED_IN)) {
      if (sources.some(source => new RegExp(`\\b${macro}\\s*[<(]`).test(source))) {
        used.add(macro)
      }
    }
    expect(used.has('defineModel')).toBe(true)

    const demanded = [
      ...[...imported].filter(name => name in INTRODUCED_IN).map(name => [name, INTRODUCED_IN[name]!] as const),
      ...[...used].map(name => [name, MACRO_INTRODUCED_IN[name]!] as const)
    ].sort(([, a], [, b]) => compare(b, a))

    expect(demanded.length).toBeGreaterThan(0)

    const [api, floor] = demanded[0]!
    const declared = lowestMinor(manifest.peerDependencies.vue ?? '')
    expect(declared, 'package.json must declare a `vue` peer range').not.toBeNull()

    // The API is named in the failure message, so it says which import moved
    // the floor rather than only that two numbers differ.
    expect(
      compare(declared!, floor),
      `the \`vue\` peer range admits ${declared}, below the ${floor} that \`${api}\` needs`
    ).toBeGreaterThanOrEqual(0)
  })

  it('keeps `reka-ui` and `vaul-vue` exact-pinned, the way upstream pins them', () => {
    // The sibling invariant to the `vue` peer, and until now the one without
    // enforcement: `.sync/PORTING.md` §2 says these two move only when upstream
    // moves them, but a `chore(deps)` port that adds a caret would compile,
    // leave the suite green, and ship. Prose that nothing checks is the exact
    // shape this repository keeps getting caught by.
    //
    // The rule is only "no range operator" — the *version* deliberately is not
    // pinned here, because it tracks upstream and a port is supposed to change
    // it. What a port must not do is loosen it.
    const pinned = ['reka-ui', 'vaul-vue']

    const loosened = pinned
      .map(name => [name, dependencies[name]] as const)
      .filter(([, range]) => range === undefined || !/^\d+\.\d+\.\d+/.test(range))
      .map(([name, range]) => `${name}: ${range ?? 'missing'}`)

    expect(loosened).toEqual([])
  })

  it('develops against a Vue that satisfies its own peer range', () => {
    // The two drifting apart is how a library ends up passing its whole suite
    // on a version its consumers are not required to have.
    const peer = lowestMinor(manifest.peerDependencies.vue ?? '')
    const dev = lowestMinor(manifest.devDependencies.vue ?? '')

    // Guarded rather than `!`-asserted: a `workspace:*` or `catalog:` value
    // carries no version, and a `TypeError` here would say nothing about which
    // field is unusable.
    expect(dev, 'devDependencies.vue must pin a version this can compare').not.toBeNull()
    expect(peer, 'package.json must declare a `vue` peer range').not.toBeNull()

    expect(
      compare(dev!, peer!),
      `the \`vue\` devDependency (${dev}) is below the lowest version the peer range admits (${peer})`
    ).toBeGreaterThanOrEqual(0)
  })
})
