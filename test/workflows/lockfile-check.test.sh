#!/usr/bin/env bash
# Drives .github/scripts/assert-lockfile-frozen.py against the forms an install
# can take. The cases matter more than the check does: pnpm already freezes
# under CI, so the guard's whole job is to catch the shapes that opt out of that
# on purpose, and each one below is a way of writing an install that a line
# grep for `pnpm install --frozen-lockfile` would have accepted.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
CHECK="$ROOT/.github/scripts/assert-lockfile-frozen.py"
pass=0
fail=0

# case <name> <expect: flagged|accepted> <run: body>
case_() {
  local name=$1 expect=$2 body=$3
  local dir
  dir=$(mktemp -d)
  mkdir -p "$dir/workflows"
  { echo 'jobs:'; echo '  j:'; echo '    steps:'; echo "      - run: $body"; } > "$dir/workflows/fixture.yml"
  local out
  out=$(python3 "$CHECK" "$dir" 2>&1)
  local got=accepted
  [ -n "${out##*fixture.yml*}" ] || got=flagged

  if [ "$got" = "$expect" ]; then
    echo "  ok   $name ($expect)"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — $got, want $expect"
    echo "       run: $body"
    echo "$out" | sed 's/^/       /'
    fail=$((fail + 1))
  fi
  rm -rf "$dir"
}

case_ "frozen install"                accepted "pnpm install --frozen-lockfile"
case_ "frozen, flag first"            accepted "pnpm --frozen-lockfile install"
case_ "frozen short alias"            accepted "pnpm i --frozen-lockfile"
case_ "pnpm add is not an install"    accepted "pnpm add -D vitest"
case_ "not pnpm at all"               accepted "npm install"
case_ "a script that mentions pnpm"   accepted "echo 'run pnpm install first'"
case_ "run-script named install"      accepted "pnpm run install-hooks"

case_ "bare install"                  flagged  "pnpm install"
case_ "bare short alias"              flagged  "pnpm i"
case_ "explicitly unfrozen"           flagged  "pnpm install --no-frozen-lockfile"
case_ "unfrozen despite frozen first" flagged  "pnpm install --frozen-lockfile --no-frozen-lockfile"
case_ "second command in a chain"     flagged  "pnpm install --frozen-lockfile && pnpm install"
case_ "behind a semicolon"            flagged  "cd docs; pnpm install"
case_ "behind an env prefix"          flagged  "CI=1 pnpm install"
case_ "behind env(1)"                 flagged  "env CI=1 pnpm install"
case_ "with --dir before the verb"    flagged  "pnpm --dir docs install"
case_ "with --filter before the verb" flagged  "pnpm --filter docs i"
# Boolean options must not be treated as value-taking: skipping two tokens for
# `--workspace-root` swallowed `install` and the check went quietly green.
case_ "with a boolean before the verb" flagged  "pnpm --workspace-root install"
case_ "with -w before the verb"       flagged  "pnpm -w install"
case_ "with --dir=x before the verb"  flagged  "pnpm --dir=docs install"
case_ "absolute path to pnpm"         flagged  "/usr/local/bin/pnpm install"
case_ "inside a block scalar" flagged "|
          pnpm run build
          pnpm install"

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
