import { describe, it, expect } from 'vitest'
import ledger from '../../.sync/nuxt-ui.json'

/**
 * `.sync/nuxt-ui.json` is the fork's audit record of the upstream sync: one
 * `processed` entry per `nuxt/ui` commit, saying what was decided about it and
 * where that decision landed. Everything else in `.sync/` is derived from it —
 * `dep-parity.json` snapshots at its `cursor`, and `.sync/log/<sha>.md` carries
 * the long-form reasoning behind each entry.
 *
 * Nothing checked its *shape* until now, and it had drifted in a way reading
 * could not catch. `decision` had two spellings for the same verdict: 50
 * entries said `no-op` and 14 said `noop`, interleaved across the same period
 * (`f2ff8241` no-op, `b0461e72` noop). Neither form is wrong on its face, which
 * is exactly why it survived — the drift is only visible by tallying the whole
 * file, and no reviewer of a one-entry diff would ever do that.
 *
 * That matters more than tidiness. The ledger is queried by decision when
 * answering "what did we skip and why" — the §1 component-name rule in
 * PORTING.md exists because one such query was answered wrongly — and a query
 * written against one spelling silently omits a fifth of the no-ops.
 *
 * The vocabulary is closed on purpose. A commit is ported, or it changes
 * nothing here (`no-op` / `n/a`), or it applies and we declined it (`skip`).
 * A fifth verdict is a process change and should go through PORTING.md, not
 * through a new string appearing in a data file.
 */

const DECISIONS = ['port', 'no-op', 'skip', 'n/a'] as const

/**
 * `pr` and `b24ui_sha` go in as this placeholder because the entry is written
 * in the same commit as the port, before its PR has a number or a squash SHA.
 */
const PENDING = 'pending-merge'

type Entry = { pr: number | string, b24ui_sha: string, decision: string, summary: string }

const processed = Object.entries(ledger.processed as unknown as Record<string, Entry>)

describe('the sync ledger', () => {
  it('reads a ledger worth checking', () => {
    // Every assertion below is vacuous against an empty or renamed `processed`.
    expect(processed.length).toBeGreaterThan(250)
    expect(ledger.cursor).toMatch(/^[0-9a-f]{40}$/)
  })

  it('keys every entry by a full upstream SHA', () => {
    // Short SHAs would break the pairing with `.sync/log/<full-sha>.md`, and an
    // abbreviation is not stable against upstream's growth.
    expect(processed.filter(([sha]) => !/^[0-9a-f]{40}$/.test(sha)).map(([sha]) => sha)).toEqual([])
  })

  it('records the cursor as one of the processed commits', () => {
    // The cursor is meant to be the newest entry, not a SHA from nowhere: it is
    // where the next run resumes, and PORTING.md §6 4b describes it going
    // backwards as the failure mode a batched PR causes.
    expect(Object.keys(ledger.processed)).toContain(ledger.cursor)
  })

  it('spells every decision with one of the four verdicts', () => {
    // Named rather than counted: the failure has to say which entry and which
    // spelling, or fixing it means re-deriving this tally by hand.
    const wrong = processed
      .filter(([, entry]) => !(DECISIONS as readonly string[]).includes(entry.decision))
      .map(([sha, entry]) => `${sha} → ${JSON.stringify(entry.decision)}`)

    expect(wrong).toEqual([])
  })

  it('leaves no entry unreconciled', () => {
    // The reconciliation is a separate bookkeeping PR, and forgetting it is
    // invisible — the entry looks complete and says nothing false.
    const unreconciled = processed
      .filter(([, entry]) => entry.pr === PENDING || entry.b24ui_sha === PENDING)
      .map(([sha]) => sha)

    expect(unreconciled).toEqual([])
  })

  it('records every reconciled `pr` as a number', () => {
    // 277 entries wrote it as a number and three — added by #511 — as a string,
    // which is how this check came to exist. JSON keeps the two apart, so a
    // `pr === 509` lookup misses `"509"` and a sort orders it as text. The
    // placeholder is the one deliberate string, and the assertion above is what
    // stops it from lingering.
    const wrong = processed
      .filter(([, entry]) => entry.pr !== PENDING)
      .filter(([, entry]) => typeof entry.pr !== 'number' || !Number.isInteger(entry.pr) || entry.pr <= 0)
      .map(([sha, entry]) => `${sha} → ${JSON.stringify(entry.pr)}`)

    expect(wrong).toEqual([])
  })

  it('records every reconciled `b24ui_sha` as a resolvable SHA', () => {
    // Deliberately looser than the key check above. 155 entries abbreviate this
    // to eight characters and 125 write it in full, and unlike `pr` that split
    // costs nothing: both forms resolve under `git show`, which is all this
    // field is for. Normalising 280 rows to buy nothing is not worth the diff.
    //
    // What is worth catching is a value that resolves to nothing — a SHA
    // truncated past ambiguity, or one that picked up a prefix or stray
    // whitespace on its way in. Git's own floor for an abbreviation is four,
    // and this repository is far too large for that to be unique; seven is what
    // `git rev-parse --short` gives here, and the eight-character entries are
    // above it.
    const wrong = processed
      .filter(([, entry]) => entry.b24ui_sha !== PENDING)
      .filter(([, entry]) => !/^[0-9a-f]{7,40}$/.test(entry.b24ui_sha))
      .map(([sha, entry]) => `${sha} → ${JSON.stringify(entry.b24ui_sha)}`)

    expect(wrong).toEqual([])
  })

  it('gives every entry a non-empty summary', () => {
    // A decision with no reasoning is indistinguishable from an oversight —
    // PORTING.md §6 step 2 says so about the log file, and the same holds for
    // the one-line summary that stands in for it when scanning the ledger.
    const empty = processed
      .filter(([, entry]) => !entry.summary?.trim())
      .map(([sha]) => sha)

    expect(empty).toEqual([])
  })
})
