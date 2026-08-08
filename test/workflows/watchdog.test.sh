#!/usr/bin/env bash
# Drives .github/scripts/watchdog-*.sh through the states they can actually meet,
# with gh/npm stubbed. Several of the bugs three rounds of review found in this
# workflow shared one shape — a failure inside an `if` condition, which bash
# exempts from errexit, so the job stays green and the outcome is wrong — and
# reasoning about the script does not catch that reliably. Others were plainer:
# a substring match that was too loose, a dedup filter that trusted the wrong
# author. Running the thing catches both kinds.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
SCRIPTS="$ROOT/.github/scripts"
# Deliberately no `node` stub: the real one is present, offline and
# deterministic, and stubbing it hid a typo in the very line that decides which
# package the npm check looks up.
STUBS="$ROOT/test/workflows/stubs"
pass=0
fail=0
WORKDIR=$(mktemp -d)
trap 'rm -rf "$WORKDIR"' EXIT

# run <name> <script> <expected-exit> <expected-findings> [KEY=VALUE ...]
# Exit code and findings count are only two of the three things that matter: a
# branch whose whole job is to say something out loud — the crash-threshold
# warning, the 404-versus-5xx distinction — is invisible to both. `expect_log`
# below is the third oracle.
run() {
  local name=$1 script=$2 want_exit=$3 want_findings=$4
  export script
  shift 4
  # The seeding below happens in this shell, so the flag has to be read from the
  # arguments rather than from the environment handed to the script under test.
  local seed_empty=0 arg
  for arg in "$@"; do [ "$arg" = "EMPTY_FINDINGS=1" ] && seed_empty=1; done

  local dir
  dir=$(mktemp -d "$WORKDIR/case.XXXXXX")
  ( cd "$dir" || exit 1
    printf '{"name":"@bitrix24/b24ui-nuxt"}' > package.json
    # The reporting script consumes findings.md rather than producing it.
    case "$script" in
      watchdog-report.sh)
        if [ "$seed_empty" = 1 ]; then : > findings.md; else printf -- '- a finding\n' > findings.md; fi ;;
      *) : > findings.md ;;
    esac
    env PATH="$STUBS:$PATH" WORKFLOW_TEST_STUBS=1 \
        GITHUB_OUTPUT="$dir/gh_output" MUTATION_LOG="$dir/mutations" \
        GH_TOKEN=stub REPO=bitrix24/b24ui \
        MAX_OPEN_DAYS=14 CRASH_MAX_OPEN_DAYS=2 API_RETRY_SLEEP=0 \
        MARKER='<!-- release-watchdog -->' \
        "$@" bash "$SCRIPTS/$script" > stdout.txt 2> stderr.txt )
  local got_exit=$?
  local got_findings
  got_findings=$(wc -l < "$dir/findings.md" 2>/dev/null | tr -d ' ')
  got_findings=${got_findings:-0}

  if [ "$got_exit" = "$want_exit" ] && [ "$got_findings" = "$want_findings" ]; then
    echo "  ok   $name"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — exit $got_exit (want $want_exit), findings $got_findings (want $want_findings)"
    sed 's/^/       out: /' "$dir/stdout.txt" | head -6
    sed 's/^/       err: /' "$dir/stderr.txt" | head -6
    fail=$((fail + 1))
  fi
  LAST_DIR=$dir
}

# expect_log <name> <regex>  — asserts the previous run said something
expect_log() {
  local name=$1 pattern=$2
  if grep -qE "$pattern" "$LAST_DIR/stdout.txt" "$LAST_DIR/stderr.txt" 2>/dev/null; then
    echo "  ok   $name"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — no line matching /$pattern/"
    sed 's/^/       out: /' "$LAST_DIR/stdout.txt" | head -8
    fail=$((fail + 1))
  fi
}

# refute_log <name> <regex>  — asserts the previous run did NOT say something
refute_log() {
  local name=$1 pattern=$2
  if grep -qE "$pattern" "$LAST_DIR/stdout.txt" "$LAST_DIR/stderr.txt" 2>/dev/null; then
    echo "  FAIL $name — found a line matching /$pattern/"
    fail=$((fail + 1))
  else
    echo "  ok   $name"
    pass=$((pass + 1))
  fi
}

# mutation <name> <expected>  — asserts what the reporting step did to GitHub
mutation() {
  local name=$1 want=$2
  local got
  got=$( [ -f "$LAST_DIR/mutations" ] && cut -d' ' -f1 < "$LAST_DIR/mutations" | head -1 )
  got=${got:-none}
  if [ "$got" = "$want" ]; then
    echo "  ok   $name"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — mutation '$got' (want '$want')"
    fail=$((fail + 1))
  fi
}

# Built from an epoch offset rather than `date -d '38 days ago'`, which is a GNU
# extension: on macOS the suite would not run at all.
days_ago() { python3 -c "import time;print(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(time.time() - $1 * 86400)))"; }
FRESH=$(days_ago 0)
OLD=$(days_ago 38)
FOUR=$(days_ago 4)
BOT='{"number":500,"title":"chore: a release is waiting","body":"<!-- release-watchdog -->\nreport","user":{"login":"github-actions[bot]"}}'
HUMAN='{"number":999,"title":"chore: a release is waiting","body":"x <!-- release-watchdog --> y","user":{"login":"outsider"}}'
# The marker exists so a human renaming the issue does not spawn a duplicate…
BOT_RENAMED='{"number":501,"title":"release 2.11.0 — waiting on review","body":"<!-- release-watchdog -->\nreport","user":{"login":"github-actions[bot]"}}'
# …and it has to lead the body, or a bot issue merely quoting a past report
# captures every future one.
BOT_QUOTED='{"number":502,"title":"something else entirely","body":"we saw <!-- release-watchdog --> in the logs","user":{"login":"github-actions[bot]"}}'

echo "collect:"
run "quiet when the release PR is fresh"        watchdog-collect.sh 0 0 PR_CREATED="$FRESH"
run "reports an overdue release PR"             watchdog-collect.sh 0 1 PR_CREATED="$OLD"
run "severity:crash tightens the threshold"     watchdog-collect.sh 0 1 PR_CREATED="$FOUR" CRASH_ISSUES='[{"number":1}]'
run "without the label the same PR is quiet"    watchdog-collect.sh 0 0 PR_CREATED="$FOUR"
run "no release yet is not an error"            watchdog-collect.sh 0 0 PR_CREATED="$FRESH" GH_SCENARIO=release_404
run "a 5xx on the release skips the npm check"  watchdog-collect.sh 0 0 PR_CREATED="$FRESH" GH_SCENARIO=release_500
run "a failed pulls list does not fail the run" watchdog-collect.sh 0 0 GH_SCENARIO=pulls_fail
run "npm E404 reports a missing publish"        watchdog-collect.sh 0 1 PR_CREATED="$FRESH" NPM_SCENARIO=e404
run "the legacy npm ERR! shape too"             watchdog-collect.sh 0 1 PR_CREATED="$FRESH" NPM_SCENARIO=e404_old
run "a network error is not a missing publish"  watchdog-collect.sh 0 0 PR_CREATED="$FRESH" NPM_SCENARIO=network
run "E404 inside a URL is not a missing publish" watchdog-collect.sh 0 0 PR_CREATED="$FRESH" NPM_SCENARIO=decoy
run "a missing MAX_OPEN_DAYS fails loudly"      watchdog-collect.sh 1 0 PR_CREATED="$OLD" MAX_OPEN_DAYS=
expect_log "  and names the variable"            "::error::MAX_OPEN_DAYS must be a non-negative integer"
run "a non-numeric CRASH_MAX_OPEN_DAYS too"     watchdog-collect.sh 1 0 PR_CREATED="$OLD" CRASH_MAX_OPEN_DAYS=soon
run "a non-numeric override fails loudly"       watchdog-collect.sh 1 0 PR_CREATED="$OLD" OVERRIDE_DAYS=abc
run "a decimal override fails loudly"           watchdog-collect.sh 1 0 PR_CREATED="$OLD" OVERRIDE_DAYS=5.0
run "override 0 reports any open PR"            watchdog-collect.sh 0 1 PR_CREATED="$FRESH" OVERRIDE_DAYS=0

run "a failed crash lookup keeps the default"  watchdog-collect.sh 0 0 PR_CREATED="$FOUR" GH_SCENARIO=crash_fail
expect_log "  and says so rather than failing open" "::warning::could not check for severity:crash"
refute_log "  and does not tighten the threshold"   "threshold tightened"
run "a 404 on the release is not an error"      watchdog-collect.sh 0 0 PR_CREATED="$FRESH" GH_SCENARIO=release_404
expect_log "  and is reported as no release yet"  "no published release yet"
refute_log "  without a warning"                  "::warning::could not read the latest release"
run "a 5xx on the release warns"                watchdog-collect.sh 0 0 PR_CREATED="$FRESH" GH_SCENARIO=release_500
expect_log "  and says the npm check was skipped" "::warning::could not read the latest release"

echo "report:"
run "opens an issue when none exists"           watchdog-report.sh 0 1 ISSUES_JSON='[]'
mutation "  and the mutation is a create"       CREATE
run "comments on its own issue"                 watchdog-report.sh 0 1 ISSUES_JSON="[$BOT]"
mutation "  and the mutation is a comment"      COMMENT
run "ignores an outsider carrying the marker"   watchdog-report.sh 0 1 ISSUES_JSON="[$HUMAN]"
mutation "  and opens its own issue instead"    CREATE
run "still finds its issue after a title edit" watchdog-report.sh 0 1 ISSUES_JSON="[$BOT_RENAMED]"
mutation "  and comments rather than duplicating"  COMMENT
run "ignores a bot issue quoting the marker"   watchdog-report.sh 0 1 ISSUES_JSON="[$BOT_QUOTED]"
mutation "  because the marker must lead the body" CREATE
run "refuses to guess when the list fails"      watchdog-report.sh 1 1 GH_SCENARIO=issues_fail
mutation "  and touches nothing"                none

echo "resilience:"
FLAKY=$(mktemp)
run "recovers after two transient failures"     watchdog-collect.sh 0 1 PR_CREATED="$OLD" GH_SCENARIO=flaky_pulls FLAKY_COUNTER="$FLAKY" FLAKY_FAILS=2
expect_log "  after retrying"                    "attempt 2/3 failed"
: > "$FLAKY"
run "gives up after three"                      watchdog-collect.sh 0 0 PR_CREATED="$OLD" GH_SCENARIO=flaky_pulls FLAKY_COUNTER="$FLAKY" FLAKY_FAILS=9
expect_log "  and says the check was skipped"    "::warning::could not list open pull requests"
rm -f "$FLAKY"

echo "selection:"
FRESH_PR='{"number":200,"title":"fresh","created_at":"'"$FRESH"'","labels":[{"name":"autorelease: pending"}]}'
OLD_PR='{"number":100,"title":"stale","created_at":"'"$OLD"'","labels":[{"name":"autorelease: pending"}]}'
run "picks the older of two labelled PRs"       watchdog-collect.sh 0 1 PULLS_JSON="[$FRESH_PR,$OLD_PR]"
expect_log "  regardless of array order"         "release PR #100"
run "and the same in the other order"           watchdog-collect.sh 0 1 PULLS_JSON="[$OLD_PR,$FRESH_PR]"
expect_log "  still the older one"               "release PR #100"
run "finds a label that is only on page two"    watchdog-collect.sh 0 1 PULLS_JSON="[] [$OLD_PR]"

echo "running it by hand:"
run "works without GITHUB_OUTPUT"               watchdog-collect.sh 0 1 PR_CREATED="$OLD" GITHUB_OUTPUT=
run "an empty report opens nothing"             watchdog-report.sh 0 0 EMPTY_FINDINGS=1 ISSUES_JSON='[]'
mutation "  and touches nothing"                none

rm -rf "$WORKDIR"

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
