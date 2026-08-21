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

/**
 * The values are pinned here, not just the names. Moving them out of the theme
 * files took them out of ~350 snapshots that had been holding `40rem` verbatim
 * — so without this, editing `sizes.css` to upstream's `15rem` passes the
 * entire suite, which is the exact revert this file exists to prevent.
 */
const TOKENS = {
  '--max-height-popup-list': { value: '40rem', purpose: 'combobox and select result lists' },
  '--max-height-popup-menu': { value: '40vh', purpose: 'action and editor suggestion menus' }
} as const

/**
 * Which token caps which theme. A map rather than a list because a shared
 * pattern would accept either token anywhere: capping a result list against
 * the viewport token is a real mistake, and one only the snapshots would have
 * caught.
 */
const CAPPED_THEMES: Record<string, keyof typeof TOKENS> = {
  'src/theme/select.ts': '--max-height-popup-list',
  'src/theme/select-menu.ts': '--max-height-popup-list',
  'src/theme/input-menu.ts': '--max-height-popup-list',
  'src/theme/dropdown-menu.ts': '--max-height-popup-menu',
  'src/theme/context-menu.ts': '--max-height-popup-menu',
  // Base of the editor's slash, mention and emoji menus. Structurally a
  // dropdown — its own docblock says so — so it caps against the same token.
  'src/theme/editor-suggestion-menu.ts': '--max-height-popup-menu'
}

const read = (file: string): string => readFileSync(join(repoRoot, file), 'utf8')

/** The first argument of `max-h-[min(<cap>, …)]` — the ceiling itself. */
const capsIn = (file: string): string[] =>
  [...read(file).matchAll(/max-h-\[min\(([^,]+),/g)].map(match => match[1]!.trim())

describe('popup height tokens', () => {
  it.each(Object.entries(TOKENS))('%s is declared as %o', (token, { value }) => {
    expect(read(TOKENS_FILE)).toContain(`${token}: ${value};`)
  })

  it.each(Object.entries(CAPPED_THEMES))('%s caps through %s, not a literal', (file, token) => {
    const caps = capsIn(file)

    // Anchors the extraction: a theme that stopped matching would otherwise
    // pass this file forever with a literal sitting in it.
    expect(caps.length, `${file} has no max-h-[min(…)] cap — did the slot move?`).toBeGreaterThan(0)

    for (const cap of caps) {
      expect(cap, `${file} should cap through ${token}, found ${cap}`).toBe(`var(${token})`)
    }
  })

  it('is referenced by the themes, so a rename cannot go one-sided', () => {
    const used = new Set(Object.keys(CAPPED_THEMES).flatMap(file => [...read(file).matchAll(/--max-height-popup-[a-z]+/g)].map(m => m[0])))

    expect([...used].sort()).toEqual(Object.keys(TOKENS).sort())
  })

  // The literal is what a port puts back, and it does not have to land in a
  // theme this file already lists — `editor-suggestion-menu.ts` carried
  // `max-h-[40vh]` for exactly as long as nobody looked, while its own docblock
  // pointed at `dropdown-menu.ts`. So the menu family is swept rather than
  // enumerated: any `*-menu.ts` that caps its height must cap through a token.
  //
  // Scoped to menus on purpose. `modal.ts`, `page-aside.ts`, `prose/img.ts` and
  // `prose/code-collapse.ts` also cap in viewport units, and should — a dialog
  // sized against the viewport is not a popup that shares this ceiling.
  it('leaves no untokenized cap in the menu family', async () => {
    const { glob } = await import('tinyglobby')
    const menus = await glob('src/theme/*-menu.ts', { cwd: repoRoot })

    // Anchors the glob: an empty sweep would pass this forever.
    expect(menus.length).toBeGreaterThan(4)

    const offenders = menus
      .filter((file) => {
        const caps = [...read(file).matchAll(/max-h-\[([^\]]*)\]/g)].map(match => match[1]!)

        return caps.some(cap => !cap.includes('--max-height-popup-'))
      })
      .sort()

    expect(offenders, 'menu themes capping height without a popup token').toEqual([])
  })
})
