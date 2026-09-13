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
 */
describe('SECURITY.md', () => {
  const policy = readFileSync(join(repoRoot, 'SECURITY.md'), 'utf8')
  const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'))

  /**
   * `owner/repo`, from whichever shape npm accepted for `repository`.
   *
   * Read inside the tests rather than in the `describe` body: the string
   * shorthand leaves `repository.url` undefined, and a `.replace()` on that
   * throws during collection, which takes down every test in this file with an
   * error that blames the wrong thing.
   */
  function slug(): string {
    const field = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url
    const match = String(field).match(/(?:github\.com[:/])?([\w.-]+\/[\w.-]+?)(?:\.git)?$/)
    expect(match, `package.json repository is not a shape this can read: ${field}`).not.toBeNull()
    return match![1]!
  }

  it('points at the private channel for this repository', () => {
    expect(policy).toContain(`https://github.com/${slug()}/security/advisories/new`)
  })

  it('is reachable from CONTRIBUTING.md', () => {
    const contributing = readFileSync(join(repoRoot, 'CONTRIBUTING.md'), 'utf8')
    expect(contributing).toContain(`https://github.com/${slug()}/security/advisories/new`)
    expect(contributing).toContain('SECURITY.md')
  })

  /**
   * Every mention of the public tracker, spelled out.
   *
   * The first version of this check hunted for harmful phrasings — a verb list
   * near the word "issue", with negated sentences filtered out. Four reviewers
   * defeated it independently and none of them had to try hard: "use the issue
   * tracker to publish the details" carries no verb from the list, "rather than
   * waiting, just open an issue" is exempted by its own opening words, and
   * anything below the heading the scan stopped at was never read at all.
   *
   * A denylist of phrasings cannot work, because the space of ways to say
   * "post it publicly" is the English language. So this is inverted: the word
   * may appear only where this list says it may, anywhere in the file. Adding a
   * sentence that mentions issues at all turns it red, and the author either
   * rewrites the sentence or adds it here on purpose. That is the whole point —
   * `bitrix24/b24phpsdk` publishes a SECURITY.md whose reporting section reads
   * "Create issue with vulnerability details", and no amount of pattern
   * matching would have caught it as reliably as noticing the word.
   */
  const PERMITTED_MENTIONS = [
    'do not open a public issue',
    'worth an ordinary issue rather than a security report'
  ]

  it('mentions the public tracker only where it is meant to', () => {
    expect(policy.toLowerCase()).toContain(PERMITTED_MENTIONS[0])

    let remaining = policy.toLowerCase()
    for (const permitted of PERMITTED_MENTIONS) remaining = remaining.split(permitted).join(' ')

    const stray = [...remaining.matchAll(/\b(?:issues?|tickets?|tracker)\b/g)].map((match) => {
      const from = Math.max(0, match.index - 60)
      return `…${remaining.slice(from, match.index + 60).replace(/\s+/g, ' ').trim()}…`
    })

    expect(stray, [
      'SECURITY.md mentions the public issue tracker somewhere this file does',
      'not expect. A security policy that points a reporter at a public issue is',
      'worse than no policy, because it looks official.',
      '',
      'If the sentence is fine, add it to PERMITTED_MENTIONS above — deliberately,',
      'not to make this green.'
    ].join('\n')).toEqual([])
  })

  it('pins the versions it claims to support', () => {
    // Prose the release process cannot see. A 3.0.0 leaves the table below
    // saying 2.x is current, which is the kind of wrong that reads as fact.
    const major = String(pkg.version).split('.')[0]
    expect(policy, `package.json is at ${pkg.version}`).toContain(`| ${major}.x |`)
    expect(policy, `package.json declares engines.node ${pkg.engines.node}`).toContain(pkg.engines.node)
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
