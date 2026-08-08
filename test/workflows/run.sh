#!/usr/bin/env bash
# Runs every workflow-script test. Also `pnpm run test:workflows`.
set -uo pipefail
here=$(cd "$(dirname "$0")" && pwd)
status=0
for suite in "$here"/*.test.sh; do
  echo "== $(basename "$suite")"
  bash "$suite" || status=1
  echo
done
exit "$status"
