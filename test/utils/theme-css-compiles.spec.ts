import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { compile } from 'tailwindcss'

/**
 * Every other assertion this repository makes about theme classes is a string
 * assertion: `test/utils/*.spec.ts` reads the theme sources, and the component
 * snapshots record the rendered `class` attribute. Neither compiles CSS, so an
 * arbitrary value is only ever proved to be *written*.
 *
 * Both ways that can fail are silent and total (#457):
 *
 *  - Tailwind stops emitting a rule for the arbitrary value — a parser change,
 *    a tightened syntax — and the class stays in every snapshot while the cap
 *    is simply gone, so popups grow unbounded in a browser and CI stays green;
 *  - Tailwind v4 tree-shakes `@theme` variables and emits only those a
 *    generated utility references. Anything that stops the token file being
 *    scanned drops the variable from `:root`, `var(--max-height-popup-list)`
 *    resolves to nothing, and again the class is still there.
 *
 * The incident behind this: #430 moved the popup caps from literals into
 * tokens, and the mechanism had to be checked by hand during that review — the
 * same compile this file now does. It confirmed the caps worked; nothing kept
 * them working.
 *
 * Scoped to the popup-cap family on purpose. Sweeping every class in
 * `src/theme/` would turn a guard into a second snapshot suite for very little
 * signal; these are the arbitrary values carrying an invariant a user can see.
 *
 * **What this cannot catch**, measured against the installed engine rather than
 * assumed. Tailwind v4 does not validate the *meaning* of an arbitrary value —
 * it emits a rule for `max-h-[not a length]` and even for an unbalanced
 * `max-h-[min(var(--x)]`. What it refuses is an empty value (`max-h-[]`) or an
 * unknown utility (`maxx-h-[200px]`). So the first failure mode above is caught
 * only in its total form — the utility ceasing to exist — and a value that
 * still parses but no longer means anything is not this file's to find. The
 * second failure mode, the token dropping out of `:root`, is caught exactly:
 * verified by deleting `--max-height-popup-list` from `sizes.css`, which reds
 * the last assertion here and nothing else.
 */

const THEME_DIR = 'src/theme'
const TAILWIND_DIR = resolve('node_modules/tailwindcss')
const TOKEN_ENTRY_DIR = resolve('src/runtime/air-design-tokens/tw-style')

/**
 * `max-h-[…]` values referencing a popup-cap token, read out of the theme
 * sources rather than restated here: a class that is edited stays covered, and
 * one that is deleted trips the floor assertion instead of silently thinning
 * the candidate list.
 */
function candidatesFromTheme(): string[] {
  const found = new Set<string>()

  for (const file of readdirSync(THEME_DIR).filter(name => name.endsWith('.ts'))) {
    const source = readFileSync(join(THEME_DIR, file), 'utf8')

    for (const [candidate] of source.matchAll(/max-h-\[[^\]]*var\(--max-height-popup-[a-z]+\)[^\]]*\]/g)) {
      found.add(candidate)
    }
  }

  return [...found].sort()
}

/**
 * Resolves the `@import`s by hand because `compile()` has no filesystem of its
 * own. `tailwindcss` and `tailwindcss/…` come from the installed package —
 * whatever version the lockfile pins, so this tracks a real engine upgrade
 * rather than a copy of one.
 */
function loadStylesheet(id: string, base: string) {
  const path = id === 'tailwindcss'
    ? resolve(TAILWIND_DIR, 'index.css')
    : id.startsWith('tailwindcss/')
      ? resolve(TAILWIND_DIR, id.slice('tailwindcss/'.length))
      : resolve(base, id)

  return { path, base: dirname(path), content: readFileSync(path, 'utf8') }
}

/**
 * The declaration block Tailwind emitted for a candidate, or `undefined`.
 *
 * Built by escaping the candidate the way Tailwind escapes a class selector —
 * a backslash before every character outside `[A-Za-z0-9_-]` — and then
 * searching for it literally. An earlier version built a `RegExp` instead and
 * reported "no rule emitted" for all six while the rules were there: the
 * pattern had to escape for the regex *and* match text that is itself
 * backslash-escaped, and it got the depth wrong. A literal `indexOf` has no
 * second layer to get wrong.
 */
function ruleFor(css: string, candidate: string): string | undefined {
  const selector = '.' + [...candidate].map(char => /[\w-]/.test(char) ? char : `\\${char}`).join('')
  const at = css.indexOf(selector)

  if (at === -1) {
    return undefined
  }

  const open = css.indexOf('{', at)
  const close = css.indexOf('}', open)

  return css.slice(open + 1, close).trim()
}

const candidates = candidatesFromTheme()

// Compiled once at module scope rather than inside an `it()`: the engine run is
// the expensive part of this file, and a per-test timeout is the wrong place
// for it — see #561, where exactly that shape flaked.
const compiler = await compile(
  '@import "tailwindcss";\n@import "./index.css";\n',
  { base: TOKEN_ENTRY_DIR, loadStylesheet: async (id: string, base: string) => loadStylesheet(id, base) }
)
const css = compiler.build(candidates)

describe('theme arbitrary values compile to real CSS', () => {
  it('reads the theme before drawing conclusions from it', () => {
    // A pattern that stopped matching would pass everything below vacuously:
    // nothing to compile emits no missing rule. Six today, across
    // context-menu, dropdown-menu, editor-suggestion-menu, input-menu,
    // select-menu and select — deduplicated to four distinct values.
    expect(candidates.length).toBeGreaterThanOrEqual(4)
    expect(css.length).toBeGreaterThan(1000)
  })

  it.each(candidates)('emits a max-height rule for %s', (candidate) => {
    const rule = ruleFor(css, candidate)

    expect(rule, `Tailwind emitted no rule for \`${candidate}\`. The class is still in the theme and in every snapshot, but the cap it expresses no longer exists.`).toBeDefined()
    expect(rule).toContain('max-height')
  })

  it.each(['--max-height-popup-list', '--max-height-popup-menu'])('keeps %s in the compiled output', (token) => {
    // Tailwind v4 emits only the `@theme` variables a generated utility
    // references. If the token file stops being reached, the class above still
    // compiles and `var()` resolves to nothing.
    expect(css, `\`${token}\` is referenced by a theme class but absent from the compiled CSS, so \`var(${token})\` resolves to nothing at runtime.`)
      .toMatch(new RegExp(`${token}\\s*:`))
  })
})

describe('the guard itself', () => {
  // Without this, a `ruleFor` that always found something would pass every
  // assertion above while proving nothing — the same shape as a glob that
  // matches no files.
  it('reports absence for a value Tailwind refuses', () => {
    const refused = 'max-h-[]'
    const built = compiler.build([refused])

    expect(ruleFor(built, refused)).toBeUndefined()
  })

  it('finds the rule for a value Tailwind emits', () => {
    const plain = 'max-h-[200px]'
    const built = compiler.build([plain])

    expect(ruleFor(built, plain)).toContain('max-height: 200px')
  })
})
