#!/usr/bin/env bash
# Shared GitHub API helper for the release watchdog.
#
# `gh api` prints the error body to STDOUT and skips --jq whenever the status is
# >= 400, so the usual `$(gh api … 2>/dev/null || echo "")` idiom does not yield
# an empty string — it yields the error JSON, which then flows onward as if it
# were data. Every call goes through this instead: the body is printed only on
# success, a 404 is reported as its own outcome, and everything else is retried
# the way npm-publish.yml already retries its compare call.
#
# Returns: 0 with the body on stdout, 2 for a confirmed 404, 1 for anything else.
api() {
  local out attempt
  for attempt in 1 2 3; do
    if out=$(gh api "$@" 2>/tmp/api.err); then
      printf '%s' "$out"
      return 0
    fi
    if grep -q 'HTTP 404' /tmp/api.err; then
      return 2
    fi
    echo "attempt $attempt/3 failed for: $* ($(tail -1 /tmp/api.err))" >&2
    [ "$attempt" -lt 3 ] && sleep "${API_RETRY_SLEEP:-5}"
  done
  return 1
}
