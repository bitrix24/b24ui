#!/usr/bin/env python3
"""Fail if any GitHub Action is referenced by anything but a commit SHA.

Pinning is a state; this is the control that keeps it. The realistic way the
pins get lost here is not carelessness but a port: upstream nuxt/ui bumps
actions by tag, and PR #297 replayed exactly such a bump, rewriting `uses:`
from @v6 to @v7.

Parsed as YAML rather than scanned line by line. A line regex was the first
attempt and it had three working evasions — a value on the following line, and
`"uses":` / `'uses':` with a quoted key — all of which GitHub Actions accepts
and all of which sailed through. A control that can be walked around is worse
than none, because the green check is read as an assurance.

When PyYAML is unavailable the fallback scanner errs toward flagging: it is
allowed to be noisier than the parser, never quieter.

Covered by test/workflows/pin-check.test.sh — run it after editing.
"""
import re
import sys
from pathlib import Path

PINNED = re.compile(r'[^@\s]+@[0-9a-fA-F]{40}')
# Quoted keys are valid YAML; the first version of this check missed both forms.
USES_LINE = re.compile(r'''(?:^|[-{,\s])["']?uses["']?\s*:(.*)$''')


def is_pinned(ref: str) -> bool:
    ref = ref.strip().strip('"\'')
    # A local action is not fetched from anywhere, so there is nothing to pin.
    return ref.startswith('./') or bool(PINNED.fullmatch(ref))


def walk_uses(node):
    """Yield every `uses:` value in a parsed workflow or composite action."""
    if isinstance(node, dict):
        for key, value in node.items():
            if key == 'uses' and isinstance(value, str):
                yield value
            else:
                yield from walk_uses(value)
    elif isinstance(node, list):
        for item in node:
            yield from walk_uses(item)


def check_with_yaml(text, path):
    import yaml
    try:
        doc = yaml.safe_load(text)
    except yaml.YAMLError as exc:
        return [f'{path}: not valid YAML ({exc.__class__.__name__})']
    return [f'{path}: uses: {ref}' for ref in walk_uses(doc) if not is_pinned(ref)]


def check_with_lines(text, path):
    """Fallback: no parser available, so anything unconfirmed is flagged."""
    bad = []
    lines = text.splitlines()
    for n, line in enumerate(lines, 1):
        m = USES_LINE.search(line.split('#', 1)[0])
        if not m:
            continue
        ref = m.group(1).strip()
        if not ref:
            # `uses:` with the value on the following line. Rather than trying to
            # re-implement YAML, take the next non-empty line as the value.
            ref = next((x.split('#', 1)[0].strip() for x in lines[n:] if x.strip()), '')
        if not is_pinned(ref):
            bad.append(f'{path}:{n}: {line.strip()}')
    return bad


def main() -> int:
    roots = [Path(a) for a in sys.argv[1:]] or [Path('.github')]
    try:
        import yaml  # noqa: F401
        check = check_with_yaml
    except ImportError:
        print('::warning::PyYAML unavailable, falling back to the line scanner')
        check = check_with_lines

    bad = []
    for root in roots:
        for f in sorted(p for ext in ('yml', 'yaml') for p in root.rglob(f'*.{ext}')):
            # A symlink could point anywhere; reading it would turn a hardening
            # check into a way to print arbitrary files into a public log.
            if f.is_symlink():
                print(f'::warning::skipping symlink {f}')
                continue
            bad.extend(check(f.read_text(), f))

    if bad:
        print('\n'.join(bad))
        print('::error::actions must be pinned to a 40-character commit SHA. '
              'Resolve the tag with `git ls-remote <repo> refs/tags/vN '
              'refs/tags/vN^{}` and use the PEELED sha (the `^{}` line) for '
              'annotated tags — the bare one is the tag object and will not '
              'resolve. House style keeps the version in a trailing comment.')
        return 1
    print('all actions are SHA-pinned')
    return 0


if __name__ == '__main__':
    sys.exit(main())
