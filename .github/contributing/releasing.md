# Releasing

Releases are automated up to two human actions, in this order: **approve the
release PR's held CI run, then merge it.** The merge is the decision this
pipeline exists to leave with a person. The approval is not a decision at all —
it is a click GitHub requires and nothing announces.

**If the release PR is sitting at `blocked` while its `ci` check is green, that
is what you are looking at.** See
[Approving the release PR's CI](#approving-the-release-prs-ci).

Three repository settings have to be right for any of this to work, and none of
them fails loudly. They are listed under
[Repository settings this depends on](#repository-settings-this-depends-on).

## The normal path

1. **Merge work into `main`** with conventional-commit subjects (`feat:`, `fix:`,
   `docs:`, `ci:`, …). Nothing is published at this point.
2. **release-please keeps one release PR open**, titled `chore(main): release
   X.Y.Z`. It contains nothing but the version bump (`package.json` and
   `.release-please-manifest.json`) and the new CHANGELOG section assembled from
   the commits since the last tag. Every push to `main` rewrites that same PR —
   fifteen merged fixes update it fifteen times, they do not cut fifteen
   releases.
3. **Approve the held CI run, then merge — in that order.** Merging the release
   PR is the release: it tags the commit, publishes the GitHub Release with those
   notes, and dispatches `npm-publish.yml` against the tag. It will not be
   mergeable until you approve its held `ci` run; see
   [Approving the release PR's CI](#approving-the-release-prs-ci). Merge it the
   way every other PR here is merged — squash. release-please keys off the merged
   PR's `merge_commit_sha` from the API, not off the shape of the commit graph,
   so squashing does not orphan anything.
4. **`npm-publish.yml` publishes** after asserting the commit is merged `main`
   history and waiting for CI to be green on that exact SHA. Publishing goes
   through npm trusted publishing (OIDC) — there is no long-lived token in the
   repository.

The npm side of that last step is configured **outside this repository**, in the
package's Trusted Publisher settings on npmjs.com, and it is pinned to the
workflow's filename (`npm-publish.yml`) and optionally an environment name.
Renaming either breaks publishing with no signal from here — if you rename the
file or the `npm-publish` environment, update npm to match in the same change.

That binding is also what produces the release's **provenance attestation**, and
the publish passes `--provenance` so its absence is an error rather than a
quieter release. npm attaches an attestation on its own when the publish
authenticates through OIDC, which is why 2.12.0 has one without the flag ever
being set; the flag matters for the case where the binding is gone — token auth
still publishes, just without provenance, and nothing else would notice. Check a
shipped release with `npm view @bitrix24/b24ui-nuxt@<version> dist.attestations`.

If a publish ever fails *on the flag itself* — npm rejecting `--provenance`
rather than the package — the release is not lost and does not need the flag
removed in a panic: the tag stays, and re-running `npm-publish.yml` against it
publishes normally. Diagnose it before dropping the flag, because "npm refused
to attest this publish" is exactly the condition it exists to report.

So the only *decision* a human makes is **when to merge the release PR**. Its
description is the changelog you are about to ship: read it, approve the held CI
run, and merge.

**The commitment is two weeks.** An open release PR should not outlive it, and
`release-watchdog.yml` reports one that does. The number lives in that workflow's
`MAX_OPEN_DAYS`; if the team's cadence changes, change both.

While the PR is open it doubles as a live list of what is fixed on `main` and not
yet on npm. That is deliberate — issue #315 exists because a crash fix sat
unreleased for five weeks with nothing surfacing the fact.

## Approving the release PR's CI

**The symptom:** the release PR sits at `blocked` while its `ci` check is
**green**, and merging is refused with

```
Required status check "ci" is expected
```

Two things cause that combination. Check them in this order.

### Cause 1 — a run is held, awaiting approval

The green `ci` you can see is the run `release-please.yml` dispatches. Separately
GitHub creates a `pull_request` run for the PR and holds it at
`action_required`. A held run creates no jobs, and therefore no check run, so it
is invisible on the *Checks* tab — but branch protection is still waiting on it.

This is specific to the bot's branch: ordinary PRs start their CI unattended, and
across the last 30 `pull_request` runs every one on `release-please--**` was held
while none of the others were.

**What to do — immediately before you merge, not earlier.** Go to **Actions →**
the held `ci` run on the `release-please--…` branch and approve it. GitHub also
surfaces the control on the PR itself — *Files changed* → **Awaiting approval**,
or the merge box on *Conversation* — and has labelled the button both
**Approve and run** and **Approve workflows to run**. The run takes about eight
minutes. Then merge.

**Why the ordering.** An approval attaches to a run, and a run attaches to a
commit. Any push to `main` regenerates the release PR onto a new head, stranding
the approval on a commit that is no longer the head while a fresh held run
appears on the new one — up to nine of them in a day here. So approving early to
"have it ready" is wasted within the hour, and **if `main` moves while your run
is in flight, approve the new held run and start the eight minutes over**. On a
busy day that means pausing merges to `main` until the release is out.

### Cause 2 — the branch is behind

If the head commit carries a green `ci` and nothing is held, the PR is simply out
of date with `main`. Update the branch and let `ci` re-run on the new head.

### Why there is no workflow-file fix worth taking

Recorded so nobody re-derives it (#353). Skip unless you are about to try one.

- `branches` and `branches-ignore` are mutually exclusive for one event, and for
  `pull_request` the filter matches the *base* branch — so a head-branch pattern
  matches nothing.
- A job-level `if` on `github.head_ref`, which is GitHub's own prescribed way to
  branch on the head, never evaluates: a held run creates no jobs at all.
- **Do not drop `ci` from required checks.** It would work, and it is a bad
  trade — it removes the merge gate from every PR into `main` to accommodate one
  bot PR, and the publish gate does not compensate, because it protects npm, not
  `main`.
- **Do not have a workflow post a commit status named `ci`.** `GITHUB_TOKEN` can
  `POST /repos/{owner}/{repo}/statuses/{sha}`, and a commit status satisfies a
  required check exactly as a check run does. It works — which is what makes it
  dangerous, because it fabricates the signal the gate exists to carry. Refused
  on purpose; written down so the next person finds the reason and not just the
  trick.

Two routes are unexplored rather than ruled out: adding `merge_group:` to
`ci.yml` behind a merge queue, and the repository or organisation setting that
governs when Actions demands approval at all. Neither has been tried here.

## Repository settings this depends on

None of these is in version control, and none fails loudly.

- **Settings → Actions → General → Workflow permissions →** *Allow GitHub
  Actions to create and approve pull requests*. Without it release-please cannot
  open the release PR at all; the run fails with `GitHub Actions is not
  permitted to create or approve pull requests`. This one gates the pipeline
  existing.
- **Branch protection on `main` requiring the `ci` check.** This is what makes a
  held run block the merge, and therefore what makes the approval above
  necessary. Deliberate — read the trade above before changing it.
- **Settings → Labels → `severity:crash`.** This one gates nothing in the release
  path; it only arms the watchdog's 48-hour threshold, and it fails silently when
  absent. See [What is watched automatically](#what-is-watched-automatically).

## How the version is chosen

| commits since the last tag | next version |
| --- | --- |
| any `BREAKING CHANGE` / `!` | major |
| at least one `feat:` (or its alias `feature:`) | minor |
| otherwise (`fix:`, `revert:`, `docs:`, `ci:`, …) | patch |

The highest wins, and it applies once — fifteen `fix:` commits produce one patch
release, not fifteen. To force a specific version, put `Release-As: 2.12.0` in a
commit footer.

## Hotfix policy

A **crash-class** bug is one where the published package fails to start, or
breaks applications that merely upgrade, with no workaround the user can apply
themselves. #301 is the reference case: every SPA on Nuxt ≥ 4.5.1 died on boot.

When one is confirmed:

1. Label the issue `severity:crash`.
2. Fix it, then **approve the release PR's held CI run and merge it within 48
   hours** — not on the next convenient cadence. The fix reaching `main` is not
   the goal; the fix reaching npm is. Landing the fix regenerates the release PR,
   so the approval has to come after it and immediately before the merge; see
   [Approving the release PR's CI](#approving-the-release-prs-ci).
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

**Title the revert `revert(Scope): …`.** GitHub's revert button produces
`Revert "<original subject>"`, which release-please's parser rejects outright. It
never becomes a changelog line — and if it is the only commit since the last tag,
no release PR is opened at all.

```
Revert "feat(Modal): add fullscreen prop"     ->  vanishes
revert(Modal): drop the fullscreen prop       ->  lands under Reverts
```

**Set that subject in the squash-merge dialog, not only in the PR title.** A
revert PR is always a single commit, and for a single-commit PR GitHub may take
the squash subject from the commit rather than from the PR title, depending on
the repository's squash-merge settings. Editing the message box on the merge
button is the route that works either way.

The parse failure is not silent, though nothing surfaces it where you would
look: the Release Please job log carries `commit could not be parsed: <sha>
Revert "…"` on every run. That line is the diagnosis when a changelog entry is
missing.

The `Reverts` section exists (#435), but only a conventional `revert:` subject
reaches it. Two reverts in this repository's history took the `Revert "…"` form;
both predate `bootstrap-sha` and the CHANGELOG's first entry, so nothing
published is missing anything. The sample of reverts under release-please is
zero, which is why this is written down before the first one rather than after.

**A revert does not cancel the commit it undoes.** release-please pairs nothing:
a `feat:` and its `revert:` in the same release window both appear, and the
release is still a minor. Reverting unreleased work therefore produces a
changelog that announces and retracts the same feature — usually fine, but not a
surprise you want at 2am.

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
fix quickly — the break-glass is a maintainer publishing by hand from a machine
logged in to npm, running the same sequence `npm-publish.yml` does:
`pnpm install --frozen-lockfile`, `pnpm run dev:prepare`, `pnpm build`, then
`pnpm publish --no-git-checks`. `dev:prepare` is not optional — it emits
`.nuxt/b24ui.static.css`, which `package.json` lists in `files` — and without
`--no-git-checks` the publish is refused outright from a detached checkout. It
is deliberately ugly.
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

The `severity:crash` half of that first line needs the label to exist, and
nothing creates it. It is listed under
[Repository settings this depends on](#repository-settings-this-depends-on) with
the reason it fails silently.

Actions → **Release watchdog** → *Run workflow* takes a day-threshold override.
It is the only way to exercise the reporting path without waiting out the real
threshold: dispatching with `0` reports whatever release PR is currently open.

## Optional hardening

`npm-publish.yml` declares `environment: npm-publish`. GitHub auto-creates a
referenced environment **without** protection rules, so by default the job runs
unprotected and the two actions above — approving the held `ci` run and merging
the release PR — are the only human ones. Adding required reviewers to that
environment in Settings → Environments turns on a further approval before
anything reaches npm, with no code change.
