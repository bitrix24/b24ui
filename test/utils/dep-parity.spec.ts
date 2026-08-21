import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import parity from '../../.sync/dep-parity.json'

/**
 * The sync ports the *delta* of each upstream commit, which is right per commit
 * and lets a one-time divergence become permanent. A `chore(deps)` port bumps
 * only where this fork already matched upstream's pre-image — sensible, since a
 * package we deliberately hold back should not be dragged along — but it means
 * that once a version leaves upstream's line it never rejoins, and no later
 * batch will mention it again.
 *
 * That is not hypothetical. `prettier` sat at `^3.8.4` against upstream's
 * `^3.9.6` through four ported `chore(deps)` batches. The port that could have
 * caught it, `2a4218b8` (#295), says so in its own ledger summary: it bumped
 * "the subset where b24ui shares upstream's old range", and `^3.8.4` was not in
 * that subset. Nothing was wrong with the port. The process had no step that
 * compares absolute versions rather than deltas.
 *
 * This is that step. `.sync/dep-parity.json` records upstream's version for
 * every dependency both trees declare **in the same section**, and this file
 * holds the tree to it. The section matters: 18 packages are declared on both
 * sides in different ones — the `@tiptap/*` family is a peer `^3` upstream and
 * a dependency `^3.29.2` here — and a peer range compared against a dependency
 * range means nothing, so those are outside the snapshot by construction.
 *
 * A divergence is allowed, but only as a written exception with a reason —
 * `nuxt-schema-org` is held back because newer versions do not run here at all.
 * An exception that no longer diverges fails as loudly as an undeclared
 * divergence: a stale one is a licence to drift again, silently.
 */

const read = (path: string) => JSON.parse(readFileSync(resolve(process.cwd(), path), 'utf-8'))

type Snapshot = Record<string, Record<string, Record<string, string>>>

const manifests = Object.entries(parity.manifests as Snapshot)

/** Every (section, name, upstream version) the snapshot records for a manifest. */
const entriesOf = (perSection: Record<string, Record<string, string>>) =>
  Object.entries(perSection).flatMap(([section, deps]) =>
    Object.entries(deps).map(([name, version]) => ({ section, name, version }))
  )

const exceptions = (parity as any).exceptions as Record<string, Record<string, string>>

describe('dependency parity with upstream', () => {
  it('reads a snapshot worth checking against', () => {
    // Every assertion below is vacuous against an empty or truncated snapshot,
    // and this one is hand-maintained by whoever ran the last deps port.
    expect(parity.cursor).toMatch(/^[0-9a-f]{40}$/)
    expect(manifests.length).toBeGreaterThan(3)
    expect(manifests.reduce((n, [, perSection]) => n + entriesOf(perSection).length, 0)).toBeGreaterThan(120)
  })

  it('snapshots the cursor the ledger is actually at', () => {
    // A snapshot taken at an older cursor silently checks against stale
    // versions, which looks identical to being in sync.
    expect(parity.cursor).toBe(read('.sync/nuxt-ui.json').cursor)
  })

  it.each(manifests)('%s matches upstream', (path, perSection) => {
    const manifest = read(path)
    const allowed = exceptions[path] ?? {}

    const drifted = entriesOf(perSection)
      .filter(({ name }) => !(name in allowed))
      .filter(({ section, name, version }) => manifest[section]?.[name] !== version)
      // Named rather than counted, and carrying both versions: the failure has
      // to be actionable without re-running the comparison by hand.
      .map(({ section, name, version }) => `${section}.${name}: ours ${manifest[section]?.[name] ?? '(absent)'}, upstream ${version}`)
      .sort()

    expect(drifted).toEqual([])
  })

  it.each(manifests)('%s declares everything the snapshot lists', (path, perSection) => {
    // The snapshot only ever records packages both trees declare in the same
    // section, so a name missing here means it outlived the manifest.
    const manifest = read(path)
    const gone = entriesOf(perSection)
      .filter(({ section, name }) => manifest[section]?.[name] === undefined)
      .map(({ section, name }) => `${section}.${name}`)
      .sort()

    expect(gone).toEqual([])
  })

  it('keeps the exception list honest', () => {
    // An exception for a package that no longer diverges is a standing licence
    // to drift again without anything noticing.
    const stale: string[] = []

    for (const [path, entries] of Object.entries(exceptions)) {
      const manifest = read(path)
      const recorded = entriesOf((parity.manifests as Snapshot)[path] ?? {})

      for (const [name, reason] of Object.entries(entries)) {
        expect(reason.length).toBeGreaterThan(40)
        const upstream = recorded.find(entry => entry.name === name)
        if (upstream && manifest[upstream.section]?.[name] === upstream.version) stale.push(`${path}: ${name}`)
      }
    }

    expect(stale).toEqual([])
  })
})
