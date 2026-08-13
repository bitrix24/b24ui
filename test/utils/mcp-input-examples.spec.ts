import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'
import { kebabCase } from 'scule'

/**
 * `inputExamples` on every MCP tool is advertised to the client: an assistant
 * reads them to learn what a valid argument looks like, and will happily call
 * the tool with one verbatim. So each is a claim that something exists.
 *
 * Two were false. `b24-ui-get-example` shipped `ButtonBasic` and `ModalOverlay`
 * — neither is an example in this repo, and neither ever was; upstream replaced
 * them in nuxt/ui@ce489e8 with names it actually prerenders. `search-components`
 * offered `category: 'forms'`, which the collection enum spells `form`, so the
 * example returns an empty list.
 *
 * Nothing catches this. A tool definition is data, the values are only read at
 * call time, and a 404 or an empty array looks like a normal answer.
 *
 * Only the claims that can be resolved against the tree are checked here.
 * `search:` and `query:` values are free text — asserting that `search: 'toast'`
 * matches something would pin the ranking, not the claim.
 */

const toolsDir = resolve(process.cwd(), 'docs/server/mcp/tools')
const contentDir = resolve(process.cwd(), 'docs/content')
const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

const toolFiles = await glob('*.ts', { cwd: toolsDir })

/** Every `key: 'value'` inside a tool's `inputExamples` block. */
const claims = toolFiles.flatMap((file) => {
  const source = readFileSync(resolve(toolsDir, file), 'utf-8')
  const start = source.indexOf('inputExamples: [')
  if (start === -1) return []
  const block = source.slice(start, source.indexOf('\n  ]', start))

  return [...block.matchAll(/(\w+): '([^']*)'/g)].map(match => ({
    tool: file.replace(/\.ts$/, ''),
    key: match[1]!,
    value: match[2]!
  }))
})

const claimsFor = (key: string) => claims.filter(claim => claim.key === key)

const describeClaim = (claim: { tool: string, key: string, value: string }) =>
  `${claim.tool}: ${claim.key}: '${claim.value}'`

const exampleNames = new Set(
  (await glob('**/*.vue', { cwd: resolve(process.cwd(), 'docs/app/components/content/examples') }))
    .map(file => file.split('/').pop()!.replace(/\.vue$/, ''))
)

const componentPages = new Set(
  (await glob('*.md', { cwd: resolve(contentDir, 'docs/2.components') }))
    .map(file => file.replace(/\.md$/, ''))
)

/** Every docs page by its routed path — `docs/1.getting-started/1.installation.md` -> `docs/getting-started/installation`. */
const documentationPaths = new Set(
  (await glob('docs/**/*.md', { cwd: contentDir }))
    .map(file => file.replace(/\.md$/, '').split('/').map(segment => segment.replace(/^\d+\./, '')).join('/'))
)

const templateTitles = new Set(
  [...read('docs/content/templates.yml').matchAll(/^\s+- title: '([^']+)'$/gm)].map(match => match[1]!)
)

const declaredCategories = new Set(
  [...(read('docs/content.config.ts').match(/category:\s*z\.enum\(\[([^\]]+)\]\)/)?.[1] ?? '')
    .matchAll(/'([^']+)'/g)].map(match => match[1]!)
)

describe('MCP tool inputExamples', () => {
  it('reads the tools and everything they are checked against', () => {
    // Each assertion below is vacuous against an empty parse, and every one of
    // these sets comes out of hand-rolled matching.
    expect(toolFiles.length).toBeGreaterThan(10)
    expect(claims.length).toBeGreaterThan(15)
    expect(exampleNames.size).toBeGreaterThan(200)
    expect(componentPages.size).toBeGreaterThan(50)
    expect(documentationPaths.size).toBeGreaterThan(100)
    expect(templateTitles.size).toBeGreaterThan(0)
    expect(declaredCategories.size).toBeGreaterThan(10)
  })

  it('names an example that exists', () => {
    const named = claimsFor('exampleName')
    expect(named.length).toBeGreaterThan(0)

    // Named rather than counted: the failure has to say which name is fiction.
    expect(named.filter(claim => !exampleNames.has(claim.value)).map(describeClaim)).toEqual([])
  })

  it('names a component that has a documentation page', () => {
    const named = claimsFor('componentName')
    expect(named.length).toBeGreaterThan(0)

    // `B24Table` and `Table` are both valid input; the tools strip the prefix.
    const missing = named
      .filter(claim => !componentPages.has(kebabCase(claim.value.replace(/^B24/, ''))))
      .map(describeClaim)

    expect(missing).toEqual([])
  })

  it('names a template that exists', () => {
    const named = claimsFor('templateName')
    expect(named.length).toBeGreaterThan(0)
    expect(named.filter(claim => !templateTitles.has(claim.value)).map(describeClaim)).toEqual([])
  })

  it('names a category the schema declares', () => {
    const named = claimsFor('category')
    expect(named.length).toBeGreaterThan(0)

    // The `forms`/`form` defect: a filter value outside the enum matches no row.
    expect(named.filter(claim => !declaredCategories.has(claim.value)).map(describeClaim)).toEqual([])
  })

  it('names a documentation path that resolves to a page', () => {
    const named = claimsFor('path')
    expect(named.length).toBeGreaterThan(0)

    // The handler strips the deployed base path and the trailing slash before
    // asking for `/raw/<path>.md`.
    const missing = named
      .filter(claim => !documentationPaths.has(claim.value.replace(/^\/b24ui/, '').replace(/^\/|\/$/g, '')))
      .map(describeClaim)

    expect(missing).toEqual([])
  })
})
