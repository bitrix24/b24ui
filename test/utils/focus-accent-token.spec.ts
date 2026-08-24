import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * A focus outline is coloured by the design system's focus token, not by
 * whatever accent happened to be nearby.
 *
 * #191 read as an inconsistency — four different colours doing one job. It is
 * an accessibility defect. `outline-primary` resolves to `--color-primary`,
 * a legacy Bitrix cyan (`#2fc6f6`) that measures **1.99:1** against white, and
 * `--ui-color-accent-soft-element-blue` is a dark blue in every context
 * including the dark ones, measuring **2.22:1** against `#262626`. WCAG 2.2
 * SC 1.4.11 asks 3:1 of a focus indicator. Seven of the nine outline-coloured
 * sites failed it in at least one theme.
 *
 * `--ui-color-design-outline-focused-stroke` is the design system's own answer,
 * named as such in `design-tokens/app.json`, and it is the only one of the four
 * defined in all four theme contexts — which is why it adapts and the others do
 * not. It measures 4.21:1 light and 4.24:1 dark.
 *
 * None of that is visible to a snapshot: happy-dom does not resolve custom
 * properties or compute contrast, so a port swapping the token back would
 * change one string in a class list and nothing would go red. Hence a spec.
 */
const themeDir = join(process.cwd(), 'src/theme')
const FOCUS_TOKEN = '--ui-color-design-outline-focused-stroke'

/**
 * Colours that must not appear on a `focus-visible:outline-*`.
 *
 * `outline-primary` is listed as a bare alias rather than as a variable
 * because that is how it is written; it is the worst of them precisely because
 * it does not look like a token at all.
 */
const BANNED = {
  'outline-primary': 'the legacy `--color-primary` cyan, 1.99:1 on white',
  '--ui-color-accent-soft-element-blue': 'a dark blue in every context, 2.22:1 on the dark background',
  '--ui-color-accent-main-primary': 'the focus token already resolves to this in light contexts — name the token'
} as const

/** `focus-visible:outline-…` occurrences, with comments stripped. */
function focusOutlines(source: string): string[] {
  return source
    .split('\n')
    .map(line => line.replace(/\/\/.*$/, ''))
    .flatMap(line => line.match(/focus-visible:outline-[^\s'"`]*/g) ?? [])
}

describe('focus outline colour', () => {
  const files = readdirSync(themeDir).filter(f => f.endsWith('.ts'))

  it('finds focus outlines at all, before claiming none of them offend', () => {
    // Without this the sweep is one refactor away from being vacuously green.
    const total = files.reduce((n, f) => n + focusOutlines(readFileSync(join(themeDir, f), 'utf8')).length, 0)
    expect(total, 'the scanner matched nothing — did the theme files change shape?').toBeGreaterThan(5)
  })

  it('never colours a focus outline from an accent that is not the focus token', () => {
    const offenders: string[] = []

    for (const file of files) {
      for (const utility of focusOutlines(readFileSync(join(themeDir, file), 'utf8'))) {
        for (const [banned, why] of Object.entries(BANNED)) {
          // `outline-offset-…` and `outline-none` share the prefix; only a
          // colour is in scope, so the banned needle has to appear whole.
          if (utility.includes(banned)) offenders.push(`src/theme/${file}: ${utility} — ${why}`)
        }
      }
    }

    expect(offenders, [
      `A focus outline is coloured by \`${FOCUS_TOKEN}\`.`,
      'It is the only one of these defined in all four theme contexts, which is',
      'why it adapts and the others do not. See #191 and .sync/PORTING.md §2.'
    ].join('\n')).toEqual([])
  })

  it('uses the focus token where it colours an outline', () => {
    // The sweep above says what must not be there; this says something is.
    const users = files.filter(f => readFileSync(join(themeDir, f), 'utf8').includes(`focus-visible:outline-(${FOCUS_TOKEN})`))
    expect(users.length, 'no theme reads the focus token — the consolidation was undone').toBeGreaterThanOrEqual(7)
  })

  it('keeps the token defined in every theme context', () => {
    // A theme file pointing at a token no context defines resolves to an
    // invalid declaration, silently, and the outline falls back to the UA's.
    const tokenDir = join(process.cwd(), 'src/runtime/air-design-tokens')
    const contexts = readdirSync(tokenDir).filter(f => /^0\d\d_b24_context_.*\.css$/.test(f))
    expect(contexts.length, 'no theme context files found').toBeGreaterThanOrEqual(4)

    for (const context of contexts) {
      expect(
        readFileSync(join(tokenDir, context), 'utf8'),
        `${context} does not define ${FOCUS_TOKEN}`
      ).toContain(`${FOCUS_TOKEN}:`)
    }
  })
})
