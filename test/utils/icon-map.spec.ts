import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'
import iconMap from '../../.sync/icon-map.json'

/**
 * Guards `.sync/icon-map.json`, the table a porter reads when an upstream diff
 * hardcodes a literal `i-lucide-*` name.
 *
 * It exists because the table rots silently. Nothing imports it, nothing
 * renders it, and a wrong entry surfaces only as the wrong glyph in whatever
 * gets ported next — which is how it came to map `i-lucide-check` to
 * `main/CheckIcon` and `i-lucide-minus` to `actions/Minus20Icon`, where
 * `src/runtime/dictionary/icons.ts` maps those roles to `outline/CheckLIcon`
 * and `actions/Minus30Icon`.
 *
 * What it does NOT guard: whether an entry is still what upstream means today.
 * The derivation below is a point-in-time read of upstream's `src/theme/icons.ts`;
 * if upstream renames a default, every assertion here still passes and the row
 * just goes stale. Re-verification happens when a port touches that key.
 */

const require_ = createRequire(import.meta.url)

const entries = Object.entries(iconMap).filter(([key]) => !key.startsWith('$'))

/**
 * The derived half of the map: upstream's `i-lucide-*` name -> the semantic key
 * both projects define for it (`src/theme/icons.ts` upstream,
 * `src/runtime/dictionary/icons.ts` here).
 *
 * This is what makes the map checkable rather than a list of opinions. Without
 * it, pointing `i-lucide-check` at some *other* icon the dictionary genuinely
 * uses passes every other assertion in this file.
 *
 * Rows deliberately absent are the judgement calls, listed in the map's own
 * `$schema-note`: `circle-check`, `circle-x`, `refresh-cw`, `terminal`, and the
 * five that predate the derivation.
 */
const DERIVED_FROM_KEY: Record<string, string> = {
  'i-lucide-arrow-down': 'arrowDown',
  'i-lucide-arrow-left': 'arrowLeft',
  'i-lucide-arrow-right': 'arrowRight',
  'i-lucide-arrow-up': 'arrowUp',
  'i-lucide-arrow-up-right': 'external',
  'i-lucide-check': 'check',
  'i-lucide-chevron-down': 'chevronDown',
  'i-lucide-chevron-left': 'chevronLeft',
  'i-lucide-chevron-right': 'chevronRight',
  'i-lucide-chevron-up': 'chevronUp',
  'i-lucide-chevrons-left': 'chevronDoubleLeft',
  'i-lucide-chevrons-right': 'chevronDoubleRight',
  'i-lucide-circle-alert': 'caution',
  'i-lucide-copy': 'copy',
  'i-lucide-copy-check': 'copyCheck',
  'i-lucide-ellipsis': 'ellipsis',
  'i-lucide-file': 'file',
  'i-lucide-grip-vertical': 'drag',
  'i-lucide-hash': 'hash',
  'i-lucide-info': 'info',
  'i-lucide-lightbulb': 'tip',
  'i-lucide-loader-circle': 'loading',
  'i-lucide-menu': 'menu',
  'i-lucide-minus': 'minus',
  'i-lucide-monitor': 'system',
  'i-lucide-moon': 'dark',
  'i-lucide-panel-left-close': 'panelClose',
  'i-lucide-panel-left-open': 'panelOpen',
  'i-lucide-plus': 'plus',
  'i-lucide-rotate-ccw': 'reload',
  'i-lucide-search': 'search',
  'i-lucide-square': 'stop',
  'i-lucide-star': 'star',
  'i-lucide-sun': 'light',
  'i-lucide-triangle-alert': 'warning',
  'i-lucide-upload': 'upload',
  'i-lucide-x': 'close'
}

/**
 * Map values that no file under `src/` imports. Each predates the derivation
 * and matches no key on either side, so nothing in the tree can vouch for it;
 * they are kept only because a docs port could still meet the literal. A
 * closed set — a new entry belongs in the dictionary or in `src/`, not here.
 */
const UNUSED_BY_SRC = new Set([
  '@bitrix24/b24icons-vue/main/ActivityIcon',
  '@bitrix24/b24icons-vue/actions/ArrowToTheTopIcon',
  '@bitrix24/b24icons-vue/main/HomePageIcon',
  '@bitrix24/b24icons-vue/main/SettingsIcon',
  '@bitrix24/b24icons-vue/common-b24/UserIcon'
])

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

/**
 * Assumes the dictionary's own style: one default import per line, single
 * quotes, no `import type`. Every icon import in that file matches today, and
 * a reformat that broke it would shrink these sets and turn the assertions
 * below red rather than passing them vacuously.
 */
const dictionarySource = read('src/runtime/dictionary/icons.ts')
const dictionaryImports = new Map(
  [...dictionarySource.matchAll(/^import\s+(\w+)\s+from\s+'(@bitrix24\/b24icons-vue\/[^']+)'/gm)]
    .map(match => [match[1]!, match[2]!])
)
/** Semantic key -> the icon path the dictionary resolves it to. */
const dictionaryRoles = new Map(
  [...dictionarySource.slice(dictionarySource.indexOf('export default {'))
    .matchAll(/^ {2}(\w+): (\w+),?$/gm)]
    .flatMap(([, key, local]) => {
      const path = dictionaryImports.get(local!)
      return path ? [[key!, path] as [string, string]] : []
    })
)

/**
 * Every icon path any file under `src/` references — the dictionary's, plus the
 * ones components still import directly. Since #380 that second set is 46
 * glyphs with no semantic role (41 of them the file-type icons in
 * `prose/CodeIcon.vue`, the rest loading spinners) plus exactly three that do
 * have one and are recorded exceptions in `test/utils/icon-dictionary.spec.ts`.
 * The wider set is the honest authority for "an icon this library actually
 * uses": a value outside it would have a port introduce a glyph that appears
 * nowhere else in the codebase. Narrowing this to the dictionary would reject
 * correct entries — `i-lucide-terminal` is answered by `prose/CodeIcon.vue`.
 */
const usedInSrc = new Set(
  (await glob(['**/*.ts', '**/*.vue'], { cwd: resolve(process.cwd(), 'src'), absolute: true }))
    .flatMap(file => [...readFileSync(file, 'utf-8').matchAll(/'(@bitrix24\/b24icons-vue\/[^']+)'/g)]
      .map(match => match[1]!))
)

describe('icon-map', () => {
  it('parses a non-trivial map', () => {
    // Every assertion below passes vacuously on an empty map.
    expect(entries.length).toBeGreaterThan(20)
  })

  it('parses a non-trivial dictionary', () => {
    // Likewise: a regex that stopped matching would silently empty these.
    expect(dictionaryImports.size).toBeGreaterThan(20)
    expect(dictionaryRoles.size).toBeGreaterThan(20)
  })

  it('maps only `i-lucide-*` names', () => {
    expect(entries.filter(([key]) => !key.startsWith('i-lucide-')).map(([key]) => key)).toEqual([])
  })

  it('is sorted, so a new entry lands where a reader looks for it', () => {
    const keys = entries.map(([key]) => key)
    expect(keys).toEqual([...keys].sort())
  })

  it('has no duplicate key in the source file', () => {
    // The JSON import silently keeps the last of two identical keys, so a bad
    // merge could drop a correct value with no signal here.
    const keys = [...read('.sync/icon-map.json').matchAll(/^\s*"(i-lucide-[^"]+)":/gm)].map(m => m[1]!)
    expect([...new Set(keys.filter((key, index) => keys.indexOf(key) !== index))]).toEqual([])
  })

  it.each(entries)('%s resolves to a real icon', (_key, path) => {
    // Catches an icons-package upgrade that renames or drops a component: the
    // map would otherwise keep pointing at it until someone ported a commit
    // that used it. `resolve` only locates the file; it does not load it.
    expect(() => require_.resolve(path)).not.toThrow()
  })

  it('gives every derived name the icon its semantic key resolves to', () => {
    // The check with teeth. A value can be a real icon, and one the library
    // genuinely uses, and still be the wrong icon for this name.
    const wrong = Object.entries(DERIVED_FROM_KEY)
      .filter(([lucide, key]) => iconMap[lucide as keyof typeof iconMap] !== dictionaryRoles.get(key))
      .map(([lucide, key]) => `${lucide}: ${iconMap[lucide as keyof typeof iconMap] ?? '(absent)'} (key \`${key}\` resolves to ${dictionaryRoles.get(key) ?? '(absent)'})`)

    expect(wrong).toEqual([])
  })

  it('keeps the derived half complete', () => {
    // A derived row quietly disappearing is as wrong as a bad value, and the
    // assertion above only walks the rows that are present.
    const missing = Object.keys(DERIVED_FROM_KEY).filter(lucide => !(lucide in iconMap)).sort()
    expect(missing).toEqual([])
  })

  it('references only icons the library itself uses', () => {
    const strays = entries
      .filter(([, path]) => !usedInSrc.has(path) && !UNUSED_BY_SRC.has(path))
      .map(([key, path]) => `${key}: ${path}`)
      .sort()

    // Named rather than counted — the failure has to say which entry drifted.
    expect(strays).toEqual([])
  })
})
