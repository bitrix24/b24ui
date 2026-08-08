#!/usr/bin/env bash
# Shared GitHub API helper for the release watchdog.
#
# `gh api` prints the error body to STDOUT and skips --jq whenever the status is
# >= 400, so the usual `$(gh api … 2>/dev/null || echo "")` idiom does not yield
# an empty string — it yields the error JSON, which then flows onward as if it
# were data. Every *read* goes through this instead: the body is printed only on
# success, a 404 is reported as its own outcome, and everything else is retried
# the way npm-publish.yml already retries its compare call.
#
# The two mutating calls in watchdog-report.sh stay raw on purpose. They discard
# stdout, so the error-body problem cannot bite them, and retrying a POST that
# may already have succeeded is how one issue becomes two.
#
# Returns: 0 with the body on stdout, 2 for a confirmed 404, 1 for anything else.
# Not a fixed path: `2>/tmp/api.err` follows a symlink planted by anyone who can
# write there and truncates the target, and two concurrent jobs on a persistent
# runner would clobber each other's error buffer — which is what the 404-versus-
# retry decision is read from.
API_ERR=$(mktemp -t gh-api.XXXXXX)
trap 'rm -f "$API_ERR"' EXIT

api() {
  local out attempt
  for attempt in 1 2 3; do
    if out=$(gh api "$@" 2>"$API_ERR"); then
      printf '%s' "$out"
      return 0
    fi
    if grep -q 'HTTP 404' "$API_ERR"; then
      return 2
    fi
    echo "attempt $attempt/3 failed for: $* ($(tail -1 "$API_ERR"))" >&2
    # Written as if/fi rather than `[ … ] && sleep`: as the loop's last
    # statement that form returns non-zero on the final pass, which under
    # errexit would kill a caller who ever writes `api foo` on a bare line
    # instead of inside an `if`.
    if [ "$attempt" -lt 3 ]; then
      sleep "${API_RETRY_SLEEP:-5}"
    fi
  done
  return 1
}
