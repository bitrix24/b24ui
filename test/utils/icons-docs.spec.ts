import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * `src/runtime/dictionary/icons.ts` asks, in its own header, to be kept in sync
 * with two documentation pages:
 *
 *     @memo sync with docs/.../6.integrations/1.icons/1.nuxt.md
 *     @memo sync with docs/.../6.integrations/1.icons/2.vue.md
 *
 * Both inline a copy of its `export default { … }` so a reader can see every
 * overridable role. Hand-copying is what let them drift: `star` and the three
 * IDE brand icons were added to the dictionary and never reached the pages, so
 * anyone building icon overrides from the docs silently got an incomplete map
 * (#381).
 *
 * A `@memo` cannot fail, so this does. It compares the key sets, not the file
 * text — the pages deliberately omit the inline SVG bodies of `CursorIcon`,
 * `WindsurfIcon` and `ClaudeIcon`, and pinning the exact characters would make
 * every unrelated reformat of the dictionary a docs failure.
 */

const PAGES = [
  'docs/content/docs/1.getting-started/6.integrations/1.icons/1.nuxt.md',
  'docs/content/docs/1.getting-started/6.integrations/1.icons/2.vue.md'
]

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

/** The keys of the first `export default { … }` block in a file. */
function exportedKeys(source: string, label: string): string[] {
  const start = source.indexOf('export default {')
  expect(start, `${label}: no \`export default {\` block`).toBeGreaterThan(-1)
  const end = source.indexOf('\n}\n', start)
  expect(end, `${label}: unterminated \`export default {\` block`).toBeGreaterThan(start)

  // Matches both forms the dictionary uses: `key: Component,` and the
  // shorthand `Component,` for the named icons.
  return [...source.slice(start, end).matchAll(/^ {2}(\w+)(?::[ \t]*[\w.]+)?,?[ \t]*(?:\/\/.*)?$/gm)]
    .map(match => match[1]!)
    .sort()
}

const dictionaryKeys = exportedKeys(read('src/runtime/dictionary/icons.ts'), 'dictionary')

describe('icons dictionary is mirrored in the docs', () => {
  it('reads a non-trivial dictionary', () => {
    // Every comparison below is vacuous against an empty key set.
    expect(dictionaryKeys.length).toBeGreaterThan(40)
  })

  it.each(PAGES)('%s lists exactly the dictionary roles', (page) => {
    const documented = exportedKeys(read(page), page)

    // Compared as sorted arrays so the diff names the missing or extra role
    // rather than reporting two sizes.
    expect(documented).toEqual(dictionaryKeys)
  })

  it.each(PAGES)('%s still points at the dictionary it copies', (page) => {
    // The code fence carries the source path; if the block is ever moved or
    // renamed, the comparison above would start checking the wrong thing.
    expect(read(page)).toContain('```ts [src/runtime/dictionary/icons.ts]')
  })
})
