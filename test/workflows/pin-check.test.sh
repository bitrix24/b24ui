#!/usr/bin/env bash
# Drives .github/scripts/assert-actions-pinned.py against a fixture of the forms
# an unpinned action can take. The first version of this check was a grep that
# silently passed `- uses: foo@v1` — the commonest way to write a step, and the
# exact shape of the port that lost a pin in PR #297 — so the point of this test
# is that every evasion is named and stays named.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
CHECK="$ROOT/.github/scripts/assert-actions-pinned.py"
SHA=3d3c42e5aac5ba805825da76410c181273ba90b1
pass=0
fail=0

# case <name> <expect: flagged|accepted> <uses line>
case_() {
  local name=$1 expect=$2 line=$3
  local dir
  dir=$(mktemp -d)
  mkdir -p "$dir/workflows"
  { echo 'jobs:'; echo '  j:'; echo '    steps:'; echo "      $line"; } > "$dir/workflows/fixture.yml"
  local out
  out=$(python3 "$CHECK" "$dir" 2>&1)
  local got=accepted
  [ -n "${out##*fixture.yml*}" ] || got=flagged

  if [ "$got" = "$expect" ]; then
    echo "  ok   $name ($expect)"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — $got, want $expect"
    echo "       line: $line"
    fail=$((fail + 1))
  fi
  rm -rf "$dir"
}

case_ "plain pinned ref"              accepted "- name: x
        uses: actions/checkout@$SHA # v7.0.1"
case_ "quoted pinned ref"             accepted "uses: \"actions/checkout@$SHA\" # v7.0.1"
case_ "pinned, no version comment"    accepted "uses: actions/checkout@$SHA"
case_ "local composite action"        accepted "uses: ./.github/actions/thing"
case_ "tag ref"                       flagged  "uses: actions/checkout@v7"
case_ "dash-prefixed tag ref"         flagged  "- uses: actions/checkout@v7"
case_ "flow mapping tag ref"          flagged  "- {uses: actions/checkout@v7}"
case_ "branch ref"                    flagged  "uses: actions/checkout@main"
case_ "no ref at all"                 flagged  "uses: actions/checkout"
case_ "docker ref with a decoy SHA"   flagged  "uses: docker://evil/image:latest # actions/checkout@$SHA"
case_ "ref-less with a decoy SHA"     flagged  "uses: evil/action  # actions/checkout@$SHA"
case_ "short SHA"                     flagged  "uses: actions/checkout@3d3c42e"
# Evasions found by the security review of the first, line-based implementation.
case_ "value on the following line"   flagged  "- name: x
        uses:
          actions/checkout@v7"
case_ "double-quoted key"             flagged  '- name: x
        "uses": actions/checkout@v7'
case_ "single-quoted key"             flagged  "- name: x
        'uses': actions/checkout@v7"
case_ "quoted key, pinned"            accepted "- name: x
        \"uses\": actions/checkout@$SHA"

echo
if python3 "$CHECK" "$ROOT/.github" >/dev/null 2>&1; then
  echo "  ok   the repository's own workflows pass"
  pass=$((pass + 1))
else
  echo "  FAIL the repository's own workflows do not pass"
  python3 "$CHECK" "$ROOT/.github" 2>&1 | sed 's/^/       /'
  fail=$((fail + 1))
fi

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
