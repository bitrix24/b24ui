#!/usr/bin/env python3
"""Fail if a workflow installs dependencies without a frozen lockfile.

Note what this is and is not. pnpm enables `--frozen-lockfile` on its own
whenever `CI` is set, and GitHub Actions always sets it, so a bare
`pnpm install` in a workflow is already frozen. The guarantee just rests on an
environment variable rather than on anything written here, and it is not
visible to a reader of the file.

The regression this exists to catch is the deliberate one: `--no-frozen-lockfile`
added to get a red build green, which turns a tampered or drifted lockfile into
a silent re-resolve at exactly the moments that matter — the Pages build and
the publish. That is a one-line change nobody re-reads, and it is invisible to
every other gate.

Parsed as YAML, for the reason assert-actions-pinned.py is: a line scanner
cannot see a `run: |` block's commands as commands, and `run:` values wrap.
When PyYAML is unavailable the fallback errs toward flagging.

Covered by test/workflows/lockfile-check.test.sh — run it after editing.
"""
import re
import shlex
import sys
from pathlib import Path

# `pnpm i`, `pnpm install`, and the same behind `pnpm --dir x install`. `pnpm add`
# is a different command: it edits the manifest by design and is not in scope.
INSTALL_ALIASES = {'i', 'install'}
FROZEN = '--frozen-lockfile'
UNFROZEN = '--no-frozen-lockfile'
# Splits a shell line into commands. Deliberately coarse: it over-segments
# rather than under-segments, so a command can only ever be examined more
# often than it runs, never less.
SEPARATORS = re.compile(r'&&|\|\||[;|&\n]')


def install_commands(script: str):
    """Yield the argv of every pnpm install in a shell script."""
    for chunk in SEPARATORS.split(script):
        chunk = chunk.strip()
        if not chunk:
            continue
        try:
            argv = shlex.split(chunk, comments=True)
        except ValueError:
            # Unbalanced quotes: this is not a shell, so rather than guess, hand
            # the raw text on and let the caller decide. Splitting on whitespace
            # keeps a `pnpm install` visible.
            argv = chunk.split()
        if not argv:
            continue
        # Strip a leading `env FOO=1` / `FOO=1` prefix.
        while argv and ('=' in argv[0].split('/')[-1] or argv[0] == 'env'):
            argv = argv[1:]
        if not argv or Path(argv[0]).name not in ('pnpm', 'pnpm.cjs'):
            continue
        # The subcommand is the first argument that is not an option or an
        # option's value; `--dir x install` and `--filter=y i` both reach here.
        rest = argv[1:]
        idx = 0
        while idx < len(rest):
            token = rest[idx]
            if token.startswith('-'):
                # `--dir x` takes a value; `--dir=x` and bare flags do not. Only
                # value-taking options belong here: skipping two tokens for a
                # boolean one — `--workspace-root` was in this list once — eats
                # the subcommand and turns the check silently green.
                if token in ('--dir', '-C', '--filter', '-F'):
                    idx += 2
                    continue
                idx += 1
                continue
            break
        if idx < len(rest) and rest[idx] in INSTALL_ALIASES:
            yield rest


def walk_runs(node):
    """Yield every `run:` value in a parsed workflow or composite action."""
    if isinstance(node, dict):
        for key, value in node.items():
            if key == 'run' and isinstance(value, str):
                yield value
            else:
                yield from walk_runs(value)
    elif isinstance(node, list):
        for item in node:
            yield from walk_runs(item)


def problems(script: str, path) -> list:
    bad = []
    for argv in install_commands(script):
        line = 'pnpm ' + ' '.join(argv)
        if UNFROZEN in argv:
            bad.append(f'{path}: {line}  <- {UNFROZEN}')
        elif FROZEN not in argv:
            bad.append(f'{path}: {line}  <- missing {FROZEN}')
    return bad


def check_with_yaml(text, path):
    import yaml
    try:
        doc = yaml.safe_load(text)
    except yaml.YAMLError as exc:
        return [f'{path}: not valid YAML ({exc.__class__.__name__})']
    return [p for run in walk_runs(doc) for p in problems(run, path)]


def check_with_lines(text, path):
    """Fallback: no parser available, so the whole file is treated as script."""
    return problems(text, path)


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
        print(f'::error::every `pnpm install` in a workflow must pass {FROZEN}. '
              'pnpm applies it by default under CI, so dropping it changes '
              'nothing today and leaves the guarantee resting on the `CI` '
              'variable; passing --no-frozen-lockfile removes it outright. If a '
              'build needs an unfrozen install, fix the lockfile instead.')
        return 1
    print('every workflow install is frozen')
    return 0


if __name__ == '__main__':
    sys.exit(main())
