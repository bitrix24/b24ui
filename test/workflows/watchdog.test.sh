#!/usr/bin/env bash
# Drives .github/scripts/watchdog-*.sh through the states they can actually meet,
# with gh/npm/node stubbed. Every bug found in three rounds of review on this
# workflow was the same shape: a failure inside an `if` condition, which bash
# exempts from errexit, leaving the job green and the outcome wrong. Reasoning
# about the script does not catch that reliably; running it does.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
SCRIPTS="$ROOT/.github/scripts"
STUBS="$ROOT/test/workflows/stubs"
pass=0
fail=0

# run <name> <script> <expected-exit> <expected-findings> [KEY=VALUE ...]
run() {
  local name=$1 script=$2 want_exit=$3 want_findings=$4
  export script
  shift 4
  local dir
  dir=$(mktemp -d)
  ( cd "$dir" || exit 1
    printf '{"name":"@bitrix24/b24ui-nuxt"}' > package.json
    # The reporting script consumes findings.md rather than producing it.
    case "$script" in
      watchdog-report.sh) printf -- '- a finding\n' > findings.md ;;
      *) : > findings.md ;;
    esac
    env PATH="$STUBS:$PATH" \
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

FRESH=$(date -u -d '0 days ago' +%Y-%m-%dT%H:%M:%SZ)
OLD=$(date -u -d '38 days ago' +%Y-%m-%dT%H:%M:%SZ)
FOUR=$(date -u -d '4 days ago' +%Y-%m-%dT%H:%M:%SZ)
BOT='{"number":500,"title":"chore: a release is waiting","body":"<!-- release-watchdog -->\nreport","user":{"login":"github-actions[bot]"}}'
HUMAN='{"number":999,"title":"chore: a release is waiting","body":"x <!-- release-watchdog --> y","user":{"login":"outsider"}}'

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
run "a non-numeric override fails loudly"       watchdog-collect.sh 1 0 PR_CREATED="$OLD" OVERRIDE_DAYS=abc
run "a decimal override fails loudly"           watchdog-collect.sh 1 0 PR_CREATED="$OLD" OVERRIDE_DAYS=5.0
run "override 0 reports any open PR"            watchdog-collect.sh 0 1 PR_CREATED="$FRESH" OVERRIDE_DAYS=0

echo "report:"
run "opens an issue when none exists"           watchdog-report.sh 0 1 ISSUES_JSON='[]'
mutation "  and the mutation is a create"       CREATE
run "comments on its own issue"                 watchdog-report.sh 0 1 ISSUES_JSON="[$BOT]"
mutation "  and the mutation is a comment"      COMMENT
run "ignores an outsider carrying the marker"   watchdog-report.sh 0 1 ISSUES_JSON="[$HUMAN]"
mutation "  and opens its own issue instead"    CREATE
run "refuses to guess when the list fails"      watchdog-report.sh 1 1 GH_SCENARIO=issues_fail
mutation "  and touches nothing"                none

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
