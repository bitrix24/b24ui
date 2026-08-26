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

/**
 * The export forms this guard understands, and the names each one publishes.
 *
 * The first version of this file matched only `export function|const <name>`,
 * which read as "every export is covered" while three live ones were invisible
 * to it: `export { provideThemeContext }`, `export { linkKeys }`, and
 * `export const [useDashboard, provideDashboardContext] = createContext(…)`.
 * Two of those were undocumented; the third was a re-export whose original is
 * documented elsewhere, and it is covered here anyway — see below.
 * A guard that reports 100% while missing exports is worse than no guard, so
 * every form the language offers is listed here even where the codebase has no
 * instance of it yet — `export default`, `export class`, `export let|var` and
 * generator functions arrive documented or arrive red.
 *
 * `export type` / `export interface` are deliberately absent. A type's shape is
 * its documentation and TypeScript renders it on hover in full; the claim being
 * guarded is about values, whose signature says nothing about intent.
 */
const EXPORT_FORMS: { re: RegExp, names: (m: RegExpMatchArray) => string[] }[] = [
  // export function foo / export async function* foo / export class Foo /
  // export const|let|var foo
  {
    re: /^export\s+(?:async\s+)?(?:function\s*\*|function|class|const|let|var)\s+([a-z_$][\w$]*)/gim,
    names: m => [m[1]!]
  },
  // export const [a, b] = … / export const { a, b } = …
  {
    re: /^export\s+(?:const|let|var)\s*[[{]([^\]}]+)[\]}]\s*=/gm,
    names: m => bindings(m[1]!)
  },
  // export { a, b as c } — but not `export { type T }` or `export type { … }`.
  // A re-export is included on purpose: it is a line a reader lands on, and
  // one sentence saying why the symbol is surfaced here beats teaching this
  // file to parse import clauses well enough to recognise one.
  {
    re: /^export\s*\{([^}]*)\}/gm,
    names: m => bindings(m[1]!)
  },
  // export default … — anonymous to the importer, so it needs the prose more
  // than a named export does, not less.
  {
    re: /^export\s+default\b/gm,
    names: () => ['default']
  }
]

/** Names in a `{ … }` / `[ … ]` list, minus `type` specifiers and aliases. */
function bindings(list: string): string[] {
  return list
    .split(',')
    .map(entry => entry.trim())
    .filter(entry => entry.length > 0 && !entry.startsWith('type '))
    .map(entry => entry.split(/\s+as\s+/).pop()!.trim())
    .filter(entry => /^[a-z_$][\w$]*$/i.test(entry))
}

/** Every `.ts` under `dir`, recursively, `node_modules` pruned. */
function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : sources(path)
    return entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts') ? [path] : []
  })
}

/**
 * Whether a JSDoc block sits immediately above line `index`.
 *
 * "Immediately" is half the check: a comment separated by another *statement*
 * documents that statement, and TypeScript shows the reader nothing. Blank
 * lines are stepped over, and so is a one-line non-JSDoc annotation such as
 * `@__NO_SIDE_EFFECTS__`, because the compiler steps over it too — it gathers
 * JSDoc from the whole leading trivia, so the hover is unaffected by a bundler
 * hint sitting between the block and the declaration.
 *
 * The other half is that it has to be a *JSDoc* block. Checking only for the
 * closing delimiter accepted any block comment, which is how `defineLocale`
 * and `extendLocale` passed this file's first version on that same
 * `@__NO_SIDE_EFFECTS__` annotation while carrying no prose at all. Stepping
 * over it and counting it are different things; only a comment opening with
 * two stars is one an editor renders.
 */
function isDocumented(lines: string[], index: number): boolean {
  const skippable = (text: string) =>
    text === '' || (text.startsWith('/*') && !text.startsWith('/**') && text.endsWith('*/'))

  let line = index - 1
  while (line >= 0 && skippable(lines[line]!.trim())) line--
  if (line < 0) return false

  const closing = lines[line]!.trim()
  if (closing.startsWith('/**')) return closing.endsWith('*/')
  if (closing !== '*/') return false

  let open = line
  while (open >= 0 && !lines[open]!.trim().startsWith('/*')) open--
  return open >= 0 && lines[open]!.trim().startsWith('/**')
}

/** Exports with no doc block immediately above them. */
function undocumented(file: string): string[] {
  const source = readFileSync(file, 'utf8')
  const lines = source.split('\n')
  const missing = new Set<string>()

  for (const form of EXPORT_FORMS) {
    for (const match of source.matchAll(form.re)) {
      const index = source.slice(0, match.index).split('\n').length - 1
      if (isDocumented(lines, index)) continue
      for (const name of form.names(match)) missing.add(name)
    }
  }

  return [...missing].sort()
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
      'provides it and who reads it.',
      '',
      'The block has to open with /** and sit immediately above the export.',
      'Blank lines and a one-line bundler annotation are stepped over; another',
      'statement is not, and an annotation does not itself count as prose.',
      'Documenting several exports under one shared block flags all but the',
      'first, on purpose: each symbol is hovered on its own.'
    ].join('\n')).toEqual([])
  })
})
