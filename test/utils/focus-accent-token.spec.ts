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
 * named as such in `design-tokens/app.json`. What makes it the right one is not
 * that it is defined per context — `accent-main-primary` and
 * `accent-soft-element-blue` are defined in all four files too, a claim an
 * earlier draft of this comment got wrong — but that it *changes kind*: a
 * saturated blue in light and dark, a translucent luminance shift in the edge
 * contexts. `outline-primary` is the odd one out for a different reason
 * entirely: it reads `--color-primary` from the Tailwind theme block, which has
 * no per-context override at all. Measured against
 * `--ui-color-bg-content-primary`:
 *
 *   light        #0075ff   4.21:1     was #0154c8 at 6.77:1
 *   dark         #1587fa   4.24:1     was #0056bf at 2.22:1
 *   edge-light   #000000 at 35%       was #0056bf
 *   edge-dark    #ffffff at 40%       was #0056bf
 *
 * Two costs the light and dark rows hide, and both are real. In the light
 * theme the contrast **falls**, 6.77:1 to 4.21:1 — still well past 3:1. In the
 * **edge** contexts it falls below the line: composited over the theme
 * backdrop the token reaches about 2.4:1, where `soft-element-blue` measured
 * 6.05:1 against edge-light's default. So this is not an unqualified win. It is
 * a fix in the two contexts where the backdrop is known, and a regression in
 * the two where it is not.
 *
 * That is a property of the token rather than of its use here, and it cannot be
 * worked around in a theme file: an edge context paints over a background the
 * portal chooses, so no opaque colour has a guaranteed ratio there either —
 * `soft-element-blue`'s 6.05:1 is against one particular default and would be
 * far worse against a dark photograph. A translucent shift degrades evenly
 * instead of gambling. Whether evenly-mediocre is good enough is a question for
 * the token's values, tracked in #475.
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
  '--ui-color-accent-main-primary': 'the focus token resolves to this in light and dark — name the token, not the value'
} as const

/**
 * `focus-visible:outline-…` occurrences, with comments stripped.
 *
 * The `(?<!:)` matters. Stripping from the first `//` also strips from the one
 * inside `https://`, so a real class written after a URL on the same line
 * vanished along with it — a false negative review found by writing the line,
 * not by reading the regex. No theme is written that way today, which is the
 * point: the guard has to survive the first one that is.
 */
function focusOutlines(source: string): string[] {
  return source
    .split('\n')
    .map(line => line.replace(/(?<!:)\/\/.*$/, ''))
    .flatMap(line => line.match(/focus-visible:outline-[^\s'"`]*/g) ?? [])
}

/**
 * Focus outlines that name a colour, as opposed to a width, an offset or
 * `none`. `--b24ui-*` is the documented carve-out: on a control whose focus
 * stroke *is* its border, the colour follows the component palette by design.
 */
function colouredFocusOutlines(source: string): string[] {
  return focusOutlines(source).filter(utility =>
    // Widths, offsets and styles are not colours. `(length:…)` is the one that
    // looks like a colour and is not — `outline-(length:--ui-design-outline-
    // stroke-weight)` in toast.ts is a stroke weight.
    !/^focus-visible:outline-(?:none|offset|transparent|hidden|dashed|solid|current|\d)/.test(utility)
    && !utility.includes('(length:')
    // The control-palette carve-out: a stroke that is the control's own border.
    && !utility.includes('--b24ui-')
    && !utility.includes('--ui-btn-')
  )
}

/**
 * Coloured focus outlines that are allowed not to read the token, each with a
 * reason. Written out rather than pattern-matched, so adding one is a decision
 * somebody makes on purpose.
 */
const EXCEPTIONS: Record<string, string> = {
  'src/theme/link.ts: focus-visible:outline-(--ui-color-accent-soft-element-red)':
    'the isAction variant, where the stroke matches its red hover state; the token has no dark value that meets contrast — #473'
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

  it('colours every focus outline from the token, with no other source', () => {
    // An allowlist, not a count. This replaced a `>= 7` threshold against the
    // eight themes that use the token — which review showed could not see one
    // component dropping off, and which says nothing at all about a colour
    // arriving that is simply not on the banned list.
    const wrong = files.flatMap((file) => {
      const source = readFileSync(join(themeDir, file), 'utf8')
      return colouredFocusOutlines(source)
        .filter(utility => !utility.includes(FOCUS_TOKEN))
        .map(utility => `src/theme/${file}: ${utility}`)
        .filter(entry => !(entry in EXCEPTIONS))
    })

    expect(wrong, [
      `Every coloured focus outline reads \`${FOCUS_TOKEN}\`.`,
      'The exception is a `--b24ui-*` variable, where the stroke is the control\'s',
      'own border rather than a focus accent — see .sync/PORTING.md §2.'
    ].join('\n')).toEqual([])

    const users = files.filter(f => colouredFocusOutlines(readFileSync(join(themeDir, f), 'utf8')).length > 0)
    expect(users.length, 'no theme colours a focus outline at all — the scanner is looking at the wrong thing').toBeGreaterThan(0)

    // An exception that no longer describes anything is a standing licence.
    for (const [entry, why] of Object.entries(EXCEPTIONS)) {
      const [file, utility] = entry.split(': ')
      const source = readFileSync(join(themeDir, file!.replace('src/theme/', '')), 'utf8')
      expect(colouredFocusOutlines(source), `stale exception (${why}): ${entry}`).toContain(utility)
    }
  })

  it('keeps the token defined in every theme context', () => {
    // A theme file pointing at a token no context defines resolves to an
    // invalid declaration, silently, and the outline falls back to the UA's.
    const tokenDir = join(process.cwd(), 'src/runtime/air-design-tokens')
    // Named rather than matched. A pattern over the directory cannot notice a
    // fifth context arriving under a name it does not match, which review
    // demonstrated by adding one: the count stayed at four and the new file
    // was never opened.
    const contexts = [
      '003_b24_context_light.css',
      '004_b24_context_dark.css',
      '005_b24_context_edge-light.css',
      '006_b24_context_edge-dark.css'
    ]
    const present = readdirSync(tokenDir).filter(f => /_b24_context_.*\.css$/.test(f))
    expect(present.sort(), 'a theme context was added or renamed — add it here and check the token in it').toEqual([...contexts].sort())

    for (const context of contexts) {
      expect(
        readFileSync(join(tokenDir, context), 'utf8'),
        `${context} does not define ${FOCUS_TOKEN}`
      ).toContain(`${FOCUS_TOKEN}:`)
    }
  })
})
