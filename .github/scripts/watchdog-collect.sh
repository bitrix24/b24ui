#!/usr/bin/env bash
# Collects what the release watchdog has to report. Writes findings.md in the
# working directory and `found=true|false` to $GITHUB_OUTPUT.
#
# Environment: GH_TOKEN, REPO, MAX_OPEN_DAYS, CRASH_MAX_OPEN_DAYS, OVERRIDE_DAYS.
# Covered by test/workflows/watchdog.test.sh — run it after editing.
set -eo pipefail

# shellcheck source=lib/gh-api.sh
. "$(dirname "$0")/lib/gh-api.sh"

: > findings.md

# 1. Release PR sitting open. release-please labels its PR `autorelease: pending`;
# matching the label rather than the branch name survives a config change to the
# branch pattern.
pr=""
pr_checked=false
if prs=$(api --paginate "repos/$REPO/pulls?state=open&per_page=100"); then
  pr_checked=true
  pr=$(jq -rs 'add // [] | map(select(any(.labels[]; .name == "autorelease: pending"))) | first // empty' <<<"$prs")
else
  echo "::warning::could not list open pull requests; skipping the release-PR check"
fi

threshold="$MAX_OPEN_DAYS"
if crash=$(api "repos/$REPO/issues?state=open&labels=severity%3Acrash&per_page=1"); then
  if [ "$(jq 'length' <<<"$crash")" -gt 0 ]; then
    threshold="$CRASH_MAX_OPEN_DAYS"
    echo "an open severity:crash issue exists — threshold tightened to $threshold day(s)"
  fi
else
  # Failing open here would quietly downgrade a 48-hour promise to a fortnight,
  # which is exactly the silence this job exists to break.
  echo "::warning::could not check for severity:crash issues; using the default threshold"
fi

if [ -n "${OVERRIDE_DAYS:-}" ]; then
  # `[ 30 -ge abc ]` returns 2, which reads as false inside an `if` and is exempt
  # from errexit — a typo would turn the age check off and still end green.
  case "$OVERRIDE_DAYS" in
    ''|*[!0-9]*)
      echo "::error::max_open_days must be a non-negative integer, got '$OVERRIDE_DAYS'"
      exit 1
      ;;
  esac
  threshold="$OVERRIDE_DAYS"
  echo "threshold overridden by dispatch input: $threshold day(s)"
fi

if [ -n "$pr" ]; then
  number=$(jq -r '.number' <<<"$pr")
  created=$(jq -r '.created_at' <<<"$pr")
  age=$(( ( $(date -u +%s) - $(date -u -d "$created" +%s) ) / 86400 ))
  echo "release PR #$number is $age day(s) old (threshold $threshold)"
  if [ "$age" -ge "$threshold" ]; then
    # Referenced by number, never by title: the title is attacker-supplied text
    # and this body tells a human to run the publish workflow.
    printf -- '- **Release PR #%s has been open for %s days.** Everything in it is fixed on `main` and not on npm. Merging it tags, releases and publishes.\n' \
      "$number" "$age" >> findings.md
  fi
elif [ "$pr_checked" = true ]; then
  echo "no open release PR — nothing unreleased, or a release is mid-flight"
fi

# 2. Tagged but never published — the failure the dispatch design can produce:
# the GitHub Release exists, npm-publish.yml was dispatched, something downstream
# refused, and nothing else notices.
tag=""
# `$?` below is api()'s return code: nothing may be inserted between this `if`
# and its `elif`, or the 404 branch silently stops working.
if release=$(api "repos/$REPO/releases/latest"); then
  tag=$(jq -r '.tag_name // empty' <<<"$release")
elif [ $? -eq 2 ]; then
  echo "no published release yet — nothing to compare against npm"
else
  echo "::warning::could not read the latest release; skipping the npm check"
fi

if [ -n "$tag" ]; then
  version="${tag#v}"
  name=$(node -p "require('./package.json').name")
  # A failing lookup is not evidence of a missing publish: a registry blip would
  # otherwise tell a maintainer to hand-dispatch a release that already shipped.
  # Matched on the whole token npm prints — a bare `*E404*` also matches an
  # unrelated failure whose message merely contains those characters.
  if npm_err=$(npm view "$name@$version" version 2>&1 >/dev/null); then
    echo "$name@$version is on npm"
  elif [[ "$npm_err" == *"npm error code E404"* || "$npm_err" == *"npm ERR! code E404"* ]]; then
    printf -- '- **`%s` is tagged but `%s@%s` is not on npm.** The publish step did not complete. Recovery: Actions -> NPM publish -> Run workflow, with `%s` selected as the ref; re-runs are safe, an already-published version ends as a green no-op.\n' \
      "$tag" "$name" "$version" "$tag" >> findings.md
  else
    echo "::warning::could not check npm for $name@$version: $npm_err"
  fi
fi

if [ -s findings.md ]; then
  echo "found=true" >> "$GITHUB_OUTPUT"
  cat findings.md
else
  echo "found=false" >> "$GITHUB_OUTPUT"
  echo "nothing to report"
fi
