#!/usr/bin/env bash
# Drives test/workflows/release-wiring.py against the repository's real release
# workflows and against copies with one line removed each.
#
# The mutations are the point. Every invariant that file checks reads as
# boilerplate — a `token:` line, an `if:` on a step, a `concurrency:` block —
# and deleting any of them leaves two workflows that parse, run, open a release
# PR and look entirely healthy. #353 is what that costs: the PR carries a green
# `ci` and still refuses to merge, discovered only by whoever clicks Merge. So
# each case below deletes exactly one line and asserts the check notices.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
CHECK="$ROOT/test/workflows/release-wiring.py"
WORKFLOWS="$ROOT/.github/workflows"
pass=0
fail=0
WORKDIR=$(mktemp -d)
trap 'rm -rf "$WORKDIR"' EXIT

# case_ <name> <expect: flagged|accepted> <file> <sed-program>
# The sed program mutates one file of a fresh copy of the workflows directory.
case_() {
  local name=$1 expect=$2 file=$3 program=$4
  local dir
  dir=$(mktemp -d "$WORKDIR/case.XXXXXX")
  cp "$WORKFLOWS"/release-please.yml "$WORKFLOWS"/npm-publish.yml "$dir/"

  if [ -n "$program" ]; then
    sed -i "$program" "$dir/$file"
    # A mutation that changed nothing would make the case prove nothing: it
    # would "pass" by flagging whatever the unmutated file already flags, or by
    # accepting a file identical to the original.
    if cmp -s "$dir/$file" "$WORKFLOWS/$file"; then
      echo "  FAIL $name — the mutation did not change $file"
      fail=$((fail + 1))
      rm -rf "$dir"
      return
    fi
  fi

  local out got=accepted
  out=$(python3 "$CHECK" "$dir" 2>&1) || got=flagged

  if [ "$got" = "$expect" ]; then
    echo "  ok   $name ($expect)"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — $got, want $expect"
    [ -n "$out" ] && echo "$out" | sed 's/^/       /'
    fail=$((fail + 1))
  fi
  rm -rf "$dir"
}

case_ "the repository's own workflows pass" accepted release-please.yml ''

# Each of these is a plausible edit. The first is the likeliest: the `token:`
# line looks redundant next to an action that defaults to GITHUB_TOKEN anyway.
case_ "release-please loses its token"      flagged release-please.yml '/token: ${{ steps.app-token.outputs.token || secrets.GITHUB_TOKEN }}/d'
# `@` as the delimiter, not `|`: the expression being replaced contains `||`.
case_ "token hardcoded to GITHUB_TOKEN"     flagged release-please.yml 's@token: ${{ steps.app-token.outputs.token || secrets.GITHUB_TOKEN }}@token: ${{ secrets.GITHUB_TOKEN }}@'
case_ "App-token step removed"              flagged release-please.yml '\|uses: actions/create-github-app-token|d'
case_ "App-token step left unguarded"       flagged release-please.yml "/if: env.RELEASE_APP_ID != ''/d"
case_ "the fallback stops warning"          flagged release-please.yml '/::warning::/d'
case_ "npm-publish loses its concurrency"   flagged npm-publish.yml   '/^concurrency:/,+2d'

# Not mutations of the wiring but of the files themselves. Each has to produce
# a finding rather than a traceback: the first version of the check crashed on a
# workflow that parsed to a non-mapping, and reported an *empty* file through
# the "PyYAML is unavailable" path — right answer, wrong reason printed.
case_ "a workflow is emptied"               flagged release-please.yml 'd'
case_ "a workflow stops being a mapping"    flagged npm-publish.yml   '1!d
s/.*/- just a list/'
case_ "a workflow stops parsing"            flagged release-please.yml '1s/^/  bad: [unclosed\n/'

missing_case() {
  local dir
  dir=$(mktemp -d "$WORKDIR/case.XXXXXX")
  cp "$WORKFLOWS/npm-publish.yml" "$dir/"
  if python3 "$CHECK" "$dir" >/dev/null 2>&1; then
    echo "  FAIL a workflow goes missing — accepted, want flagged"
    fail=$((fail + 1))
  else
    echo "  ok   a workflow goes missing (flagged)"
    pass=$((pass + 1))
  fi
  rm -rf "$dir"
}
missing_case

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
