import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { parse } from 'yaml'

const repoRoot = process.cwd()
const TEMPLATE_DIR = join(repoRoot, '.github/ISSUE_TEMPLATE')

/**
 * An issue form that does not match GitHub's schema does not fail loudly. The
 * form silently stops being offered and the repository falls back to a blank
 * issue box, which looks exactly like a repository that never had forms — so
 * the first person to notice is whoever wonders why reports stopped carrying
 * a reproduction.
 *
 * Nothing else here validates these files: eslint does not read the directory,
 * and the two `.github` assert scripts look at `uses:` pins and install lines.
 * This is the cheap half of the schema — the parts that actually go wrong when
 * somebody edits a form by copying a block.
 */
const BLOCK_TYPES = new Set(['markdown', 'input', 'textarea', 'dropdown', 'checkboxes'])

/** `render` takes a Linguist language name, lowercased. Only what the forms use. */
const RENDER_LANGUAGES = new Set(['shell', 'vue', 'typescript', 'javascript', 'json', 'html', 'css'])

/**
 * Parsed, or the parse error carried as data.
 *
 * Throwing here would kill the whole file at collection time, and a spec that
 * fails to collect reports as "no tests" — the same output as a spec nobody
 * wrote. The error belongs in an assertion where it names the file.
 */
function forms(): [string, any, string | null][] {
  return readdirSync(TEMPLATE_DIR)
    .filter(name => name.endsWith('.yml') && name !== 'config.yml')
    .sort()
    .map((name) => {
      try {
        return [name, parse(readFileSync(join(TEMPLATE_DIR, name), 'utf8')), null]
      } catch (error) {
        return [name, null, String(error)]
      }
    })
}

describe('issue forms', () => {
  const parsed = forms()

  it('are found at all', () => {
    // The assertions below all pass on an empty list, which is how a directory
    // that got renamed reads exactly like a directory that is fine.
    expect(parsed.map(([name]) => name)).toEqual(['bug-report.yml', 'feature-request.yml'])
  })

  it.each(parsed)('%s matches the shape GitHub accepts', (name, form, parseError) => {
    expect(parseError, `${name} is not valid YAML`).toBeNull()
    expect(typeof form.name).toBe('string')
    expect(typeof form.description).toBe('string')
    expect(Array.isArray(form.body)).toBe(true)

    const ids: string[] = []

    for (const block of form.body) {
      expect(BLOCK_TYPES).toContain(block.type)

      if (block.type === 'markdown') {
        // GitHub rejects a markdown block carrying `validations` or an `id`.
        expect(block.validations).toBeUndefined()
        expect(block.id).toBeUndefined()
        expect(typeof block.attributes.value).toBe('string')
        continue
      }

      expect(block.id, `${block.type} block without an id`).toMatch(/^[a-z][a-z0-9-]*$/)
      ids.push(block.id)
      expect(typeof block.attributes.label).toBe('string')

      if (block.type === 'dropdown') {
        expect(Array.isArray(block.attributes.options)).toBe(true)
        expect(block.attributes.options.length).toBeGreaterThan(1)
        // `None` is reserved on a required dropdown and silently breaks it.
        if (block.validations?.required) expect(block.attributes.options).not.toContain('None')
      }

      if (block.attributes.render !== undefined) {
        expect(RENDER_LANGUAGES).toContain(block.attributes.render)
      }
    }

    expect(ids, 'duplicate ids').toEqual([...new Set(ids)])
  })

  it('are reachable by the links that advertise them', () => {
    // `?template=` names the file. A rename that misses one of these leaves a
    // link that opens a blank issue instead of the form, which is not an error
    // anywhere — the page just quietly shows the wrong thing.
    const advertised = ['README.md', 'CONTRIBUTING.md', 'docs/content/docs/1.getting-started/4.contribution.md']
      .flatMap(file => [...readFileSync(join(repoRoot, file), 'utf8').matchAll(/\?template=([\w.-]+)/g)])
      .map(match => match[1]!)

    expect(advertised.length).toBeGreaterThan(0)
    expect([...new Set(advertised)].sort()).toEqual(parsed.map(([name]) => name))
  })
})

/**
 * The security policy names one channel, and it is the one place a dead link
 * costs something real: a reporter who cannot reach it either gives up or
 * files publicly, which is the outcome the whole file exists to prevent.
 *
 * The advisory URL is repository-specific — copy this file to another
 * repository, or rename this one, and it silently points at somebody else's
 * inbox. Checked against `package.json`'s own repository field rather than
 * against a second copy of the name.
 */
describe('SECURITY.md', () => {
  const policy = readFileSync(join(repoRoot, 'SECURITY.md'), 'utf8')
  const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'))
  const slug = pkg.repository.url.replace(/^git\+https:\/\/github\.com\//, '').replace(/\.git$/, '')

  it('points at the private channel for this repository', () => {
    expect(policy).toContain(`https://github.com/${slug}/security/advisories/new`)
  })

  it('is reachable from CONTRIBUTING.md', () => {
    const contributing = readFileSync(join(repoRoot, 'CONTRIBUTING.md'), 'utf8')
    expect(contributing).toContain(`https://github.com/${slug}/security/advisories/new`)
    expect(contributing).toContain('SECURITY.md')
  })

  it('does not tell anyone to open an issue for a vulnerability', () => {
    // The failure mode is not hypothetical: `bitrix24/b24phpsdk` publishes a
    // SECURITY.md whose entire reporting section reads "Create issue with
    // vulnerability details". A policy that says that is worse than none,
    // because it looks official.
    const reporting = policy.slice(0, policy.indexOf('## What counts')).toLowerCase()
    expect(reporting).toContain('do not open a public issue')

    // Negated sentences are dropped first — the required sentence above is
    // itself "do not open a public issue", and a naive scan flags it. What is
    // being looked for is an *instruction* to use one.
    const instructions = reporting
      .split(/(?<=[.:])\s/)
      .filter(sentence => !/\b(?:do not|don't|never|rather than|instead of)\b/.test(sentence))

    expect(instructions.filter(sentence => /\b(?:create|open|file)\b[^.]{1,40}\bissue\b/.test(sentence))).toEqual([])
  })
})

/**
 * `CONTRIBUTING.md` quotes the pinned Node and pnpm versions as prose. That is
 * the right place for them — it is the first thing a contributor reads — but
 * prose does not run, and `documented-scripts.spec.ts` only checks script
 * names, so a `packageManager` bump would leave the doc wrong with nothing
 * red anywhere.
 */
describe('CONTRIBUTING.md', () => {
  const contributing = readFileSync(join(repoRoot, 'CONTRIBUTING.md'), 'utf8')
  const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'))

  it('quotes the pinned pnpm version', () => {
    const pinned = pkg.packageManager.replace(/^pnpm@/, '')
    expect(contributing, `package.json pins pnpm@${pinned}`).toContain(pinned)
  })

  it('quotes the supported Node range', () => {
    expect(contributing, `package.json declares engines.node ${pkg.engines.node}`).toContain(pkg.engines.node)
  })
})
