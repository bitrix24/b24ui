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
 * Deliberately not extended to `docs/`: the documentation site quotes commands
 * for the *consumer's* project (`pnpm add`, their own `dev`), which this
 * repository's `package.json` says nothing about.
 */
const repoRoot = process.cwd()

const DOC_FILES = [
  'AGENTS.md',
  '.github/contributing/testing.md',
  '.github/contributing/documentation.md',
  '.github/contributing/component-structure.md',
  '.github/contributing/theme-structure.md',
  '.github/contributing/releasing.md'
]

const scripts = Object.keys(JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')).scripts)

/**
 * `pnpm run test run -u` is one script (`test`) plus arguments passed through to
 * vitest, so only the first word after `run` is a script name.
 */
const quotedScripts = (file: string): string[] =>
  [...readFileSync(join(repoRoot, file), 'utf8').matchAll(/pnpm run ([a-z][\w:-]*)/g)].map(match => match[1]!)

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
