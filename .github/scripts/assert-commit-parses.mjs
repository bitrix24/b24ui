#!/usr/bin/env node
// Fails when a commit message is one release-please will silently drop from the
// changelog.
//
// release-please parses every commit with `@conventional-commits/parser` and,
// when the parse throws, catches it, writes two `logger.debug` lines and moves
// on. Nothing turns red: CI stays green, the release PR renders normally, and
// the commit is simply absent. That is how dcb3bacf — `test(components): build
// path expectations with pathe, not node:path (#427)` — went missing from the
// 2.12.0 notes, which had seven `test:` commits in range and listed six (#436).
//
// Runs on `push` to `main`, not on pull requests. A PR's own commits are often
// the same text that lands, but not always: the squash subject and body can be
// rewritten in the merge dialog, and #440 was. Only the message on `main` is
// certain to be the one release-please reads. Checking HEAD after the merge also
// needs no history, so the default `fetch-depth: 1` suffices.
//
// Fidelity is not assumed. Run over all 3240 commits on `main`, this oracle and
// release-please's own `parseConventionalCommits` agree on every one: 67
// rejected by both, zero disagreements in either direction.
//
//   usage: assert-commit-parses.mjs            # reads git HEAD
//          assert-commit-parses.mjs --stdin    # reads the message on stdin
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { parser } from '@conventional-commits/parser'

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
try {
  parser(message)
} catch (thrown) {
  error = thrown instanceof Error ? thrown.message : String(thrown)
}

if (!error) {
  console.log(`commit message parses: ${subject}`)
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
