#!/usr/bin/env node
// Fails when a commit message is one release-please will not render correctly
// in the changelog. Two ways that happens, both silent.
//
// **The parse throws.**
// release-please parses every commit with `@conventional-commits/parser` and,
// when the parse throws, catches it, writes two `logger.debug` lines and moves
// on. Nothing turns red: CI stays green, the release PR renders normally, and
// the commit is simply absent. That is how dcb3bacf — `test(components): build
// path expectations with pathe, not node:path (#427)` — went missing from the
// 2.12.0 notes, which had seven `test:` commits in range and listed six (#436).
//
// `ci.yml` runs it on `push` to `main`, which is the check that counts: a PR's
// own commits are often the text that lands, but not always — the squash
// subject and body can be rewritten in the merge dialog, and #440 was.
// `pr-title.yml` also runs it over the PR title with `--stdin`, as early
// feedback rather than as the guarantee.
//
// The parse and type checks work on the message alone. The upstream-reference
// check needs `HEAD^` to see what the commit added to the ledger, so it runs in
// HEAD mode only and `ci.yml` fetches depth 2 for it.
//
// Fidelity is not assumed. Run over all 3240 commits on `main`, this oracle and
// release-please's own `parseConventionalCommits` agree on every one: 67
// rejected by both, zero disagreements in either direction.
//
// **The type has no section.** `changelog-sections` in
// `release-please-config.json` replaces the preset's type list wholesale, so a
// type absent from ours has no entry. For an ordinary commit that means it is
// dropped. For a **breaking** one it means something worse: the breaking note
// keeps the commit alive, but the section rewrite in
// `conventional-changelog-conventionalcommits`'s `writer-opts.js` is guarded by
// `if (entry)`, so `commit.type` stays the raw string and becomes the group
// title — and `commitGroupOrder.indexOf(title)` returns -1 for an unknown one,
// which sorts it *above* index 0. Reproduced against the real config: a
// `style(Theme)!` commit renders `### style` above `### Features` (#437).
//
// Rejecting the type at the door rather than adding hidden entries per type is
// the deliberate choice of the two the issue offered. Twelve types appear in
// this history with no entry, most of them scopes misused as types, and the
// list would never be finished — it cannot cover `feal(init)`, `ix` or `hore`,
// which are the same failure arriving as a typo.
//
//   usage: assert-commit-parses.mjs            # reads git HEAD
//          assert-commit-parses.mjs --stdin    # reads the message on stdin
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { parser } from '@conventional-commits/parser'

// Read from the config rather than restating it: a type added there must not
// need a second edit here, and a guard that disagrees with the thing it guards
// is worse than none.
const CONFIG = new URL('../../release-please-config.json', import.meta.url)
const KNOWN_TYPES = new Set(
  JSON.parse(readFileSync(CONFIG, 'utf8')).packages['.']['changelog-sections'].map(entry => entry.type)
)

const readingStdin = process.argv.includes('--stdin')

// A merge commit's subject is `Merge pull request …`, which the parser rejects
// and release-please is right to drop — there is nothing to put in a changelog.
// Failing on it would redden `main` for correct behaviour. This repository
// squash-merges (13 merge commits exist, the last from 2026-05-07), so the case
// is rare rather than impossible.
function isMergeCommit() {
  if (readingStdin) return false
  const parents = execFileSync('git', ['rev-list', '--parents', '-n1', 'HEAD'], { encoding: 'utf8' }).trim()
  return parents.split(/\s+/).length > 2
}

/**
 * The upstream SHAs a port adds to the ledger but does not name in its subject.
 *
 * Only the subject reaches CHANGELOG.md, so this is the one place a reader of
 * the release notes can be given a way back to upstream. The trigger is a new
 * `decision: "port"` entry in `processed`, which is narrower than it looks and has to be. Keying on the file being touched would
 * catch the reconciliation commits §6 step 4 requires — #467 is one. Keying on
 * any new key would still be wrong: 70 of the ledger's entries are `no-op`,
 * `noop`, `skip` or `n/a`, and a commit recording one of those has nothing
 * upstream to point a changelog reader at. Review caught that — the first draft
 * flagged #442, #439 and #361, all correct as they stand, none fixable once on
 * `main`.
 *
 * A batched port (§6 4b) adds several entries and can only name one; naming any
 * of them is enough, since the ledger carries the rest.
 *
 * Returns an empty array when the commit ports nothing or when either side is
 * unreadable — this is a changelog-quality check, not a reason to redden `main`
 * because git was unavailable. Both unreadable sides warn: a check that is
 * inert and silent about it reads exactly like a check that passed.
 */
function portWithoutUpstreamRef(subject) {
  if (readingStdin) return []

  const at = (revision) => {
    try {
      const raw = execFileSync('git', ['show', `${revision}:.sync/nuxt-ui.json`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      return JSON.parse(raw).processed ?? {}
    } catch {
      return null
    }
  }

  const now = at('HEAD')
  if (now === null) {
    console.log('::warning::cannot read .sync/nuxt-ui.json at HEAD — the upstream-reference check did not run')
    return []
  }

  const before = at('HEAD^')
  if (before === null) {
    // Depth 1, or the file is new. ci.yml fetches depth 2 for this comparison.
    console.log('::warning::cannot read .sync/nuxt-ui.json at HEAD^ — the upstream-reference check did not run (fetch-depth?)')
    return []
  }

  const ported = Object.keys(now).filter(sha => !(sha in before) && now[sha]?.decision === 'port')
  if (ported.length === 0) return []

  // A substring test against a key checked to be a SHA, not a pattern. This
  // used to build a `new RegExp` from the key, which a ledger entry keyed
  // `(a+)+$` turns into a hang — a file is not a place to accept a regular
  // expression from. Seven characters is the house form; a longer prefix in
  // the subject still contains it, so it matches too.
  const unnamed = ported.filter((sha) => {
    if (!/^[0-9a-f]{7,40}$/i.test(sha)) {
      console.log(`::warning::ledger key is not a SHA, skipping the reference check for it: ${sha}`)
      return false
    }
    return !subject.toLowerCase().includes(`nuxt/ui@${sha.slice(0, 7).toLowerCase()}`)
  })
  // Any one is enough. A batch (§6 4b) adds several entries and a subject has
  // room for one reference; the ledger carries the rest, and demanding all of
  // them would make the rule unfollowable for exactly the case it anticipates.
  return unnamed.length === ported.length ? unnamed : []
}

/** The `type` token as the parser sees it: everything before `(`, `!` or `:`. */
function commitType(node) {
  if (node === null || typeof node !== 'object') return undefined
  if (node.type === 'type' && typeof node.value === 'string') return node.value
  for (const child of node.children ?? []) {
    const found = commitType(child)
    if (found !== undefined) return found
  }
  return undefined
}

function readMessage() {
  if (readingStdin) return readFileSync(0, 'utf8').trim()
  return execFileSync('git', ['log', '-1', '--format=%B'], { encoding: 'utf8' }).trim()
}

if (isMergeCommit()) {
  console.log('merge commit — release-please drops it by design, nothing to check')
  process.exit(0)
}

const message = readMessage()
const subject = message.split('\n')[0]

let error = null
let ast = null
try {
  ast = parser(message)
} catch (thrown) {
  error = thrown instanceof Error ? thrown.message : String(thrown)
}

if (!error) {
  // From the AST the parse above already produced, not re-derived. A second
  // regex was the first attempt and it was wrong in both directions: the
  // parser's type token runs to the first `(`, `!`, `:` or space, so
  // `/^([a-z]+)/i` read `fix2(x):` as `fix` and accepted it, while `2fix(x):`
  // captured nothing, skipped the check and printed "type `undefined` has a
  // section". Both are types release-please would not match — the exact bypass
  // this file exists to close. The grammar has one implementation already.
  const type = commitType(ast)
  // Case-sensitive: `Fix(x):` misses the set and is rejected, which is right,
  // because release-please would not match it either.
  if (type !== undefined && !KNOWN_TYPES.has(type)) {
    console.log(`::error::This commit's type has no changelog section: ${subject}`)
    console.log('')
    console.log(`\`${type}\` is not in \`changelog-sections\` in release-please-config.json.`)
    console.log('An ordinary commit of this type is dropped from the changelog. A breaking')
    console.log('one is worse: it survives, but under a raw lowercase heading sorted above')
    console.log('every real section, because an unknown group title indexes to -1 (#437).')
    console.log('')
    console.log(`Configured types: ${[...KNOWN_TYPES].join(', ')}`)
    console.log('')
    console.log('If this is a typo — `feal`, `ix`, `hore` have all happened — fix the subject.')
    console.log('If the type is deliberate, either use one that has a section (`chore` covers')
    console.log('most of what `style`, `playground` and `cli` were used for) or add an entry')
    console.log('to release-please-config.json in the same change.')
    process.exit(1)
  }
  const missingUpstream = portWithoutUpstreamRef(subject)
  if (missingUpstream.length > 0) {
    console.log(`::error::This port does not name the upstream commit: ${subject}`)
    console.log('')
    console.log('It adds these entries to `processed` in .sync/nuxt-ui.json:')
    for (const sha of missingUpstream) console.log(`  ${sha}`)
    console.log('')
    console.log('Only the subject line reaches CHANGELOG.md — the body is not rendered —')
    console.log('so a port that does not carry the reference there is a changelog entry no')
    console.log('reader can trace back to upstream. Append it:')
    console.log('')
    console.log(`  ${subject.replace(/\s*\(#\d+\)\s*$/, '')} (nuxt/ui@${missingUpstream[0].slice(0, 7)})`)
    console.log('')
    console.log('Our own wording stays ours: upstream names components differently')
    console.log('(their `Slider` is this fork\'s `Range`), so the link is the reference and')
    console.log('the subject is still about our component. See .sync/PORTING.md §6.')
    process.exit(1)
  }

  console.log(`commit message parses, type \`${type}\` has a section: ${subject}`)
  process.exit(0)
}

// The parser reports `at LINE:COLUMN`. Line 1 is the subject, and subject
// failures are the overwhelming majority in this repository's history — 64 of
// the 67 rejections — so pointing everyone at the body would send most readers
// hunting for something that is not there.
const onSubject = /\bat 1:\d+/.test(error)

console.log(`::error::This commit will be dropped from the changelog: ${subject}`)
console.log(`::error::${error}`)
console.log('')

if (onSubject) {
  console.log('The failure is on the SUBJECT line. Shapes that cause it:')
  console.log('')
  console.log('  Revert "feat(x): …"     GitHub\'s revert button — retitle it `revert(x): …`')
  console.log('  chore(lint) fix         no colon after the scope')
  console.log('  fix (Button): …         space between type and scope')
  console.log('  docs(x) : …             space before the colon')
  console.log('  chore(process)          nothing after the scope')
  console.log('  feat!(x): …             `!` belongs after the scope: `feat(x)!:`')
  console.log('  * fix(x): …             a leading list marker')
} else {
  console.log('The failure is in the BODY. A line that begins with a call-like token')
  console.log('arms the parser\'s scope rule, and it then rejects the line unless the')
  console.log('very next `(`, `)` or line-end is a `)`. Both of these fail:')
  console.log('')
  console.log('  `.toEqual([join(a, b)])`      nested parentheses')
  console.log('  writeTemplates(config.root    unclosed before the line ends')
  console.log('')
  console.log('The same text mid-line is fine. Reliable repairs, in order of least')
  console.log('disruption: indent the line by one space; or put any word, `:` or `!`')
  console.log('before the call. Reflowing works only when the parentheses balance on')
  console.log('the joined line — it does not help intrinsic nesting or a code fence.')
}

console.log('')
console.log('Fix it before merging. Once the message is on `main`, correcting it means')
console.log('either an override block on the merged PR body (release-please reads it in')
console.log('place of the message) or rewriting a protected branch.')
process.exit(1)
