import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * `src/runtime/dictionary/icons.ts` is the authority for which b24 icon plays
 * which semantic role, and `app.config.b24ui.icons.<role>` is how a consumer
 * overrides one. A component that imports the glyph directly is outside that
 * mechanism — the override silently does not reach it.
 *
 * #380 catalogued both ways that happened and was closed by deciding each:
 *
 *  - **A component rendering a *different* glyph for a role the dictionary
 *    owns.** Five sites, all size variants of the same drawing — `Badge` drew
 *    `actions/Cross20Icon` where `close` is `outline/CrossMIcon`, `Button` drew
 *    `outline/ChevronDownSIcon` where `chevronDown` is `…LIcon`, and so on. One
 *    meaning rendered two ways in one design system. Resolved by routing them
 *    through the dictionary and accepting the visual change.
 *  - **A component importing the *same* glyph directly.** No visual difference,
 *    so nothing looked wrong; the override still did not apply. Resolved for
 *    `FormField`, `SidebarLayout`, `prose/Card` and `prose/CodeIcon`, and
 *    deliberately left in the three places listed below.
 *
 * Neither can fail on its own: an override that does not apply produces the
 * default, and a size variant looks like a design choice. So this is the check
 * that keeps the decision — a port that re-hardcodes one of these reads as a
 * tidy-up in a diff, which is exactly how the five got there.
 */

const componentsDir = resolve(process.cwd(), 'src/runtime/components')

/**
 * Icons a component may import directly, with why. Anything not listed here
 * must come from the dictionary — add a row only with a reason that survives
 * being read back.
 */
const ALLOWED: Record<string, string> = {
  // The loading glyph is chosen by `useWait` / `useClock` / neither, so these
  // components need a *set* of three. `icons.loading` is one role and cannot
  // express that; routing them through it would collapse the choice.
  'Button.vue: @bitrix24/b24icons-vue/animated/LoaderWaitIcon': 'one of three loading glyphs selected by props',
  'ChatTool.vue: @bitrix24/b24icons-vue/animated/LoaderWaitIcon': 'one of three loading glyphs selected by props',
  // Decorative tick inside a card's own feature list rather than a control's
  // state, and it is the same glyph the role resolves to; left as-is by
  // decision on #380 rather than by accident.
  'PageCardGroup.vue: @bitrix24/b24icons-vue/outline/CheckLIcon': 'decorative list tick, not a control state'
}

const read = (path: string) => readFileSync(resolve(componentsDir, path), 'utf-8')

const files = await glob('**/*.vue', { cwd: componentsDir })

const sources = new Map(files.map(file => [file, read(file)]))

/** Semantic role -> the icon path the dictionary resolves it to. */
const roles = (() => {
  const source = readFileSync(resolve(process.cwd(), 'src/runtime/dictionary/icons.ts'), 'utf-8')
  const imports = new Map(
    [...source.matchAll(/^import\s+(\w+)\s+from\s+'(@bitrix24\/b24icons-vue\/[^']+)'/gm)]
      .map(match => [match[1]!, match[2]!])
  )
  const body = source.slice(source.indexOf('export default {'))
  const entries = new Map<string, string>()
  for (const [, key, local] of body.slice(0, body.indexOf('\n}')).matchAll(/^ {2}(\w+)(?::\s*([\w.]+))?,?\s*(?:\/\/.*)?$/gm)) {
    const path = imports.get(local ?? key!)
    if (path) entries.set(key!, path)
  }
  return entries
})()

const rolePaths = new Set(roles.values())

/**
 * `actions/Cross20Icon` and `outline/CrossMIcon` are the same drawing at two
 * sizes: the trailing digits and the `S`/`M`/`L` suffix are the size, not a
 * different glyph. Stripping both is what lets a variant be recognised as one.
 */
function glyph(path: string): string {
  const name = path.slice(path.lastIndexOf('/') + 1).replace(/Icon$/, '')
  return name.replace(/\d+$/, '').replace(/(?<=[a-z])[SML]$/, '')
}

const rolesByGlyph = new Map<string, string[]>()
for (const [role, path] of roles) {
  rolesByGlyph.set(glyph(path), [...(rolesByGlyph.get(glyph(path)) ?? []), role])
}

/** Every `@bitrix24/b24icons-vue/…` a component imports directly. */
const hardcoded = [...sources].flatMap(([file, source]) =>
  [...new Set([...source.matchAll(/'(@bitrix24\/b24icons-vue\/[^']+)'/g)].map(match => match[1]!))]
    .map(path => ({ file, path, key: `${file}: ${path}` }))
)

describe('icons reach components through the dictionary', () => {
  it('reads a non-trivial dictionary and component set', () => {
    // Every assertion below is vacuous against an empty parse.
    expect(roles.size).toBeGreaterThan(40)
    expect(sources.size).toBeGreaterThan(50)
    expect(hardcoded.length).toBeGreaterThan(20)
  })

  it('renders no size variant of a glyph the dictionary already owns', () => {
    // The #380 defect proper: one meaning, two drawings.
    const variants = hardcoded
      .filter(({ path }) => !rolePaths.has(path) && rolesByGlyph.has(glyph(path)))
      .filter(({ key }) => !(key in ALLOWED))
      .map(({ file, path }) => `${file}: ${path} duplicates role ${rolesByGlyph.get(glyph(path))!.join('/')}`)
      .sort()

    // Named rather than counted — the failure has to say which glyph diverged.
    expect(variants).toEqual([])
  })

  it('imports no glyph the dictionary already exports, outside the recorded exceptions', () => {
    // The quieter half: same drawing, so nothing looks wrong, but
    // `app.config.b24ui.icons.<role>` does not reach it.
    const bypasses = hardcoded
      .filter(({ path }) => rolePaths.has(path))
      .filter(({ key }) => !(key in ALLOWED))
      .map(({ file, path }) => {
        const owning = [...roles].filter(([, p]) => p === path).map(([role]) => role)
        return `${file}: ${path} is role ${owning.join('/')} — read it from the dictionary`
      })
      .sort()

    expect(bypasses).toEqual([])
  })

  it('keeps the exception list honest', () => {
    // An exception for an import that no longer exists is a stale licence: it
    // would silently re-permit the same bypass if the import came back.
    const present = new Set(hardcoded.map(({ key }) => key))
    const stale = Object.keys(ALLOWED).filter(key => !present.has(key)).sort()

    expect(stale).toEqual([])
  })
})
