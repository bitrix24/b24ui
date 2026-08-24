import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
// Shared with `scripts/regen-indistinguishable-baseline.mjs` — one
// implementation, so the guard and the regenerator can never disagree.
import { SNAPSHOT_ROOT, snapshotFiles, countEntries, groupsByBody, collectGroups, diffAgainstBaseline } from '../../scripts/indistinguishable-snapshots.mjs'
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
 * sweep found **916 of 4361 entries in 301 groups**, a fifth of every snapshot
 * in the repository. Fixing all of them is not a task, and most are not
 * defects: a `renderEach` matrix produces variants cheaply, and a `color`
 * that only tints a popup is genuinely indistinguishable while the popup is
 * closed. The cheapness is the problem — nothing told you which entries were
 * distinct.
 *
 * So this guard does not demand that every entry be unique. It pins the ones
 * that are not, and fails on a **new** collision. The baseline is the record
 * the issue asked for: a list of the cases known to assert nothing, which
 * shrinks as they are fixed and cannot silently grow.
 *
 * Regenerate the baseline only when a change is understood and intended:
 *
 *     pnpm snapshots:baseline
 */
describe('snapshot entries that are indistinguishable from a sibling', () => {
  const current = collectGroups()

  it('reads the corpus before drawing conclusions from it', () => {
    // Without this, a parser that stops matching turns "no new collisions"
    // into "nothing was compared" and reads exactly the same. Counted from the
    // entries and not the distinct bodies, so losing every duplicate — a fifth
    // of the corpus — is also caught.
    const files = snapshotFiles()
    const entries = files.reduce((n: number, f: string) => n + countEntries(readFileSync(join(SNAPSHOT_ROOT, f), 'utf8')), 0)

    expect(files.length, 'no snapshot files found').toBeGreaterThan(200)
    expect(entries, 'the entry parser matched nothing — did vitest change its snapshot format?').toBeGreaterThan(4000)
  })

  it('gains no new collision', () => {
    const { added } = diffAgainstBaseline(current, baseline)

    expect(added, [
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
    const { stale } = diffAgainstBaseline(current, baseline)

    expect(stale, [
      'These are recorded as indistinguishable and are not any more — which is',
      'the good direction. Remove them from the baseline:',
      '',
      '  pnpm snapshots:baseline'
    ].join('\n')).toEqual([])
  })
})

/**
 * The guard above is only as good as the three properties it rests on, and
 * none of them were tested: deleting the stale half of `diffAgainstBaseline`,
 * or collapsing `key` to the filename, left the suite green. Synthetic groups
 * here, because the real corpus cannot be made to hold a counter-example.
 */
describe('the guard itself', () => {
  const group = (file: string, ...names: string[]) => ({ file, names })

  it('reports a collision the baseline does not know about', () => {
    const { added, stale } = diffAgainstBaseline([group('A.snap', 'x', 'y')], [])

    expect(added).toEqual(['A.snap › x | y'])
    expect(stale).toEqual([])
  })

  it('reports a baseline line that is no longer a collision', () => {
    // The half that makes the baseline shrink. Without it a fixed case stays
    // recorded as broken for ever, and the list only ever grows.
    const { added, stale } = diffAgainstBaseline([], [group('A.snap', 'x', 'y')])

    expect(stale).toEqual(['A.snap › x | y'])
    expect(added).toEqual([])
  })

  it('tells apart the same names in different files', () => {
    // `key` collapsing to the filename would let a collision in B.snap be
    // covered by an unrelated baseline line for A.snap.
    const { added } = diffAgainstBaseline([group('B.snap', 'x', 'y')], [group('A.snap', 'x', 'y')])

    expect(added).toEqual(['B.snap › x | y'])
  })

  it('tells apart different names in the same file', () => {
    const { added } = diffAgainstBaseline([group('A.snap', 'x', 'z')], [group('A.snap', 'x', 'y')])

    expect(added).toEqual(['A.snap › x | z'])
  })

  it('is indifferent to the order the entries were found in', () => {
    const { added, stale } = diffAgainstBaseline([group('A.snap', 'x', 'y')], [group('A.snap', 'y', 'x')])

    expect({ added, stale }).toEqual({ added: [], stale: [] })
  })

  it('counts entries rather than distinct bodies', () => {
    // The self-check reads this number. Counting distinct bodies would let a
    // format change that lost every duplicate — a fifth of the corpus — pass.
    const source = [
      'exports[`a`] = `<p>same</p>`;',
      'exports[`b`] = `<p>same</p>`;',
      'exports[`c`] = `<p>other</p>`;'
    ].join('\n\n')

    expect(countEntries(source)).toBe(3)
    expect(groupsByBody(source).size).toBe(2)
  })

  it('finds snapshots in nested directories', () => {
    // A non-recursive read is what left `test/components/content/` outside the
    // guard, with two unrecorded collisions in it.
    const dirs = new Set(snapshotFiles().map((f: string) => f.split('/').slice(0, -1).join('/')))

    expect(dirs.size, 'only one snapshot directory found — has the walk stopped recursing?').toBeGreaterThan(1)
    expect([...dirs]).toContain('components/content/__snapshots__')
  })
})
