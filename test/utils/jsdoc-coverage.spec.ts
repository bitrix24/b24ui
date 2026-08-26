import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * `./composables` and `./utils` are published `exports` paths, so every symbol
 * they hand out is a symbol somebody hovers in an editor. #89 measured what
 * that hover said: 11 of 22 composable functions documented, 17 of 58 utils,
 * and not one of the fifteen injection keys.
 *
 * A sweep fixes that once. This keeps it fixed — the next export arrives with
 * a doc block or with a failing test, which is cheaper than another audit.
 *
 * Deliberately not a lint rule: `jsdoc/require-jsdoc` would police every file
 * in the repository, and the claim here is narrower than that. It is about the
 * two directories a consumer can import from.
 */
const ROOTS = ['src/runtime/composables', 'src/runtime/utils']

/** `export function foo` / `export const foo` — what a consumer can import. */
const EXPORT = /^export\s+(?:async\s+)?(?:function|const)\s+([A-Za-z_$][\w$]*)/gm

/** Every `.ts` under `dir`, recursively, `node_modules` pruned. */
function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : sources(path)
    return entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts') ? [path] : []
  })
}

/**
 * Exports with no doc block immediately above them.
 *
 * "Immediately" is the whole check: a comment separated by another statement
 * documents that statement, and TypeScript shows the reader nothing.
 */
function undocumented(file: string): string[] {
  const source = readFileSync(file, 'utf8')
  const lines = source.split('\n')
  const missing: string[] = []

  for (const match of source.matchAll(EXPORT)) {
    let line = source.slice(0, match.index).split('\n').length - 2
    while (line >= 0 && lines[line]!.trim() === '') line--
    if (line < 0 || !lines[line]!.trim().endsWith('*/')) missing.push(match[1]!)
  }

  return missing
}

describe('published composables and utils', () => {
  const files = ROOTS.flatMap(sources)

  it('are found at all', () => {
    // Without this the assertion below passes on an empty list, which is how a
    // guard over a directory that moved reads exactly like a guard that holds.
    expect(files.length).toBeGreaterThan(40)
  })

  it('document every exported symbol', () => {
    const gaps = files
      .map(file => [file, undocumented(file)] as const)
      .filter(([, names]) => names.length > 0)
      .map(([file, names]) => `${file}: ${names.join(', ')}`)
      .sort()

    expect(gaps, [
      'These are exported from a published path and have no doc block, so an',
      'editor shows the reader a signature and nothing else (#89).',
      '',
      'A line saying what it is for is enough; @param and @returns where the',
      'signature does not already say it. An injection key needs one line: who',
      'provides it and who reads it.'
    ].join('\n')).toEqual([])
  })
})
