# Releasing

Releases are automated. Nothing here has to be run by hand in the normal case,
and none of it requires repository settings to be configured first.

## The normal path

1. **Merge work into `main`** with conventional-commit subjects (`feat:`, `fix:`,
   `docs:`, `ci:`, …). Nothing is published at this point.
2. **release-please keeps one release PR open**, titled `chore(main): release
   X.Y.Z`. It contains exactly two things: the version bump and the CHANGELOG
   section assembled from the commits since the last tag. Every push to `main`
   rewrites that same PR — fifteen merged fixes update it fifteen times, they do
   not cut fifteen releases.
3. **Merging the release PR is the release.** It tags the commit, publishes the
   GitHub Release with those notes, and dispatches `npm-publish.yml` against the
   tag.
4. **`npm-publish.yml` publishes** after asserting the commit is merged `main`
   history and waiting for CI to be green on that exact SHA. Publishing goes
   through npm trusted publishing (OIDC) — there is no long-lived token in the
   repository.

So the only decision a human makes is *when to merge the release PR*. Its
description is the changelog you are about to ship; read it and merge.

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
Revert what makes `main` unreleasable, ship the patch, then re-land the reverted
work. It is a smaller operation than it sounds and keeps one release path
instead of two.

## What is watched automatically

`release-watchdog.yml` runs weekly and opens an issue when either of these is
true:

- the release PR has been open for 14 days or more;
- the latest tag exists but that version is not on npm — i.e. the publish never
  completed. Recovery for that one is Actions → **NPM publish** → *Run workflow*
  with the tag selected as the ref; re-runs are safe, an already-published
  version ends as a green no-op.

## Optional hardening

`npm-publish.yml` declares `environment: npm-publish`. GitHub auto-creates a
referenced environment **without** protection rules, so by default the job runs
unprotected and the release PR merge is the only human step. Adding required
reviewers to that environment in Settings → Environments turns on a second
approval before anything reaches npm, with no code change.
