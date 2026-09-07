import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * Every name a runtime file imports from `#imports` has to exist in the Vue
 * stubs, because the Vue builds alias `#imports` to them. `src/runtime/vue/stubs/`
 * holds three entry points — `none`, `vue-router`, `inertia`, chosen by the
 * vite plugin's `router` option — and each re-exports `base` and adds its own
 * `useRoute` / `useRouter`.
 *
 * This exists because the gap is invisible everywhere it would be cheap to
 * catch. `#imports` is a Nuxt alias, so `typecheck`, `test` and `build` all
 * resolve it against Nuxt's generated types, where every name is present; the
 * stubs are only consulted when something bundles *without* Nuxt. In this
 * repository that is `pnpm repl:build`, which runs in `deploy.yml` and in no
 * other workflow. So a missing export leaves `ci` green, merges, and takes the
 * Pages deploy down on `main` — which is exactly what `onNuxtReady` did over
 * #541, #542 and #543 before this file was written. rolldown reports it as
 * `[MISSING_EXPORT] "onNuxtReady" is not exported by "dist/runtime/vue/stubs/none.js"`
 * and fails the whole bundle; it is not a warning and not a partial build.
 *
 * Read as text rather than imported. Importing `#imports` from a test resolves
 * it through Nuxt, which is the resolution this check exists to bypass, and
 * importing the stubs directly would only prove they load — not that they cover
 * what the components ask for.
 */

const ROOT = resolve(import.meta.dirname, '../..')
const RUNTIME = resolve(ROOT, 'src/runtime')
const STUBS = resolve(RUNTIME, 'vue/stubs')

/** Every `.vue`/`.ts` file under `src/runtime`, recursively. */
function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(dir, entry.name)
    if (entry.isDirectory()) return sources(path)
    return /\.(?:vue|ts)$/.test(entry.name) ? [path] : []
  })
}

/** The named bindings of every `import { … } from '#imports'` in a file. */
function importedNames(code: string): string[] {
  return [...code.matchAll(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*['"]#imports['"]/g)]
    .flatMap(match => match[1]!.split(','))
    .map(name => name.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0]!.trim())
    .filter(Boolean)
}

/**
 * What a stub entry point exports, following its one `export * from './base'`.
 * Deliberately shallow: the stubs are flat by convention and a deeper chain
 * should be visible in review, not silently resolved by a test helper.
 */
function exportedNames(entry: string): Set<string> {
  const read = (name: string) => readFileSync(resolve(STUBS, `${name}.ts`), 'utf8')
  const names = (code: string) => [
    ...[...code.matchAll(/export\s+(?:const|function)\s+([A-Za-z_$][\w$]*)/g)].map(match => match[1]!),
    ...[...code.matchAll(/export\s*\{([^}]*)\}/g)]
      .flatMap(match => match[1]!.split(','))
      .map(name => name.trim().split(/\s+as\s+/).pop()!.trim())
      .filter(Boolean)
  ]

  const code = read(entry)
  const inherited = /export\s+\*\s+from\s+['"]\.\/base['"]/.test(code) ? names(read('base')) : []
  return new Set([...names(code), ...inherited])
}

const ENTRIES = ['none', 'vue-router', 'inertia']

const used = new Map<string, string[]>()
for (const file of sources(RUNTIME)) {
  for (const name of importedNames(readFileSync(file, 'utf8'))) {
    used.set(name, [...(used.get(name) ?? []), file.slice(ROOT.length + 1)])
  }
}

describe('the Vue stubs for `#imports`', () => {
  it('reads a set of imports worth checking', () => {
    // Every assertion below is vacuous if the scan finds nothing — a renamed
    // directory or a tightened regex would leave this file passing silently.
    expect(used.size).toBeGreaterThan(10)
    expect([...used.keys()]).toContain('useAppConfig')
  })

  it.each(ENTRIES)('covers every imported name in `%s`', (entry) => {
    const exported = exportedNames(entry)

    // Named with their call sites: the fix is to add the export, and knowing
    // which component asked for it is what says whether a stub or a no-op is
    // the honest implementation.
    const missing = [...used.entries()]
      .filter(([name]) => !exported.has(name))
      .map(([name, files]) => `${name} (${files.join(', ')})`)

    expect(missing).toEqual([])
  })
})
