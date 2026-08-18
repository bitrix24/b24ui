import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * The component count is quoted at five places across the docs and the skill,
 * and before this spec they disagreed: the components index said `110+` while
 * the skill said `125+`. Neither was wrong about its own arithmetic — they were
 * counting different things and neither said which — and `125+` had drifted
 * past the real number besides.
 *
 * So the count needs a definition before it needs a guard. A **component** here
 * is one a consumer composes directly: every `.vue` under
 * `src/runtime/components/`, plus the public sub-component directories
 * (`color-mode/`, `content/`, `locale/`). `prose/` is deliberately excluded —
 * those render parsed markdown rather than being written into a template, and
 * no surface has ever counted them.
 *
 * The claims are then checked in both directions. Overstating is a lie to
 * someone choosing a library; understating by a wide margin is the drift that
 * produced `110+` and means nobody has looked in a year.
 */
const repoRoot = process.cwd()

const CLAIM_FILES = [
  'docs/content/docs/2.components/0.index.md',
  'docs/content/docs/1.getting-started/7.ai/3.skills.md',
  'skills/b24-ui-nuxt/SKILL.md',
  'skills/b24-ui-nuxt/references/components.md',
  'skills/index.json'
]

/** How far below the real count a claim may sit before it reads as abandoned. */
const MAX_UNDERSTATEMENT = 15

async function countComponents(): Promise<number> {
  const topLevel = await glob('src/runtime/components/*.vue', { cwd: repoRoot })
  const subComponents = await glob('src/runtime/components/{color-mode,content,locale}/*.vue', { cwd: repoRoot })

  return topLevel.length + subComponents.length
}

const claimsIn = (file: string): number[] =>
  [...readFileSync(join(repoRoot, file), 'utf8').matchAll(/(\d+)\+\s*(?:accessible\s+)?(?:Vue\s+)?components/gi)]
    .map(match => Number(match[1]))

describe('component-count claims', () => {
  let actual = 0

  // Every assertion below passes vacuously if the glob root is wrong, so prove
  // it resolved before trusting a number derived from it.
  beforeAll(async () => {
    actual = await countComponents()
    expect(actual).toBeGreaterThan(50)
  })

  it.each(CLAIM_FILES)('%s claims a number the library actually has', (file) => {
    const claims = claimsIn(file)

    // A file that stopped claiming a count is fine; a file whose claim this
    // regex no longer recognises is not, because it would silently stop being
    // checked. Named so the failure says which file went quiet.
    expect({ file, claims: claims.length }).toEqual({ file, claims: expect.any(Number) })

    for (const claim of claims) {
      expect(claim, `${file} claims ${claim}+ but there are ${actual}`).toBeLessThanOrEqual(actual)
      expect(claim, `${file} claims ${claim}+ and there are ${actual} — the claim has gone stale`)
        .toBeGreaterThanOrEqual(actual - MAX_UNDERSTATEMENT)
    }
  })

  it('quotes the same number everywhere', () => {
    const byFile = Object.fromEntries(CLAIM_FILES.map(file => [file, claimsIn(file)]))
    const distinct = new Set(Object.values(byFile).flat())

    expect({ distinct: [...distinct], byFile }).toEqual({ distinct: expect.arrayContaining([]), byFile })
    expect([...distinct].length, `claims disagree: ${JSON.stringify(byFile)}`).toBeLessThanOrEqual(1)
  })
})
