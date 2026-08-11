# Releasing

Releases are automated. Nothing here has to be run by hand in the normal case —
with one setup step that is not optional if `main` requires a `ci` status check:
[the release App](#the-release-app) must be configured, or every release PR
arrives unmergeable. That is #353, and the workflow warns when it applies.

## The normal path

1. **Merge work into `main`** with conventional-commit subjects (`feat:`, `fix:`,
   `docs:`, `ci:`, …). Nothing is published at this point.
2. **release-please keeps one release PR open**, titled `chore(main): release
   X.Y.Z`. It contains nothing but the version bump (`package.json` and
   `.release-please-manifest.json`) and the new CHANGELOG section assembled from
   the commits since the last tag. Every push to `main` rewrites that same PR —
   fifteen merged fixes update it fifteen times, they do not cut fifteen
   releases.
3. **Merging the release PR is the release.** It tags the commit, publishes the
   GitHub Release with those notes, and dispatches `npm-publish.yml` against the
   tag. Merge it the way every other PR here is merged — squash. release-please
   keys off the merged PR's `merge_commit_sha` from the API, not off the shape of
   the commit graph, so squashing does not orphan anything.
4. **`npm-publish.yml` publishes** after asserting the commit is merged `main`
   history and waiting for CI to be green on that exact SHA. Publishing goes
   through npm trusted publishing (OIDC) — there is no long-lived token in the
   repository.

The npm side of that last step is configured **outside this repository**, in the
package's Trusted Publisher settings on npmjs.com, and it is pinned to the
workflow's filename (`npm-publish.yml`) and optionally an environment name.
Renaming either breaks publishing with no signal from here — if you rename the
file or the `npm-publish` environment, update npm to match in the same change.

So the only decision a human makes is *when to merge the release PR*. Its
description is the changelog you are about to ship; read it and merge.

## The release App

`RELEASE_APP_ID` and `RELEASE_APP_PRIVATE_KEY` are repository secrets holding a
GitHub App with **Contents: read & write** and **Pull requests: read & write**
on this repository. `release-please.yml` mints a token from them per run and
opens the release PR as the App.

This is not cosmetic, and the reason is worth stating because the failure it
prevents looks nothing like a permissions problem. A PR opened with
`GITHUB_TOKEN` fires no `pull_request` event — that is a deliberate GitHub rule,
to stop workflows triggering each other in a loop. So `ci.yml` never runs in a
check suite attached to the PR, and a ruleset's required status check counts
only those. The release PR then shows a green `ci` in its checks list and still
refuses to merge:

```
405 Repository rule violations found
Required status check "ci" is expected.
```

The check *is* there, on the right commit, successful. It belongs to the branch
rather than to the PR. v2.11.0 hit exactly this.

**Without the secrets nothing breaks loudly** — the workflow falls back to
`GITHUB_TOKEN`, still opens the release PR, and emits a warning saying the PR
needs a nudge. To ship in that state: **close the release PR and reopen it.**
`reopened` is a real `pull_request` event, so CI re-runs in a suite the rule
counts and the merge goes through. Nothing is lost by doing this — release-please
only acts on pushes to `main`, so the PR is not regenerated in between.

Two things that look like shortcuts and are not:

- **Dispatching `ci.yml` onto the release branch.** This is what the workflow
  did before #353 and it is why the bug survived two releases: the run is real,
  green and visible on the PR, and the rule still does not count it.
- **Posting a `ci` commit status from the workflow.** A status set by the API
  *would* satisfy the rule — because it would be the release process marking its
  own homework. Even mirroring a real run's conclusion puts a gate's answer
  behind a line of shell nobody reviews as a gate. Don't.

`test/workflows/release-wiring.test.sh` fails if this wiring is removed, since
every line of it reads as boilerplate and none of it fails until merge time.

**The commitment is two weeks.** An open release PR should not outlive it, and
`release-watchdog.yml` reports one that does. The number lives in that workflow's
`MAX_OPEN_DAYS`; if the team's cadence changes, change both.

While the PR is open it doubles as a live list of what is fixed on `main` and not
yet on npm. That is deliberate — issue #315 exists because a crash fix sat
unreleased for five weeks with nothing surfacing the fact.

## How the version is chosen

| commits since the last tag | next version |
| --- | --- |
| any `BREAKING CHANGE` / `!` | major |
| at least one `feat:` | minor |
| otherwise (`fix:`, `docs:`, `ci:`, …) | patch |

The highest wins, and it applies once — fifteen `fix:` commits produce one patch
release, not fifteen. To force a specific version, put `Release-As: 2.12.0` in a
commit footer.

## Hotfix policy

A **crash-class** bug is one where the published package fails to start, or
breaks applications that merely upgrade, with no workaround the user can apply
themselves. #301 is the reference case: every SPA on Nuxt ≥ 4.5.1 died on boot.

When one is confirmed:

1. Label the issue `severity:crash`.
2. Fix it, and **merge the release PR within 48 hours** — not on the next
   convenient cadence. The fix reaching `main` is not the goal; the fix reaching
   npm is.
3. Say so in the issue when it is published, with the version.

The fast lane ships whatever else is on `main` alongside the fix. That is
intended: with releases automated, `main` is rarely far ahead of the last tag, so
the cost is small — and it is far smaller than the alternative, which is what
#301 cost (79 commits shipped as one minor five weeks late, because extracting
the fix retroactively had become the expensive option).

**If `main` is not in a releasable state**, that is itself part of the emergency.
The publish gate requires the commit to be merged `main` history — by design,
since anything else would let an unreviewed commit reach npm — so a hotfix
branched off the last tag cannot be published without disabling that check.

If a *merged change* is what makes `main` unreleasable: revert it, ship the
patch, re-land it afterwards. This is smaller than it sounds, and the reason is
worth saying out loud at 2am — **unreleased work on `main` has no users**.
Reverting it costs nobody anything, and the re-land is a rebase.

If CI is red for something that is not a revertable commit — a flaky suite, a
broken runner image, a playground build that only fails in `npm-publish.yml` —
there is nothing to revert, and **there is no bypass in the pipeline**. Say it
plainly, because the alternatives look tempting at 2am and none of them work:
`process` declares `needs: await-ci`, so a red CI skips the publishing job
entirely — it never queues, which means the `npm-publish` environment never asks
anyone to approve anything. Adding required reviewers there does not open a door;
it only ever closes one.

So the options are the honest two. **Fix the failure** — for a flake, re-running
`ci.yml` on the release commit is usually faster than any workaround, and the
`await-ci` gate polls for thirty minutes, so a re-run that goes green inside that
window needs no further action. **Or accept the delay** and say so on the issue.

If neither is acceptable — a crash-class bug, CI broken for reasons nobody can
fix quickly — the break-glass is a maintainer publishing by hand: `pnpm build`
then `pnpm publish` from a machine logged in to npm. It is deliberately ugly.
It skips the merged-history assert, the CI gate and npm's provenance, and it
needs a human account with publish rights rather than the repository's OIDC
identity. Do it only as the last step, and open an issue afterwards recording
what was published, from where, and why the pipeline could not. Never edit the
gate out of the workflow to get the same result quietly.

## What is watched automatically

`release-watchdog.yml` runs daily and opens an issue when either of these is
true:

- the release PR has been open for 14 days or more — or **2 days**, when an open
  issue carries `severity:crash`, so the 48-hour promise above has something
  behind it besides memory;
- the latest tag exists but that version is not on npm — i.e. the publish never
  completed. Recovery for that one is Actions → **NPM publish** → *Run workflow*
  with the tag selected as the ref; re-runs are safe, an already-published
  version ends as a green no-op.

The `severity:crash` half of that first line needs the label to exist in
Settings → Labels. Nothing creates it, and GitHub returns an empty list rather
than an error for a label that was never created — so if it is missing the
threshold silently stays at 14 days and the 48-hour promise has nothing behind
it after all.

Actions → **Release watchdog** → *Run workflow* takes a day-threshold override.
It is the only way to exercise the reporting path without waiting out the real
threshold: dispatching with `0` reports whatever release PR is currently open.

## Optional hardening

`npm-publish.yml` declares `environment: npm-publish`. GitHub auto-creates a
referenced environment **without** protection rules, so by default the job runs
unprotected and the release PR merge is the only human step. Adding required
reviewers to that environment in Settings → Environments turns on a second
approval before anything reaches npm, with no code change.
