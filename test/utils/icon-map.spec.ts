import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import iconMap from '../../.sync/icon-map.json'

/**
 * Guards `.sync/icon-map.json`, the table a porter reads when an upstream diff
 * hardcodes a literal `i-lucide-*` name.
 *
 * It exists because the table rots silently. Nothing imports it, nothing
 * renders it, and a wrong entry only shows up as the wrong glyph in a shipped
 * component — which is how it came to map `i-lucide-check` to `main/CheckIcon`,
 * `i-lucide-x` to `actions/Cross20Icon` and `i-lucide-minus` to
 * `actions/Minus20Icon` while the library itself renders `outline/CheckLIcon`,
 * `outline/CrossMIcon` and `actions/Minus30Icon` for those roles.
 */

const require_ = createRequire(import.meta.url)

const entries = Object.entries(iconMap as Record<string, string>)
  .filter(([key]) => !key.startsWith('$'))

/**
 * Components the map may reference that `src/runtime/dictionary/icons.ts` does
 * not. Each is an upstream literal with no semantic key on either side, kept
 * because a port can still meet it in a diff. Anything else must come from the
 * dictionary — that file is what b24ui actually renders, so a value outside it
 * would have a port introduce an icon the library uses nowhere.
 */
const OFF_DICTIONARY = new Set([
  '@bitrix24/b24icons-vue/main/ActivityIcon',
  '@bitrix24/b24icons-vue/actions/ArrowToTheTopIcon',
  '@bitrix24/b24icons-vue/main/HomePageIcon',
  '@bitrix24/b24icons-vue/main/SettingsIcon',
  '@bitrix24/b24icons-vue/common-b24/UserIcon'
])

/** Import paths `src/runtime/dictionary/icons.ts` actually imports. */
const dictionaryPaths = new Set(
  [...readFileSync(resolve(process.cwd(), 'src/runtime/dictionary/icons.ts'), 'utf-8')
    .matchAll(/^import\s+\w+\s+from\s+'(@bitrix24\/b24icons-vue\/[^']+)'/gm)]
    .map(match => match[1]!)
)

describe('icon-map', () => {
  it('is not empty', () => {
    // Every assertion below passes vacuously on an empty map.
    expect(entries.length).toBeGreaterThan(20)
    expect(dictionaryPaths.size).toBeGreaterThan(20)
  })

  it('maps only `i-lucide-*` names', () => {
    expect(entries.filter(([key]) => !key.startsWith('i-lucide-')).map(([key]) => key)).toEqual([])
  })

  it('is sorted, so a new entry lands where a reader looks for it', () => {
    const keys = entries.map(([key]) => key)
    expect(keys).toEqual([...keys].sort())
  })

  it.each(entries)('%s resolves to a real icon', (_key, path) => {
    // Catches an icons-package upgrade that renames or drops a component:
    // the map would otherwise keep pointing at it until someone ported a
    // commit that used it.
    expect(() => require_.resolve(path)).not.toThrow()
  })

  it('references only components the library itself uses', () => {
    const strays = entries
      .map(([, path]) => path)
      .filter(path => !dictionaryPaths.has(path) && !OFF_DICTIONARY.has(path))
      .sort()

    // Named rather than counted — the failure has to say which entry drifted.
    expect([...new Set(strays)]).toEqual([])
  })

  it('agrees with the dictionary on the icons both name', () => {
    // The dictionary is the authority for which b24-icon plays which role.
    // A map value that shares a component *name* with the dictionary but a
    // different group is the drift this file was written after:
    // `main/CheckIcon` vs `outline/CheckLIcon`.
    const byName = new Map([...dictionaryPaths].map(path => [path.split('/').pop()!, path]))
    const mismatched = entries
      .map(([key, path]) => [key, path, byName.get(path.split('/').pop()!)] as const)
      .filter(([, path, dictPath]) => dictPath !== undefined && dictPath !== path)
      .map(([key, path, dictPath]) => `${key}: ${path} (dictionary uses ${dictPath})`)

    expect(mismatched).toEqual([])
  })
})
