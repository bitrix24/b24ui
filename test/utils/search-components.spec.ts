import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'
import { scoreComponent, tokenize } from '../../docs/server/utils/searchComponents'

/**
 * Guards the intent-ranked MCP component search against the two things that
 * make it fail quietly.
 *
 * The first is the tool's own description. `b24-ui-search-components` promises,
 * in the text an assistant reads before calling it, that `"segmented control"`
 * finds FieldGroup, `"combobox"` finds InputMenu and `"dialog"` finds Modal.
 * Those are claims about `keywords:` frontmatter sitting in three unrelated
 * files, and deleting a keyword leaves the promise in place — the search just
 * returns something else.
 *
 * The second is `docs/content.config.ts`. `keywords` and `category` only exist
 * for the search because the collection schema declares them, and a value that
 * is not declared makes the schema disagree with the content it describes. That
 * is how `components`, `integrations`, `content` and `deprecated` came to be
 * written in frontmatter with no entry in the enum.
 *
 * What this does NOT check is whether a keyword is a *good* one. Keywords are
 * legitimately shared — `disclosure` belongs to both Accordion and Collapsible,
 * `combobox` to both InputMenu and SelectMenu — so "the owning component ranks
 * first" is not a property this data has, and asserting it would only encode
 * the current alphabetical tiebreak.
 */

const contentDir = resolve(process.cwd(), 'docs/content')
const componentsDir = resolve(contentDir, 'docs/2.components')

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

/** The raw YAML block between the leading `---` fences, or `''`. */
function frontmatter(source: string): string {
  if (!source.startsWith('---\n')) return ''
  const end = source.indexOf('\n---', 4)
  return end === -1 ? '' : source.slice(4, end)
}

function scalar(block: string, key: string): string | undefined {
  return block.match(new RegExp(`^${key}:[ \\t]*(.+)$`, 'm'))?.[1]?.trim()
}

function list(block: string, key: string): string[] {
  // The item body starts at `\S` rather than `.`, so the indent quantifier
  // and the body cannot both claim the same run of spaces (`no-super-linear-backtracking`).
  const items = block.match(new RegExp(`^${key}:\\n((?:[ \\t]+-[ \\t]+\\S.*\\n)+)`, 'm'))?.[1]
  return items ? [...items.matchAll(/^[ \t]+-[ \t]+(\S.*)$/gm)].map(match => match[1]!.trim()) : []
}

const componentFiles = (await glob('*.md', { cwd: componentsDir })).filter(file => file !== 'index.md')

const components = componentFiles.map((file) => {
  const block = frontmatter(read(`docs/content/docs/2.components/${file}`))
  return {
    name: file.replace(/\.md$/, ''),
    title: scalar(block, 'title'),
    description: scalar(block, 'description'),
    keywords: list(block, 'keywords')
  }
})

/** The tool's own ranking, so a change to either side has to agree with this. */
function ranked(query: string): string[] {
  return components
    .map(component => ({ component, score: scoreComponent(component, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name))
    .map(({ component }) => component.name)
}

const toolSource = read('docs/server/mcp/tools/b24-ui-search-components.ts')

/** `"segmented control" finds FieldGroup` -> `['segmented control', 'field-group']`. */
const promisedExamples = [...toolSource.matchAll(/"([^"]+)" finds (\w+)/g)]
  .map(match => [match[1]!, match[2]!.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()] as const)

const declaredCategories = (() => {
  const block = read('docs/content.config.ts').match(/category:\s*z\.enum\(\[([^\]]+)\]\)/)?.[1]
  return block ? [...block.matchAll(/'([^']+)'/g)].map(match => match[1]!) : []
})()

const usedCategories = new Set(
  (await glob('docs/**/*.md', { cwd: contentDir }))
    .map(file => scalar(frontmatter(readFileSync(resolve(contentDir, file), 'utf-8')), 'category'))
    .filter((category): category is string => !!category)
)

describe('MCP component search', () => {
  it('reads a non-trivial corpus', () => {
    // Every assertion below is vacuous against an empty parse — and the
    // frontmatter reader here is hand-rolled, so it is the likely thing to break.
    expect(components.length).toBeGreaterThan(50)
    expect(components.filter(component => component.keywords.length).length).toBeGreaterThan(30)
    expect(declaredCategories.length).toBeGreaterThan(10)
    expect(usedCategories.size).toBeGreaterThan(10)
  })

  it('finds the examples the tool description promises', () => {
    // Three today. Counted so that a reworded description cannot empty the
    // check below without anyone noticing.
    expect(promisedExamples.length).toBe(3)
  })

  it.each(promisedExamples)('ranks %s first for the component the description names', (query, expected) => {
    expect(ranked(query)[0]).toBe(expected)
  })

  it('keeps a name search ahead of the keywords that mention it', () => {
    // The ranking has to stay usable for the ordinary case; keyword weight
    // above a name match would be a regression nothing else here would catch.
    for (const name of ['modal', 'table', 'button', 'input']) {
      expect(ranked(name)[0]).toBe(name)
    }
  })

  it('gives every keyword a way to match', () => {
    // A keyword whose every word is under the 3-character token floor can only
    // ever be hit by an exact-phrase search. `hr` is that case and is upstream's;
    // it is listed rather than tolerated so a second one has to be argued for.
    const phraseOnly = components
      .flatMap(component => component.keywords.map(keyword => `${component.name}: ${keyword}`))
      .filter(entry => !tokenize(entry.split(': ')[1]!).length)
      .sort()

    expect(phraseOnly).toEqual(['separator: hr'])
  })

  it('declares every category the content actually uses', () => {
    // The defect this file was written after: four values written in
    // frontmatter with no entry in the enum.
    const undeclared = [...usedCategories].filter(category => !declaredCategories.includes(category)).sort()
    expect(undeclared).toEqual([])
  })

  it('selects `keywords` from the collection, or the ranking has nothing to rank', () => {
    // `scoreComponent` degrades to name and description without this — no
    // error, just worse answers.
    expect(toolSource).toMatch(/\.select\([^)]*'keywords'/)
    expect(read('docs/content.config.ts')).toMatch(/keywords:\s*z\.array\(z\.string\(\)\)/)
  })
})
