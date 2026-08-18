import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * The popup height caps are tokens, not literals — and this spec exists
 * because the literal is what a port puts back.
 *
 * `40rem` is b24ui's own value, tuned against real Bitrix24 lists; upstream
 * nuxt/ui caps the same slot at `15rem`. A port that takes the upstream hunk
 * wholesale reintroduces a magic number that looks exactly like the one it
 * replaced, and nothing about the result renders wrong enough to notice in
 * review — the list is simply shorter than it should be.
 *
 * Two properties are asserted: the tokens exist, and the cap in every theme
 * reads through one. The second is the load-bearing half; the first only stops
 * a rename from leaving the themes pointing at nothing, which CSS resolves
 * silently to an invalid declaration.
 */
const repoRoot = process.cwd()

const TOKENS_FILE = 'src/runtime/air-design-tokens/tw-style/sizes.css'

const TOKENS = {
  '--max-height-popup-list': 'combobox and select result lists',
  '--max-height-popup-menu': 'action menus'
} as const

/** Themes whose content slot caps its own height. */
const CAPPED_THEMES = [
  'src/theme/select.ts',
  'src/theme/select-menu.ts',
  'src/theme/input-menu.ts',
  'src/theme/dropdown-menu.ts',
  'src/theme/context-menu.ts'
]

const read = (file: string): string => readFileSync(join(repoRoot, file), 'utf8')

/** The first argument of `max-h-[min(<cap>, …)]` — the ceiling itself. */
const capsIn = (file: string): string[] =>
  [...read(file).matchAll(/max-h-\[min\(([^,]+),/g)].map(match => match[1]!.trim())

describe('popup height tokens', () => {
  it.each(Object.entries(TOKENS))('%s is declared, for %s', (token) => {
    expect(read(TOKENS_FILE)).toContain(`${token}:`)
  })

  it.each(CAPPED_THEMES)('%s caps through a token, not a literal', (file) => {
    const caps = capsIn(file)

    // Anchors the extraction: a theme that stopped matching would otherwise
    // pass this file forever with a literal sitting in it.
    expect(caps.length, `${file} has no max-h-[min(…)] cap — did the slot move?`).toBeGreaterThan(0)

    for (const cap of caps) {
      expect(cap, `${file} caps at the literal ${cap}`).toMatch(/^var\(--max-height-popup-(list|menu)\)$/)
    }
  })

  it('is referenced by the themes, so a rename cannot go one-sided', () => {
    const used = new Set(CAPPED_THEMES.flatMap(file => [...read(file).matchAll(/--max-height-popup-[a-z]+/g)].map(m => m[0])))

    expect([...used].sort()).toEqual(Object.keys(TOKENS).sort())
  })
})
