import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * A component lives in eleven places (`.sync/PORTING.md` §6) and only the first
 * one — `src/` — is covered by a gate. The rest fail quietly, which is how
 * Splitter and ProgressGroup each shipped missing four of them:
 *
 * - **`docs/nuxt.config.ts` → `pages`.** The page still builds without an entry,
 *   because the prerender crawler follows the sidebar link and finds it anyway.
 *   The array is not what makes the page exist; it is the declared list the
 *   `/raw/<page>.md` routes are generated from, and
 *   `skills/b24-ui-nuxt/references/components.md` links to exactly those URLs.
 *   `empty` and `page-card-group` had been missing from it far longer.
 * - **`links[].iconName`.** `resolveIcon()` returns `undefined` for a name that
 *   is not in `src/runtime/dictionary/icons.ts` and the template renders the
 *   link without an icon — no warning, no failure. `splitter.md` shipped with
 *   `RekaIcon`, which has never existed; the convention for that link is an
 *   avatar (`/b24ui/avatar/rekaui.svg`), not an icon.
 * - **The Demo link.** It is typed by hand and points into a separate app, so a
 *   missing or misnamed `playgrounds/demo` page is a 404 nobody sees from here.
 *
 * All three are "does this resolve" checks against the tree, in the same spirit
 * as `skill-manifest.spec.ts`, rather than a second list that would drift the
 * same way.
 */

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

const COMPONENTS_DIR = 'docs/content/docs/2.components'
const DEMO_PAGES_DIR = 'playgrounds/demo/app/pages/components'
const DEMO_BASE = 'https://bitrix24.github.io/b24ui/demo/components/'

/** Every component page, by slug — `0.index.md` is the category listing, not a component. */
const pageSlugs = readdirSync(resolve(process.cwd(), COMPONENTS_DIR))
  .filter(name => name.endsWith('.md') && name !== '0.index.md')
  .map(name => name.slice(0, -3))
  .sort()

/**
 * The `pages` array from `docs/nuxt.config.ts`, restricted to component routes.
 *
 * Parsed rather than imported: the file is a `defineNuxtConfig` call that pulls
 * in `@nuxt/kit`, and evaluating it under vitest to read one array is a lot of
 * machinery for a list of string literals. Commented-out entries are skipped by
 * the anchor — `content-navigation` is parked that way on purpose.
 */
const registeredSlugs = [...read('docs/nuxt.config.ts').matchAll(/^ {2}'\/docs\/components\/([a-z0-9-]+)\/',$/gm)]
  .map(match => match[1]!)
  .sort()

/** The front-matter block of a page, as raw YAML-ish text. */
function frontMatter(slug: string): string {
  const source = read(`${COMPONENTS_DIR}/${slug}.md`)
  expect(source.startsWith('---\n'), `${slug}.md: no front matter`).toBe(true)
  const end = source.indexOf('\n---\n', 4)
  expect(end, `${slug}.md: unterminated front matter`).toBeGreaterThan(0)
  return source.slice(4, end)
}

const frontMatters = new Map(pageSlugs.map(slug => [slug, frontMatter(slug)]))

const iconDictionary = read('src/runtime/dictionary/icons.ts')

/** The names `resolveIcon()` can resolve: the shorthand and `key: Value` entries of the dictionary's default export. */
const dictionaryNames = new Set(
  [...iconDictionary.slice(iconDictionary.indexOf('export default {')).matchAll(/^ {2}(\w+)(?::[ \t]*[\w.]+)?,?[ \t]*(?:\/\/.*)?$/gm)]
    .map(match => match[1]!)
)

describe('docs component pages', () => {
  it('reads a non-trivial set of pages', () => {
    // Every comparison below is vacuous against an empty list.
    expect(pageSlugs.length).toBeGreaterThan(100)
    expect(registeredSlugs.length).toBeGreaterThan(100)
    expect(dictionaryNames.size).toBeGreaterThan(40)
  })

  it('is registered in `pages` in docs/nuxt.config.ts', () => {
    expect(pageSlugs.filter(slug => !registeredSlugs.includes(slug))).toEqual([])
  })

  it('has no `pages` entry without a page behind it', () => {
    expect(registeredSlugs.filter(slug => !pageSlugs.includes(slug))).toEqual([])
  })

  it('names only icons the dictionary can resolve', () => {
    const unresolvable = pageSlugs.flatMap((slug) => {
      return [...frontMatters.get(slug)!.matchAll(/^\s*iconName:\s*(\S+)$/gm)]
        .map(match => match[1]!)
        .filter(name => !dictionaryNames.has(name))
        .map(name => `${slug}.md: ${name}`)
    })

    expect(unresolvable).toEqual([])
  })

  it('points its Demo link at a demo playground page that exists', () => {
    const broken = pageSlugs.flatMap((slug) => {
      return [...frontMatters.get(slug)!.matchAll(new RegExp(`^\\s*to:\\s*${DEMO_BASE}(\\S*)$`, 'gm'))]
        .map(match => match[1]!.replace(/\/$/, ''))
        .filter(name => !existsSync(resolve(process.cwd(), DEMO_PAGES_DIR, `${name}.vue`)))
        .map(name => `${slug}.md → ${DEMO_BASE}${name}`)
    })

    expect(broken).toEqual([])
  })
})

describe('demo playground navigation', () => {
  const navigation = read('playgrounds/demo/app/composables/useNavigation.ts')
  const listed = [...navigation.slice(navigation.indexOf('const components = ['), navigation.indexOf('].map(component'))
    .matchAll(/^ {2}'([a-z0-9/-]+)',$/gm)].map(match => match[1]!)

  it('lists a non-trivial number of components', () => {
    expect(listed.length).toBeGreaterThan(50)
  })

  it('lists only pages that exist', () => {
    const missing = listed.filter(name => !existsSync(resolve(process.cwd(), DEMO_PAGES_DIR, `${name}.vue`)))
    expect(missing).toEqual([])
  })
})
