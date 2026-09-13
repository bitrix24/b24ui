import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * `AGENTS.md` is the de-facto contributor guide and is read verbatim by coding
 * agents, so a command it quotes that does not exist costs every reader the
 * same minute. It listed `pnpm run dev:repl` and `pnpm run demo:dev` for long
 * enough to reach an audit; the scripts are `repl` and `demo`.
 *
 * Nothing about that failure is visible: prose does not run. This asserts the
 * one property that would have caught it — every `pnpm run <script>` quoted in
 * the contributor docs resolves to a script `package.json` actually defines.
 *
 * The docs site is included only where it quotes *this* repository's scripts —
 * `4.contribution.md` is the published mirror of the contributor guide. The
 * installation and usage pages are out, because there `pnpm add` and `pnpm dev`
 * belong to the reader's project, which this `package.json` says nothing about.
 *
 * `README.md` is out for the same reason: its `pnpm` lines install this package
 * into somebody else's application. `CONTRIBUTING.md` is in — it is the first
 * file GitHub shows a contributor, and every command in it runs here.
 */
const repoRoot = process.cwd()

const DOC_FILES = [
  'AGENTS.md',
  'CONTRIBUTING.md',
  '.github/contributing/testing.md',
  '.github/contributing/documentation.md',
  '.github/contributing/component-structure.md',
  '.github/contributing/theme-structure.md',
  '.github/contributing/releasing.md',
  'docs/content/docs/1.getting-started/4.contribution.md'
]

/**
 * pnpm's own subcommands, which look identical to a script invocation without
 * `run` and are not defined in `package.json`.
 */
const PNPM_BUILTINS = new Set([
  'add', 'install', 'i', 'remove', 'update', 'up', 'link', 'unlink', 'dlx', 'exec',
  'create', 'init', 'publish', 'pack', 'store', 'why', 'list', 'ls', 'audit', 'outdated', 'rebuild'
])

const scripts = Object.keys(JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')).scripts)

/**
 * Both `pnpm run lint` and the bare `pnpm build` form are invocations of a
 * script, and the docs use both. Only the first word is a script name:
 * `pnpm run test run -u` is the `test` script plus arguments passed through to
 * vitest. pnpm's own subcommands are filtered out rather than matched, since
 * `pnpm add` is not a script anyone should have to define.
 */
const quotedScripts = (file: string): string[] =>
  [...readFileSync(join(repoRoot, file), 'utf8').matchAll(/pnpm (?:run )?([a-z][\w:-]*)/g)]
    .map(match => match[1]!)
    .filter(name => !PNPM_BUILTINS.has(name))

describe('documented pnpm scripts', () => {
  // Anchors the extraction: if the regex ever stops matching, every assertion
  // below passes on an empty list and the guard quietly stops guarding.
  it('finds the commands AGENTS.md is known to quote', () => {
    expect(quotedScripts('AGENTS.md')).toEqual(expect.arrayContaining(['dev:prepare', 'lint', 'typecheck', 'test']))
  })

  it.each(DOC_FILES)('%s quotes only scripts that exist', (file) => {
    const missing = [...new Set(quotedScripts(file))].filter(name => !scripts.includes(name)).sort()

    // Named rather than counted, so the failure says which command to fix.
    expect(missing).toEqual([])
  })
})
