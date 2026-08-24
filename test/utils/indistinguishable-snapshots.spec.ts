import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import baseline from './__fixtures__/indistinguishable-snapshots.json'

/**
 * A snapshot case that renders exactly what a sibling renders proves nothing
 * beyond what the sibling already proved.
 *
 * #454 is the reason this exists. The shape it describes — a case added for a
 * prop or slot whose fixture never satisfies the precondition, so the snapshot
 * records the fallback and the case reads as coverage — has one reliable
 * symptom: the entry is byte-identical to another in the same file. That is
 * how #420, #450 and the fourteen after them were found, by hand.
 *
 * Measuring the corpus first changed the plan. The issue names fourteen; the
 * sweep found **883 entries in 295 groups**, a fifth of every snapshot in the
 * repository. Fixing all of them is not a task, and most are not defects: a
 * `renderEach` matrix produces variants cheaply, and a `color` that only tints
 * a popup is genuinely indistinguishable while the popup is closed. The
 * cheapness is the problem — nothing told you which entries were distinct.
 *
 * So this guard does not demand that every entry be unique. It pins the ones
 * that are not, and fails on a **new** collision. The baseline is the record
 * the issue asked for: a list of the cases known to assert nothing, which
 * shrinks as they are fixed and cannot silently grow.
 *
 * Regenerate the baseline only when a change is understood and intended:
 *
 *     node scripts/regen-indistinguishable-baseline.mjs
 */
const snapshotDir = join(process.cwd(), 'test/components/__snapshots__')

/** Snapshot entries as vitest writes them, keyed by their rendered body. */
function groupsByBody(source: string): Map<string, string[]> {
  const byBody = new Map<string, string[]>()
  for (const match of source.matchAll(/^exports\[`([^`]+)`\] = `\n?([\s\S]*?)\n?`;$/gm)) {
    const body = match[2]!.trim()
    if (!byBody.has(body)) byBody.set(body, [])
    byBody.get(body)!.push(match[1]!)
  }
  return byBody
}

type Group = { file: string, names: string[] }

/** `file › first name` — stable across reordering, since names are sorted. */
const key = (g: Group) => `${g.file} › ${g.names.join(' | ')}`

describe('snapshot entries that are indistinguishable from a sibling', () => {
  const files = readdirSync(snapshotDir).filter(f => f.endsWith('.snap')).sort()

  const current: Group[] = files.flatMap((file) => {
    const groups: Group[] = []
    for (const [, names] of groupsByBody(readFileSync(join(snapshotDir, file), 'utf8'))) {
      if (names.length > 1) groups.push({ file, names: [...names].sort() })
    }
    return groups
  })

  it('reads the corpus before drawing conclusions from it', () => {
    // Without this, a parser that stops matching turns "no new collisions"
    // into "nothing was compared" and reads exactly the same.
    const entries = files.reduce((n, f) => n + groupsByBody(readFileSync(join(snapshotDir, f), 'utf8')).size, 0)
    expect(files.length, 'no snapshot files found').toBeGreaterThan(100)
    expect(entries, 'the entry parser matched nothing — did vitest change its snapshot format?').toBeGreaterThan(1000)
  })

  it('gains no new collision', () => {
    const known = new Set((baseline as Group[]).map(key))
    const added = current.filter(g => !known.has(key(g)))

    expect(added.map(key), [
      'These snapshot entries render exactly what a sibling renders, so whatever',
      'the new case was added to prove, it does not (#454). Either give the',
      'fixture what the branch needs, or drop the case — a case that asserts',
      'nothing is worse than no case, because it reads as coverage.',
      '',
      'If the collision is genuine and unavoidable — a variant the harness cannot',
      'distinguish, like a colour that only tints a closed popup — regenerate the',
      'baseline and say so in the commit.'
    ].join('\n')).toEqual([])
  })

  it('has no baseline entry that is no longer a collision', () => {
    // A baseline that outlives its cases is a licence rather than a record.
    // This is what makes the list shrink as #454 is worked through: fixing a
    // case fails here until its line is removed.
    const seen = new Set(current.map(key))
    const stale = (baseline as Group[]).map(key).filter(k => !seen.has(k))

    expect(stale, [
      'These are recorded as indistinguishable and are not any more — which is',
      'the good direction. Remove them from the baseline:',
      '',
      '  node scripts/regen-indistinguishable-baseline.mjs'
    ].join('\n')).toEqual([])
  })
})
