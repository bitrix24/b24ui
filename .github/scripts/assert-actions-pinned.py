#!/usr/bin/env python3
"""Fail if any GitHub Action is referenced by anything but a commit SHA.

Pinning is a state; this is the control that keeps it. The realistic way the
pins get lost here is not carelessness but a port: upstream nuxt/ui bumps
actions by tag, and PR #297 replayed exactly such a bump, rewriting `uses:`
from @v6 to @v7.

Parsed rather than grepped, because a guard that silently skips the common
`- uses:` step form teaches people to stop checking. Comments are stripped
before validation so a real SHA in a trailing comment cannot vouch for an
unpinned ref beside it (the house style keeps the version in that comment; this
check deliberately cannot see it).

Covered by test/workflows/pin-check.test.sh — run it after editing.
"""
import re
import sys
from pathlib import Path

USES = re.compile(r'(?:^|[-{,\s])uses:\s*(.+)$')
PINNED = re.compile(r'[^@\s]+@[0-9a-fA-F]{40}')


def unpinned(root: Path):
    for f in sorted(p for ext in ('yml', 'yaml') for p in root.rglob(f'*.{ext}')):
        for n, line in enumerate(f.read_text().splitlines(), 1):
            code = line.split('#', 1)[0]
            m = USES.search(code)
            if not m:
                continue
            ref = m.group(1).strip().strip('"\'')
            if not ref or ref.startswith('./'):
                continue
            if not PINNED.fullmatch(ref):
                yield f'{f}:{n}: {line.strip()}'


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else '.github')
    bad = list(unpinned(root))
    if bad:
        print('\n'.join(bad))
        print('::error::actions must be pinned to a 40-character commit SHA. '
              'Resolve the tag with `git ls-remote <repo> refs/tags/vN '
              'refs/tags/vN^{}` and use the PEELED sha (the `^{}` line) for '
              'annotated tags — the bare one is the tag object and will not '
              'resolve. House style keeps the version in a trailing comment, '
              'which this check cannot see.')
        return 1
    print('all actions are SHA-pinned')
    return 0


if __name__ == '__main__':
    sys.exit(main())
