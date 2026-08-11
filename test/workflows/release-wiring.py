#!/usr/bin/env python3
"""Fail if the release workflows lose the wiring that makes a release mergeable.

Issue #353 is the reason this exists, and its shape is why a test rather than a
comment. A PR opened with GITHUB_TOKEN fires no `pull_request` event, so
`ci.yml` never runs in a check suite attached to the PR — and a ruleset's
required status check counts only those. The release PR then shows a green `ci`
(the dispatched run is right there in its checks list) and still refuses to
merge with a 405. Nothing about the repository looks wrong until someone clicks
Merge, which is how v2.11.0 ended up being closed and reopened by hand.

Every invariant below is one line in a workflow whose removal restores that:

  - release-please gets an App token, so the PR it opens is not GITHUB_TOKEN's
    and CI runs the ordinary way;
  - the no-App fallback says out loud that the PR needs a nudge, instead of
    leaving the next person to rediscover the 405;
  - npm-publish serializes, because once both trigger paths can fire for one
    tag, two concurrent runs both find the version unpublished and one dies on
    EPUBLISHCONFLICT — a failed release that in fact shipped.

Parsed as YAML, following `.github/scripts/assert-actions-pinned.py`: a line
scan cannot tell a `token:` under the release-please step from one under any
other step. When PyYAML is unavailable the fallback errs toward flagging.

Covered by test/workflows/release-wiring.test.sh — run it after editing.
"""
import sys
from pathlib import Path

RELEASE_PLEASE = 'googleapis/release-please-action'
APP_TOKEN = 'actions/create-github-app-token'
APP_ID = 'RELEASE_APP_ID'


def steps_of(doc):
    """Every step in every job, flattened. Order is not meaningful to any check."""
    for job in (doc.get('jobs') or {}).values():
        if isinstance(job, dict):
            for step in (job.get('steps') or []):
                if isinstance(step, dict):
                    yield step


def check_release_please(doc, findings):
    steps = list(steps_of(doc))

    release = [s for s in steps if RELEASE_PLEASE in str(s.get('uses', ''))]
    if not release:
        findings.append(f'no step uses {RELEASE_PLEASE}')
    for step in release:
        token = str((step.get('with') or {}).get('token', '')).strip()
        if not token:
            findings.append(
                'the release-please step passes no `token:` — it falls back to '
                'GITHUB_TOKEN, whose PRs fire no pull_request event (#353)'
            )
        elif 'app-token' not in token:
            findings.append(
                f"the release-please step's token does not come from the App step: {token!r}"
            )

    minted = [s for s in steps if APP_TOKEN in str(s.get('uses', ''))]
    if not minted:
        findings.append(f'no step mints an App token with {APP_TOKEN}')
    for step in minted:
        # Guarded, not unconditional: without the guard a repository that has
        # not configured the secrets fails the whole release run and never even
        # opens a release PR, which is worse than the bug being fixed.
        if f"{APP_ID} != ''" not in str(step.get('if', '')):
            findings.append(
                f"the App-token step is not guarded by `{APP_ID} != ''`, so a "
                'repository without the secrets fails instead of falling back'
            )

    # Matched on the condition mentioning the App-token step rather than on its
    # exact text: the invariant is "the no-App path is not silent", and pinning
    # the phrasing would turn a rewording into a failure.
    warned = [
        s for s in steps
        if 'app-token' in str(s.get('if', '')) and '::warning::' in str(s.get('run', ''))
    ]
    if not warned:
        findings.append(
            'nothing warns on the no-App path — its failure mode is a '
            'green-looking PR that cannot be merged, so it must not be silent'
        )


def check_npm_publish(doc, findings):
    concurrency = doc.get('concurrency')
    group = concurrency.get('group') if isinstance(concurrency, dict) else concurrency
    if not str(group or '').strip():
        findings.append(
            'no `concurrency` group — both trigger paths can fire for one tag, '
            'and concurrent runs race past the "already published" skip'
        )


CHECKS = {
    'release-please.yml': check_release_please,
    'npm-publish.yml': check_npm_publish,
}


# Distinct from `None`, which is what an empty file parses to. Conflating the
# two sent an empty workflow down the "PyYAML is missing" path, where it was
# reported with the wrong reason attached — findings that happened to be right
# for a mechanism that was not what had occurred.
NO_PARSER = object()


def load(path: Path):
    try:
        import yaml
    except ImportError:
        return NO_PARSER
    try:
        return yaml.safe_load(path.read_text(encoding='utf-8'))
    except yaml.YAMLError as error:
        return error


def fallback(name: str, text: str, findings):
    """Noisier than the parser, never quieter: substrings only, no structure."""
    required = {
        'release-please.yml': [
            ('steps.app-token.outputs.token', 'release-please is not given the App token (#353)'),
            (APP_TOKEN, 'nothing mints an App token'),
            (f"{APP_ID} != ''", 'the App-token step is not guarded'),
            ("steps.app-token.outputs.token == ''", 'the no-App path is not branched on'),
            ('::warning::', 'the no-App path does not warn'),
        ],
        'npm-publish.yml': [('concurrency:', 'no concurrency group')],
    }
    for needle, message in required.get(name, []):
        if needle not in text:
            findings.append(f'{message} (text fallback: {needle!r} not found)')


def main(workflows: Path) -> int:
    findings = []
    for name, check in CHECKS.items():
        path = workflows / name
        if not path.is_file():
            findings.append(f'{name}: missing')
            continue

        doc = load(path)
        if doc is NO_PARSER:
            fallback(name, path.read_text(encoding='utf-8'), findings)
            continue

        before = len(findings)
        # A workflow that is empty, unparseable, or not a mapping reaches none
        # of the checks below, and every one of them would raise on it rather
        # than report. Say what is wrong with the file instead of a traceback.
        if isinstance(doc, Exception):
            findings.append(f'does not parse as YAML: {doc.__class__.__name__}')
        elif not isinstance(doc, dict):
            found = 'empty' if doc is None else type(doc).__name__
            findings.append(f'is not a workflow mapping ({found}), so nothing here is configured')
        else:
            check(doc, findings)
        findings[before:] = [f'{name}: {f}' for f in findings[before:]]

    for finding in findings:
        print(finding)
    return 1 if findings else 0


if __name__ == '__main__':
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[2] / '.github/workflows'
    sys.exit(main(root))
