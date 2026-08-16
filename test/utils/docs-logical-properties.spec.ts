import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * b24ui ships an `ar` locale with `dir: 'rtl'`, so the docs examples are
 * reachable in RTL — and `src/theme/` has used logical utilities (`ps-`, `me-`,
 * `border-s`, `start-`) throughout for a long time. The examples had not caught
 * up: sixteen still positioned with `ml-`/`pr-`/`left-0`/`border-r`, which
 * Tailwind does not flip.
 *
 * Everything below has the property that makes it safe to enforce: the logical
 * form is *identical* under LTR — `ms-2` and `ml-2` compile to the same rule
 * when the direction is left-to-right, and so do `text-end` and `text-right`.
 * A physical spelling is simply the older one.
 *
 * `text-right` was held back from the first sweep (#401) because the 77
 * occurrences are almost all the amount column of a Table example, and whether
 * a numeric column follows the reading direction or stays pinned right is a
 * typographic convention rather than a mechanical swap. That was a real
 * question and it was answered by a decision on #400, not by discovery.
 *
 * The convention it was decided in favour of is the one `src/theme/table.ts`
 * already follows: #284 (porting nuxt/ui@3179012) replaced its
 * `text-left rtl:text-right` with `text-start`, and `prose/td.ts` / `prose/th.ts`
 * map `align: 'right'` to `text-end`. #386 had already converted
 * `even:text-right` to `even:text-end` in the timeline example. The docs
 * examples were the remainder.
 */

const examplesDir = resolve(process.cwd(), 'docs/app/components/content/examples')

/**
 * Physical utilities whose logical form is byte-identical under LTR.
 *
 * The lookbehind excludes a preceding word character or `-` so that `context-left`
 * and `html-mr-2` are not hits, and excludes a preceding `rtl:`/`ltr:` so that a
 * deliberate direction-scoped override stays legal. It must NOT exclude `:`
 * wholesale: that would exempt every variant, and `sm:text-right` is precisely
 * how a responsive table example gets written.
 */
const DIRECTION_SCOPED = '(?<!(?:rtl|ltr):)'
const NOT_MID_WORD = '(?<![\\w-])'
const physical = (body: string) => new RegExp(NOT_MID_WORD + DIRECTION_SCOPED + body, 'g')

const PHYSICAL = [
  { label: 'ml-/mr-', pattern: physical('-?m[lr]-(?=[\\w.[])'), use: 'ms-/me-' },
  { label: 'pl-/pr-', pattern: physical('-?p[lr]-(?=[\\w.[])'), use: 'ps-/pe-' },
  { label: 'border-l/border-r', pattern: physical('border-[lr](?![\\w-])'), use: 'border-s/border-e' },
  { label: 'left-/right-', pattern: physical('-?(?:left|right)-(?=[\\w.[])'), use: 'start-/end-' },
  { label: 'text-left/text-right', pattern: physical('text-(?:left|right)(?![\\w-])'), use: 'text-start/text-end' }
]

const files = await glob('**/*.vue', { cwd: examplesDir })

/**
 * Offenders of one pattern across labelled sources.
 *
 * Named rather than counted: the failure has to say which file and which
 * utility, or the next person re-runs the audit by hand. Deduped per source,
 * so a file with twenty `text-right` reports once — the fix is the same edit.
 */
function offendersIn(units: Array<{ label: string, source: string }>, pattern: RegExp, use: string) {
  return units
    .flatMap(({ label, source }) =>
      [...new Set(source.match(pattern) ?? [])].map(hit => `${label}: ${hit}… — use ${use}`)
    )
    .sort()
}

/** The theme's own spelling, used below to prove these utilities still exist. */
const themeSource = (await glob('**/*.ts', { cwd: resolve(process.cwd(), 'src/theme') }))
  .map(file => readFileSync(resolve(process.cwd(), 'src/theme', file), 'utf-8'))
  .join('')

describe('docs examples position with logical properties', () => {
  it('finds the examples to check', () => {
    // Every assertion below passes vacuously on an empty glob.
    expect(files.length).toBeGreaterThan(300)
  })

  it('still contains the utilities it is looking for, somewhere in the tree', () => {
    // If Tailwind ever renamed these, the scan above would go quiet and this
    // file would report success while checking nothing. Anchored on `src/theme`,
    // which uses the logical forms, so a rename breaks this rather than hiding.
    // The glob is recursive so that `prose/td.ts` — cited above — is included.
    expect(themeSource.length).toBeGreaterThan(10_000)
    expect(themeSource).toMatch(/(?<![\w:-])m[se]-/)
    expect(themeSource).toMatch(/(?<![\w:-])p[se]-/)
    expect(themeSource).toMatch(/(?<![\w:-])text-start/)
    expect(themeSource).toMatch(/(?<![\w:-])text-end/)
  })

  it('leaves no physical text-align in the theme either', () => {
    // `table-wrapper.ts` was the last one, and it is why this spec used to cite
    // `text-left rtl:text-right` as the house style. It is not: that pair keys
    // off an ancestor's `dir` attribute rather than the element's own
    // directionality, so it is a worse approximation of `text-start`, and #284
    // had already removed the identical line from `table.ts`.
    expect(themeSource).not.toMatch(/(?<![\w-])text-(?:left|right)(?![\w-])/)
  })

  it.each(PHYSICAL)('uses $use rather than $label', ({ pattern, use }) => {
    const offenders = offendersIn(
      files.map(file => ({ label: file, source: readFileSync(resolve(examplesDir, file), 'utf-8') })),
      pattern,
      use
    )

    expect(offenders).toEqual([])
  })
})

/**
 * The skills are authoring material: an assistant reads a recipe and emits the
 * markup in it verbatim. A physical utility there does not just sit in a doc,
 * it gets generated into consumer code — so the recipes are held to the same
 * line as the examples.
 *
 * Only fenced code is scanned. The prose genuinely discusses alignment
 * ("the two numeric columns stay end-aligned"), and matching a class pattern
 * against English is how a guard earns its ignore-comments: `right-aligned`
 * matches `right-` followed by a word character, which is why this is worth
 * saying rather than leaving to a reader to notice.
 */
const skillsDir = resolve(process.cwd(), 'skills')

const skillFiles = await glob('**/*.md', { cwd: skillsDir })

/** Fenced blocks only, keyed by file, with the fence's start line for the message. */
const skillCode = skillFiles.flatMap((file) => {
  const source = readFileSync(resolve(skillsDir, file), 'utf-8')

  return [...source.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gm)].map(match => ({
    file,
    line: source.slice(0, match.index).split('\n').length,
    code: match[1]!
  }))
})

describe('skill recipes position with logical properties', () => {
  it('finds the fenced code to check', () => {
    // Vacuous against a fence regex that stopped matching, which is the whole
    // scan — so anchor on both the file count and the blocks found in them.
    expect(skillFiles.length).toBeGreaterThan(10)
    expect(skillCode.length).toBeGreaterThan(40)
    expect(skillCode.some(block => block.code.includes('B24Card'))).toBe(true)
  })

  it.each(PHYSICAL)('uses $use rather than $label', ({ pattern, use }) => {
    const offenders = offendersIn(
      skillCode.map(({ file, line, code }) => ({ label: `${file}:${line}`, source: code })),
      pattern,
      use
    )

    expect(offenders).toEqual([])
  })
})

/**
 * The playgrounds are the weakest of the three cases — not authoring material,
 * not shipped to a consumer — but they are where a component gets tried out, so
 * a physical utility here is a pattern someone copies with the file already
 * open in front of them. Same line, same reason.
 *
 * Not extended to `translate-x`: the playgrounds contain none, so the scan
 * would have nothing to anchor on, and a threshold of zero cannot tell a clean
 * tree from a broken tokeniser. If one appears, guard it then.
 */
const playgroundsDir = resolve(process.cwd(), 'playgrounds')

const playgroundFiles = await glob('*/app/**/*.vue', { cwd: playgroundsDir })

describe('playgrounds position with logical properties', () => {
  it('finds the playground sources to check', () => {
    // The glob is shaped to skip `node_modules` and `.nuxt`, so getting the
    // depth wrong shows up here as an empty scan rather than as silent success.
    expect(playgroundFiles.length).toBeGreaterThan(50)
    expect(new Set(playgroundFiles.map(file => file.split('/')[0])).size).toBeGreaterThan(1)
  })

  it.each(PHYSICAL)('uses $use rather than $label', ({ pattern, use }) => {
    const offenders = offendersIn(
      playgroundFiles.map(file => ({ label: file, source: readFileSync(resolve(playgroundsDir, file), 'utf-8') })),
      pattern,
      use
    )

    expect(offenders).toEqual([])
  })
})

/**
 * `translate-x` is a physical axis with no logical counterpart, so mirroring it
 * means a paired `rtl:` utility with the *opposite sign* — what nuxt/ui@592d5b5
 * did for the alternating timeline.
 *
 * The invariant is the opposite sign, and nothing weaker. Asserting merely that
 * some `rtl:` rule exists for the utility is worse than no check at all: losing
 * the leading `-` is by far the likeliest edit to one of these lines, and it
 * produces `translate-x-full rtl:translate-x-full`, which leaves the element
 * parked at +100% under RTL — the exact defect the pairing is for.
 *
 * Scope is one class attribute, not one file. Elements are the unit being
 * mirrored, and keying by file means the first mirrored element in a file
 * silently vouches for every other element in it.
 *
 * A `translate-x-0` needs no mirror: zero has no sign, so `rtl:translate-x-0`
 * emits a byte-identical declaration. Requiring one would force inert classes
 * into the examples people copy from.
 *
 * Known limit: variant stacks are compared order-insensitively, because
 * `rtl:even:` and `even:rtl:` compile to equivalent selectors at the same
 * position. That is done by splitting on `:`, which also shuffles the internals
 * of an arbitrary variant that contains one (`[&>a]:[&>b]:`). No example uses
 * that form; if one appears, compare stacks verbatim instead.
 */
const TRANSLATE = /-?translate-x-/

/** Files whose translations must stay covered, so a narrowed scan cannot go quiet. */
const TRANSLATING_EXAMPLES = [
  'navigation-menu/NavigationMenuTrailingSlotExample.vue',
  'timeline/TimelineAlternatingLayoutExample.vue'
]

/**
 * Every `translate-x` utility in the examples, grouped by the class attribute it
 * sits in. Splitting the source on quote characters is what isolates one
 * attribute: `:b24ui="{ item: '…' }"` yields the inner string on its own, and a
 * second element's `class` is always a separate segment.
 */
const translations = files.flatMap((file) => {
  const source = readFileSync(resolve(examplesDir, file), 'utf-8')

  return source.split(/["'`]/).flatMap((segment, index) =>
    segment
      .split(/\s+/)
      .filter(token => TRANSLATE.test(token))
      .map((token) => {
        const at = token.search(TRANSLATE)
        const variants = token.slice(0, at).split(':').filter(Boolean)
        const utility = token.slice(at)

        return {
          file,
          // The segment index stands in for the element: two utilities pair only
          // if they were written in the same attribute.
          where: `${file}#${index}`,
          stack: variants.filter(variant => variant !== 'rtl').sort().join(':'),
          rtl: variants.includes('rtl'),
          negative: utility.startsWith('-'),
          value: utility.replace(/^-?translate-x-/, ''),
          token
        }
      })
  )
})

describe('docs examples mirror `translate-x` under RTL', () => {
  it('finds the translations to check', () => {
    // Vacuous on an empty scan, and this one is hand-tokenised. Anchored on the
    // files by name rather than on a count: a regex that quietly stopped
    // matching arbitrary values would drop the timeline example whole, and a
    // threshold loose enough to be maintainable would not notice.
    expect(translations.length).toBeGreaterThan(6)
    expect([...new Set(translations.map(entry => entry.file))].sort()).toEqual(TRANSLATING_EXAMPLES)
    expect(translations.filter(entry => entry.rtl).length).toBeGreaterThan(2)
    expect(translations.filter(entry => entry.value === '[calc(50%-1rem)]').length).toBe(2)
  })

  it('mirrors every signed `translate-x` with an opposite-signed `rtl:` rule', () => {
    const unmirrored = translations
      .filter(entry => !entry.rtl && entry.value !== '0')
      .filter(entry => !translations.some(other =>
        other.rtl
        && other.where === entry.where
        && other.stack === entry.stack
        && other.value === entry.value
        && other.negative !== entry.negative
      ))
      .map(entry => `${entry.file}: ${entry.token} — needs rtl:${entry.negative ? '' : '-'}translate-x-${entry.value} on the same element`)
      .sort()

    // Named rather than counted, and the message carries the class to add: the
    // failure has to be actionable without recompiling the stylesheet.
    expect([...new Set(unmirrored)]).toEqual([])
  })
})
