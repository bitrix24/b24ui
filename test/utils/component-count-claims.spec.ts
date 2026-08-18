import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * The component count is quoted across the docs, the skill and the LLM-facing
 * metadata, and before this spec the surfaces disagreed: `100+` on the
 * getting-started page, `110+` on the components index, `125+` in the skill and
 * in `llms.txt`. Neither number was wrong about its own arithmetic — they were
 * counting different things and none of them said which — and `125+` had
 * drifted past the real total besides.
 *
 * So the count needs a definition before it needs a guard. A **component** here
 * is one a consumer composes directly: every `.vue` under
 * `src/runtime/components/`, plus the public sub-component directories
 * (`color-mode/`, `content/`, `locale/`). `prose/` is deliberately excluded —
 * those render parsed markdown rather than being written into a template, and
 * no surface has ever counted them.
 *
 * Three ways this can rot, all checked:
 *
 *  - a claim above the real count, which is a lie to someone choosing a library;
 *  - a claim far below it, which is the drift that produced `100+`;
 *  - a claim that quietly stops being recognised. That last one is the reason
 *    every file below is asserted to still yield a claim: an earlier version of
 *    this spec matched a narrow phrasing, and rewording a single line to
 *    "130+ UI components" dropped that file out of the check with all tests
 *    still green.
 */
const repoRoot = process.cwd()

/**
 * Every surface that quotes a count. The `docs/` entries are not prose the
 * team re-reads — `nuxt.config.ts` and the raw route feed `llms.txt` and the
 * site metadata, which is what an AI agent consumes instead of the skill.
 */
const CLAIM_FILES = [
  'docs/content/docs/1.getting-started/1.index.md',
  'docs/content/docs/2.components/0.index.md',
  'docs/content/docs/1.getting-started/7.ai/3.skills.md',
  'docs/content/docs/4.typography/accordion.md',
  'docs/nuxt.config.ts',
  'docs/server/routes/raw/index.md.get.ts',
  'docs/app/components/content/examples/chat/ChatPaletteModalExample.vue',
  'docs/app/components/content/examples/sidebar/SidebarChatExample.vue',
  'skills/b24-ui-nuxt/SKILL.md',
  'skills/b24-ui-nuxt/references/components.md',
  'skills/index.json'
]

/** How far below the real count a claim may sit before it reads as abandoned. */
const MAX_UNDERSTATEMENT = 15

/**
 * `130+ components`, and everything anyone has actually written between the two:
 * `130+ accessible, production-ready, Tailwind CSS components`. Bounded to five
 * words so it cannot run across sentences, and it needs the `+` — `100x faster`
 * on the same page is a build-speed claim, not a component count.
 */
const CLAIM_PATTERN = /(\d+)\+\s*(?:[\w-]+[,\s]+){0,5}components/gi

const claimsIn = (file: string): number[] =>
  [...readFileSync(join(repoRoot, file), 'utf8').matchAll(CLAIM_PATTERN)].map(match => Number(match[1]))

async function countComponents(): Promise<number> {
  const topLevel = await glob('src/runtime/components/*.vue', { cwd: repoRoot })
  const subComponents = await glob('src/runtime/components/{color-mode,content,locale}/*.vue', { cwd: repoRoot })

  return topLevel.length + subComponents.length
}

describe('component-count claims', () => {
  let actual = 0

  // Every assertion below passes vacuously if the glob root is wrong, so prove
  // it resolved before trusting a number derived from it.
  beforeAll(async () => {
    actual = await countComponents()
    expect(actual).toBeGreaterThan(50)
  })

  it.each(CLAIM_FILES)('%s still states a count this spec can read', (file) => {
    // The guard's own liveness check. A file may legitimately stop claiming a
    // count — but then it must leave this list, deliberately, rather than fall
    // out of it because someone added an adjective.
    expect(claimsIn(file).length).toBeGreaterThan(0)
  })

  it.each(CLAIM_FILES)('%s claims a number the library actually has', (file) => {
    for (const claim of claimsIn(file)) {
      expect(claim, `${file} claims ${claim}+ but there are ${actual}`).toBeLessThanOrEqual(actual)
      expect(claim, `${file} claims ${claim}+ and there are ${actual} — the claim has gone stale`)
        .toBeGreaterThanOrEqual(actual - MAX_UNDERSTATEMENT)
    }
  })

  it('quotes the same number everywhere', () => {
    const byFile = Object.fromEntries(CLAIM_FILES.map(file => [file, [...new Set(claimsIn(file))]]))
    const distinct = new Set(Object.values(byFile).flat())

    expect([...distinct], `claims disagree: ${JSON.stringify(byFile, null, 2)}`).toHaveLength(1)
  })
})
