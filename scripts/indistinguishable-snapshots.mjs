// Finds snapshot entries that are byte-identical to a sibling in the same file.
//
// Shared by `test/utils/indistinguishable-snapshots.spec.ts`, which fails on a
// new one, and `scripts/regen-indistinguishable-baseline.mjs`, which records
// the ones that exist. One implementation because two would drift, and the
// first drift already happened: an earlier revision read a single directory
// with a non-recursive `readdirSync`, so every snapshot under
// `test/components/content/` was outside the guard without saying so.
import { readdirSync, readFileSync } from 'node:fs'
import { join, sep } from 'node:path'

/** Everything below this is searched, so a new snapshot directory is covered. */
export const SNAPSHOT_ROOT = 'test'

/**
 * One snapshot entry as vitest writes it. The body is captured lazily so a
 * file of many entries splits at each terminator rather than swallowing the
 * lot; the optional newlines are how vitest wraps multi-line bodies.
 */
const ENTRY = /^exports\[`([^`]+)`\] = `\n?([\s\S]*?)\n?`;$/gm

/** Every `.snap` file under `root`, as `/`-separated relative paths, sorted. */
export function snapshotFiles(root = SNAPSHOT_ROOT) {
  return readdirSync(root, { recursive: true, encoding: 'utf8' })
    .filter(f => f.endsWith('.snap'))
    .map(f => f.split(sep).join('/'))
    .sort()
}

/** Entry names grouped by the body they rendered. */
export function groupsByBody(source) {
  const byBody = new Map()
  for (const match of source.matchAll(ENTRY)) {
    const body = match[2].trim()
    if (!byBody.has(body)) byBody.set(body, [])
    byBody.get(body).push(match[1])
  }
  return byBody
}

/**
 * How many entries the parser matched. Counted from the matches and not from
 * `groupsByBody().size`, which is the number of *distinct* bodies — a fifth of
 * the corpus is duplicated, so the two differ by hundreds and only this one
 * answers "did the parser still read the file?".
 */
export function countEntries(source) {
  return [...source.matchAll(ENTRY)].length
}

/**
 * `file › name | name`, the identity a baseline line is matched by. Sorts here
 * rather than trusting the caller, so the same group found in a different
 * order is the same line and a fixed case is not mistaken for a new one.
 */
export const key = g => `${g.file} › ${[...g.names].sort().join(' | ')}`

/** Every group of two or more entries sharing a body, across the whole corpus. */
export function collectGroups(root = SNAPSHOT_ROOT) {
  const groups = []
  for (const file of snapshotFiles(root)) {
    for (const [, names] of groupsByBody(readFileSync(join(root, file), 'utf8'))) {
      if (names.length > 1) groups.push({ file, names: [...names].sort() })
    }
  }
  return groups.sort((a, b) => key(a).localeCompare(key(b)))
}

/**
 * `added` — collisions the baseline does not know about, which fail the build.
 * `stale` — baseline lines that are no longer collisions, which also fail it:
 * without that half the baseline is a licence rather than a record, and could
 * never shrink.
 */
export function diffAgainstBaseline(current, baseline) {
  const known = new Set(baseline.map(key))
  const seen = new Set(current.map(key))
  return {
    added: current.filter(g => !known.has(key(g))).map(key),
    stale: baseline.map(key).filter(k => !seen.has(k))
  }
}
