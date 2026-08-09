import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * `skills/` is shipped to AI agents as ground truth — `npx skills add
 * bitrix24/b24ui` installs exactly what `index.json` lists, and an agent
 * follows the routing table before it writes a line of code. Every defect
 * behind #93 was of the same shape: a name or a path that reads as correct and
 * resolves to nothing. None of it can go red on its own, because prose does not
 * compile — `B24Slider` sat in two files for months next to a link that
 * correctly pointed at `range.md`.
 *
 * So the checks here are all "does this resolve", asserted against the tree
 * rather than against a second list that would drift the same way.
 */
// Same derivation as `vitest-include.spec.ts`: `new URL('..', import.meta.url)`
// comes back as an `http:` URL under vitest, so the root comes from the vitest
// cwd instead — and the `beforeAll` below has to prove it resolved.
const repoRoot = process.cwd()
const skillsDir = join(repoRoot, 'skills')
const skillDir = join(skillsDir, 'b24-ui-nuxt')

const listDocs = () => glob('**/*.md', { cwd: skillDir, ignore: ['**/node_modules/**'] })

const readManifest = async () =>
  JSON.parse(await readFile(join(skillsDir, 'index.json'), 'utf8')) as {
    skills: Array<{ name: string, description: string, files: string[] }>
  }

describe('skill package', () => {
  // Every assertion below passes vacuously if the root is wrong — an empty
  // glob has no dangling anything. Anchor on a file that must exist.
  beforeAll(async () => {
    expect(await listDocs()).toContain('SKILL.md')
  })

  it('lists exactly the files on disk in `index.json`', async () => {
    const manifest = await readManifest()
    const listed = manifest.skills.flatMap(skill => skill.files).sort()
    const onDisk = (await listDocs()).sort()

    // Both directions matter and they fail differently: a file on disk but not
    // in the manifest is never installed (an agent silently loses a reference),
    // while a file in the manifest but not on disk breaks the install itself.
    expect(listed).toEqual(onDisk)
  })

  it('resolves every relative link in every skill file', async () => {
    const dangling: string[] = []

    for (const doc of await listDocs()) {
      const absolute = join(skillDir, doc)
      const body = await readFile(absolute, 'utf8')

      for (const [, target] of body.matchAll(/\]\(([^)\s]+)\)/g)) {
        // Only local paths are checkable here; URLs and pure anchors are not.
        if (/^(?:[a-z]+:|#|\/\/)/i.test(target!)) {
          continue
        }

        const [path] = target!.split('#')
        if (!path) {
          continue
        }

        const resolved = resolve(dirname(absolute), path)
        if (!existsSync(resolved)) {
          dangling.push(`${doc} -> ${target}`)
        }
      }
    }

    // Named, not counted: the message is the whole value of this test.
    expect(dangling).toEqual([])
  })

  it('names only components that exist', async () => {
    const files = await glob('**/*.vue', { cwd: join(repoRoot, 'src/runtime/components') })
    const real = new Set(files.map(file => `B24${file.replace(/\.vue$/, '').split('/').pop()}`))

    // `B24ChatMessage` etc. are real; the guard exists for the two that were
    // not — `B24Slider` (the component is `B24Range`) and `B24AuthForm` (no
    // such component at all, and the rule recommending it sent agents at an
    // import that cannot resolve).
    expect(real.has('B24Range')).toBe(true)

    const phantom = new Set<string>()
    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')
      for (const [name] of body.matchAll(/\bB24[A-Z][A-Za-z0-9]*/g)) {
        if (!real.has(name)) {
          phantom.add(`${doc}: ${name}`)
        }
      }
    }

    expect([...phantom].sort()).toEqual([])
  })

  it('routes every task to a reference it also lists', async () => {
    const body = await readFile(join(skillDir, 'SKILL.md'), 'utf8')

    // The names an agent can act on are exactly the ones the "Reference files"
    // section links, so that section is the vocabulary and the routing table is
    // checked against it. Four rows used to name `auth`, `chat`, `docs` and
    // `editor`, inherited from the nuxt/ui skill, and no such file was ever in
    // this repository.
    const known = new Set(
      [...body.matchAll(/\]\(references\/([^)]+)\.md\)/g)].map(([, path]) => path!.split('/').pop()!)
    )
    expect(known.has('conventions')).toBe(true)

    const rows = [...body.matchAll(/^\|(?!\s*-)([^|\n]+)\|([^|\n]+)\|\s*$/gm)]
      .filter(([, task]) => task!.trim() !== 'Task')

    expect(rows.length).toBeGreaterThan(5)

    const unroutable = rows.flatMap(([, task, refs]) =>
      refs!
        .split(',')
        // A trailing "(§ Section)" points at a heading inside the file; the
        // file itself is what has to exist.
        .map(ref => ref.replace(/\(.*$/, '').trim())
        .filter(ref => ref && !known.has(ref))
        .map(ref => `${task!.trim().slice(0, 40)} -> ${ref}`)
    )

    expect(unroutable).toEqual([])
  })

  it('keeps the manifest description in step with the skill frontmatter', async () => {
    const manifest = await readManifest()
    const body = await readFile(join(skillDir, 'SKILL.md'), 'utf8')
    const frontmatter = body.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''

    const described = manifest.skills.find(skill => skill.name === 'b24-ui-nuxt')
    expect(described).toBeDefined()

    // Two copies of one sentence in two files is exactly how the "for Bitrix24
    // application" wording survived a proofread in one of them.
    expect(frontmatter).toContain(`description: ${described!.description}`)
  })

  it('keeps every skill file inside the package it ships', async () => {
    const stray = (await glob('**/*.md', { cwd: skillsDir, ignore: ['**/node_modules/**'] }))
      .filter(doc => relative('b24-ui-nuxt', doc).startsWith('..'))

    expect(stray).toEqual([])
  })
})
