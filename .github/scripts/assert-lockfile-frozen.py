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

`frozen-lockfile=true` in the repository's `.npmrc` looks like a one-line
replacement for all of this and is not one: `.npmrc` is committed, so it would
apply to contributors too, and both `.sync/PORTING.md` §6 ("after editing a
manifest, run `pnpm install` and then `pnpm install --frozen-lockfile`") and
the public contribution guide tell people to run a bare `pnpm install` that
would then fail. The setting belongs in CI, which is where this puts it.

Parsed as YAML, for the reason assert-actions-pinned.py is: a line scanner
cannot see a `run: |` block's commands as commands, and `run:` values wrap.
There is deliberately no line-scanner fallback. The first version had one, and
all three reviews found the same thing — it failed **open**: `- run: pnpm
install` shlex-splits to `argv[0] == '-'`, so every realistic one-line install
sailed past it while the module docstring promised the opposite. A check that
is quietly inert in some environments is worse than one that refuses to run,
so a missing parser is now an error.

What this does not catch, by decision rather than oversight: an install reached
through an indirection the parser cannot follow — `bash -c "pnpm install"`, a
`$PM install` variable, a shell function. Those are not how this regression
arrives; it arrives as somebody editing a visible install line. An author with
write access to a workflow who wants an unfrozen install has better options
than hiding one, so chasing indirection here would buy nothing.

Covered by test/workflows/lockfile-check.test.sh — run it after editing.
"""
import re
import shlex
import sys
from pathlib import Path

# `pnpm i`, `pnpm install`, and the same behind `pnpm --dir x install`. `pnpm add`
# is a different command: it edits the manifest by design and is not in scope.
INSTALL_ALIASES = {'i', 'install'}
# Enough of pnpm's surface to tell "this is some other command" from "the option
# parse went wrong". Only used to decide whether to keep looking — see below.
KNOWN_SUBCOMMANDS = {
    'add', 'audit', 'bin', 'config', 'create', 'dedupe', 'deploy', 'dlx',
    'doctor', 'env', 'exec', 'fetch', 'why', 'import', 'init', 'install-test',
    'licenses', 'link', 'list', 'ls', 'outdated', 'pack', 'patch',
    'patch-commit', 'patch-remove', 'prune', 'publish', 'rebuild', 'remove',
    'root', 'run', 'server', 'setup', 'start', 'store', 'test', 'unlink',
    'update', 'why', 'rm', 'up', 'it', 'dx', 'x',
}
# Wrappers that put the real command one token to the right.
PREFIXES = {'npx', 'corepack', 'sudo', 'time', 'command', 'exec', 'nice'}
FROZEN = '--frozen-lockfile'
UNFROZEN = '--no-frozen-lockfile'
# Splits a shell line into commands. Deliberately coarse: it over-segments
# rather than under-segments, so a command can only ever be examined more
# often than it runs, never less.
SEPARATORS = re.compile(r'&&|\|\||[;|&\n]')
# `foo \<newline> bar` is one command; splitting on the newline would hide it.
CONTINUATION = re.compile(r'\\\n\s*')


def _is_frozen(argv) -> bool:
    """True when argv asks for a frozen lockfile and does not then cancel it."""
    frozen = False
    for token in argv:
        if token == UNFROZEN or token == f'{UNFROZEN}=true':
            return False
        if token == f'{FROZEN}=false':
            return False
        # `--frozen-lockfile` and `--frozen-lockfile=true` are the same request;
        # reading only the bare form reddened CI on a correctly frozen install.
        if token == FROZEN or token == f'{FROZEN}=true':
            frozen = True
    return frozen


def _subcommand(rest):
    """Resolve pnpm's subcommand, or None when the option parse is unsure."""
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
        return rest[idx]
    return None


def install_commands(script: str):
    """Yield the argv of every pnpm install in a shell script."""
    script = CONTINUATION.sub(' ', script)
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
        # Strip a leading `env FOO=1` / `FOO=1` / `npx` / `sudo` prefix.
        while argv and (argv[0] in PREFIXES or argv[0] == 'env'
                        or '=' in argv[0].split('/')[-1]):
            argv = argv[1:]
        if not argv or Path(argv[0]).name not in ('pnpm', 'pnpm.cjs'):
            continue
        rest = argv[1:]
        sub = _subcommand(rest)
        if sub in INSTALL_ALIASES:
            yield rest
        elif sub is not None and sub not in KNOWN_SUBCOMMANDS:
            # The parse landed on something that is not a pnpm subcommand, which
            # means an option before it took a value this script does not know
            # about (`--loglevel debug install`). Fail closed: if an install
            # alias appears anywhere in the rest, treat the line as an install
            # rather than assume the parse was right.
            if any(token in INSTALL_ALIASES for token in rest):
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
        if not _is_frozen(argv):
            reason = UNFROZEN if any(UNFROZEN in a for a in argv) else f'missing {FROZEN}'
            bad.append(f'{path}: {line}  <- {reason}')
    return bad


def check(text, path):
    import yaml
    try:
        doc = yaml.safe_load(text)
    except yaml.YAMLError as exc:
        return [f'{path}: not valid YAML ({exc.__class__.__name__})']
    return [p for run in walk_runs(doc) for p in problems(run, path)]


def main() -> int:
    try:
        import yaml  # noqa: F401
    except ImportError:
        print('::error::PyYAML is required by assert-lockfile-frozen.py. It is '
              'preinstalled on GitHub-hosted runners; install it (pip install '
              'pyyaml) rather than skipping the check — a line scanner cannot '
              'read a `run: |` block and the one this replaced failed open.')
        return 1

    roots = [Path(a) for a in sys.argv[1:]] or [Path('.github')]
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
