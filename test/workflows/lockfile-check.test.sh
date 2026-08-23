#!/usr/bin/env bash
# Drives .github/scripts/assert-lockfile-frozen.py against the forms an install
# can take. The cases matter more than the check does: pnpm already freezes
# under CI, so the guard's whole job is to catch the shapes that opt out of that
# on purpose, and each one below is a way of writing an install that a line
# grep for `pnpm install --frozen-lockfile` would have accepted.
#
# Every case asserts the exit code, not just the output. The first version
# matched on the fixture path alone, which meant a script that died with a
# traceback — a syntax error, an unhandled exception — was scored `accepted`
# for every accepted case, silently. The suite only went red because the
# flagged cases happened to flip too.
set -uo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
CHECK="$ROOT/.github/scripts/assert-lockfile-frozen.py"
pass=0
fail=0

report() {
  local name=$1 expect=$2 got=$3 detail=$4
  if [ "$got" = "$expect" ]; then
    echo "  ok   $name ($expect)"
    pass=$((pass + 1))
  else
    echo "  FAIL $name — $got, want $expect"
    [ -n "$detail" ] && echo "$detail" | sed 's/^/       /'
    fail=$((fail + 1))
  fi
}

# Scores one run: `accepted` = exit 0 and nothing said about the fixture,
# `flagged` = exit 1 naming the fixture, `broken` = anything else, which is
# always a failure whatever the case expected. The third argument is the
# fixture's filename, because the composite-action case does not use
# fixture.yml and matching the wrong name scored a correct flag as broken.
score() {
  local out=$1 rc=$2 name=${3:-fixture.yml}
  if [ "$rc" -eq 0 ] && [ -n "${out##*$name*}" ]; then
    echo accepted
  elif [ "$rc" -eq 1 ] && [ -z "${out##*$name*}" ]; then
    echo flagged
  else
    echo "broken(rc=$rc)"
  fi
}

# case_ <name> <expect: flagged|accepted> <run: body>
case_() {
  local name=$1 expect=$2 body=$3
  local dir out rc
  dir=$(mktemp -d)
  mkdir -p "$dir/workflows"
  { echo 'jobs:'; echo '  j:'; echo '    steps:'; echo "      - run: $body"; } > "$dir/workflows/fixture.yml"
  out=$(python3 "$CHECK" "$dir" 2>&1); rc=$?
  report "$name" "$expect" "$(score "$out" "$rc")" "run: $body
$out"
  rm -rf "$dir"
}

echo "accepted — a frozen install, or not an install at all:"
case_ "frozen install"                accepted "pnpm install --frozen-lockfile"
case_ "frozen, flag first"            accepted "pnpm --frozen-lockfile install"
case_ "frozen short alias"            accepted "pnpm i --frozen-lockfile"
# `--dir=x` is handled deliberately, so reading only the bare `--frozen-lockfile`
# reddened CI on an install that was in fact frozen.
case_ "frozen=true"                   accepted "pnpm install --frozen-lockfile=true"
case_ "pnpm add is not an install"    accepted "pnpm add -D vitest"
case_ "pnpm dlx is not an install"    accepted "pnpm dlx cowsay hi"
case_ "not pnpm at all"               accepted "npm install"
case_ "a script that mentions pnpm"   accepted "echo 'run pnpm install first'"
case_ "run-script named install"      accepted "pnpm run install-hooks"
case_ "frozen behind a value option"  accepted "pnpm --loglevel error install --frozen-lockfile"

echo
echo "flagged — an install that is not frozen:"
case_ "bare install"                  flagged  "pnpm install"
case_ "bare short alias"              flagged  "pnpm i"
case_ "explicitly unfrozen"           flagged  "pnpm install --no-frozen-lockfile"
case_ "unfrozen despite frozen first" flagged  "pnpm install --frozen-lockfile --no-frozen-lockfile"
case_ "frozen=false"                  flagged  "pnpm install --frozen-lockfile=false"
case_ "second command in a chain"     flagged  "pnpm install --frozen-lockfile && pnpm install"
case_ "behind a semicolon"            flagged  "cd docs; pnpm install"
case_ "behind an env prefix"          flagged  "CI=1 pnpm install"
case_ "behind env(1)"                 flagged  "env CI=1 pnpm install"
case_ "with --dir before the verb"    flagged  "pnpm --dir docs install"
case_ "with --filter before the verb" flagged  "pnpm --filter docs i"
# Boolean options must not be treated as value-taking: skipping two tokens for
# `--workspace-root` swallowed `install` and the check went quietly green.
case_ "with a boolean before the verb" flagged "pnpm --workspace-root install"
case_ "with -w before the verb"       flagged  "pnpm -w install"
case_ "with --dir=x before the verb"  flagged  "pnpm --dir=docs install"
# An option this script does not know takes a value: the parse lands on the
# value, which is not a pnpm subcommand, so it keeps looking instead of
# concluding there is no install here.
case_ "unknown value option"          flagged  "pnpm --loglevel debug install"
case_ "unknown value option, short"   flagged  "pnpm --reporter append-only i"
case_ "wrapped in npx"                flagged  "npx pnpm install"
case_ "wrapped in corepack"           flagged  "corepack pnpm install"
case_ "absolute path to pnpm"         flagged  "/usr/local/bin/pnpm install"
case_ "inside a block scalar" flagged "|
          pnpm run build
          pnpm install"
case_ "split over a line continuation" flagged "|
          pnpm \\
            install"
# shlex cannot split this chunk, so the fallback splits on whitespace instead of
# dropping it. The quote has to be inside the same chunk as the install: an
# earlier draft put it before an `&&`, which SEPARATORS splits on first, leaving
# shlex a perfectly balanced `pnpm install` and never reaching the branch.
case_ "unbalanced quote in the chunk" flagged  "pnpm install \"unclosed"

echo
echo "structure — where a run: can live:"
# `walk_runs` claims to cover composite actions. Nothing tested that until now.
d=$(mktemp -d); mkdir -p "$d/actions/setup"
cat > "$d/actions/setup/action.yml" <<'YAML'
name: fixture
runs:
  using: composite
  steps:
    - run: pnpm install
      shell: bash
YAML
out=$(python3 "$CHECK" "$d" 2>&1); rc=$?
report "composite action.yml" flagged "$(score "$out" "$rc" action.yml)" "$out"
rm -rf "$d"

d=$(mktemp -d); mkdir -p "$d/workflows"
printf 'jobs:\n  j:\n    steps:\n      - {run: "pnpm install"}\n' > "$d/workflows/fixture.yml"
out=$(python3 "$CHECK" "$d" 2>&1); rc=$?
report "flow mapping step" flagged "$(score "$out" "$rc")" "$out"
rm -rf "$d"

# The symlink skip exists so a hardening check cannot be turned into a way to
# print an arbitrary file into a public log. It had no test.
d=$(mktemp -d); mkdir -p "$d/workflows"
printf 'jobs:\n  j:\n    steps:\n      - run: pnpm install\n' > "$d/target.txt"
ln -s "$d/target.txt" "$d/workflows/fixture.yml"
out=$(python3 "$CHECK" "$d" 2>&1); rc=$?
if [ "$rc" -eq 0 ] && [ -z "${out##*skipping symlink*}" ]; then
  echo "  ok   symlink is skipped, not read (accepted)"
  pass=$((pass + 1))
else
  echo "  FAIL symlink was not skipped — rc=$rc"
  echo "$out" | sed 's/^/       /'
  fail=$((fail + 1))
fi
rm -rf "$d"

echo
echo "environment:"
# The line-scanner fallback this replaced failed open: `- run: pnpm install`
# shlex-split to argv[0] == '-', so nothing was examined and the check reported
# green. A missing parser must now be an error, never a quieter pass.
d=$(mktemp -d); mkdir -p "$d/workflows"
printf 'raise ImportError("no yaml here")\n' > "$d/yaml.py"
printf 'jobs:\n  j:\n    steps:\n      - run: pnpm install --no-frozen-lockfile\n' > "$d/workflows/fixture.yml"
out=$(PYTHONPATH="$d" python3 "$CHECK" "$d" 2>&1); rc=$?
if [ "$rc" -eq 1 ] && [ -z "${out##*PyYAML is required*}" ]; then
  echo "  ok   refuses to run without PyYAML (flagged)"
  pass=$((pass + 1))
else
  echo "  FAIL without PyYAML the check did not refuse — rc=$rc"
  echo "$out" | sed 's/^/       /'
  fail=$((fail + 1))
fi
rm -rf "$d"

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
