import { readFile } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
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

const componentsDir = join(repoRoot, 'src/runtime/components')

/**
 * Every global component name the module registers, built the way `src/module.ts`
 * builds it.
 *
 * The prefix is per-directory, not global: `components/prose/**` registers as
 * `Prose*`, and the catch-all registration for everything else carries
 * `ignore: ['prose/**']`, so those files have no `B24` name at all. Prefixing
 * every basename with `B24` would mint 35 names that do not exist —
 * `B24Callout`, `B24Steps`, `B24H1` — and each is a plausible typo for the real
 * `Prose*` form, which is exactly the mistake this set is here to catch.
 *
 * Both prefixes go in one set, and both are scanned for, so a misnaming is
 * caught whichever direction it goes. Note the overlap is real and legitimate:
 * `Accordion`, `Badge`, `Card`, `Table`, `Tabs`, `Kbd`, `Collapsible` and
 * `FieldGroup` exist as top-level components *and* as prose components, so
 * `B24Card` and `ProseCard` are both valid names for different components.
 */
const listComponentNames = async () => {
  const [prose, rest] = await Promise.all([
    glob('**/*.vue', { cwd: join(componentsDir, 'prose') }),
    glob('**/*.vue', { cwd: componentsDir, ignore: ['prose/**'] })
  ])

  const basename = (file: string) => file.replace(/\.vue$/, '').split('/').pop()!

  return new Set([
    ...prose.map(file => `Prose${basename(file)}`),
    ...rest.map(file => `B24${basename(file)}`)
  ])
}

/** Matches both registered prefixes, so neither direction of misnaming hides. */
const COMPONENT_NAME = /\b(?:B24|Prose)[A-Z][A-Za-z0-9]*/g

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

  it('ships no empty reference file', async () => {
    // Every other check compares paths and names. Emptying a file changes no
    // path and removes no name, so a reference truncated to nothing passes the
    // whole suite while looking correctly wired from the manifest, the routing
    // table and the links alike — a worse failure than an omitted entry,
    // because nothing about it looks wrong.
    const thin: string[] = []

    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')
      if (body.trim().length < 200 || !/^#{1,3}\s/m.test(body)) {
        thin.push(`${doc} (${body.trim().length} bytes)`)
      }
    }

    expect(thin).toEqual([])
  })

  it('resolves every relative link in every skill file', async () => {
    const dangling: string[] = []

    for (const doc of await listDocs()) {
      const absolute = join(skillDir, doc)
      // Code is stripped first: these files teach markdown, and a fenced
      // example of how to write a link (`[Home](./some-page.md)`) is
      // illustration, not a claim that the file exists.
      const body = (await readFile(absolute, 'utf8'))
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`\n]*`/g, '')

      // Whitespace is allowed inside the capture and trimmed after, rather
      // than excluded from the class. Excluding it means `[x](nope.md )` — one
      // stray trailing space — does not match at all, and a link that never
      // matches is a link that is never checked: the broken target becomes
      // invisible instead of reported.
      //
      // `[`, `]` and `(` stay excluded. Without them a run of `](` with no
      // closing paren after it costs a full scan-and-back-off each time, once
      // per occurrence — quadratic, measured at 46s for a 4MB input. The corpus
      // is ~140KB of repo-controlled markdown so nothing is at risk today; the
      // narrower class is free.
      for (const [, raw] of body.matchAll(/\]\(([^()[\]\n]+)\)/g)) {
        // A markdown title (`[x](y.md "Title")`) is part of the link, not of
        // the path.
        const target = raw!.trim().replace(/\s+"[^"]*"$/, '').trim()
        if (!target) {
          continue
        }

        // Only paths relative to this file are checkable. A leading `/` has to
        // be skipped explicitly: `resolve()` discards the containing directory
        // for an absolute-looking target and re-resolves against the
        // filesystem root, so a site-relative link would be reported dangling
        // for the wrong reason.
        if (/^(?:[a-z]+:|[#/])/i.test(target!)) {
          continue
        }

        const [path] = target!.split('#')
        if (!path) {
          continue
        }

        const resolved = resolve(dirname(absolute), path)
        const inside = relative(skillDir, resolved)

        // Existing on disk is not enough: `npx skills add` copies only what
        // `index.json` lists, so a link that escapes the package — one `../`
        // too many, landing on the repo's own `package.json` — resolves here
        // and is dangling for every installed copy. Directories are rejected
        // for the same reason: `existsSync` is true for them and an agent
        // cannot read one.
        if (inside.startsWith('..') || isAbsolute(inside) || !existsSync(resolved) || !statSync(resolved).isFile()) {
          dangling.push(`${doc} -> ${target}`)
        }
      }
    }

    // Named, not counted: the message is the whole value of this test.
    expect(dangling).toEqual([])
  })

  it('names only components that exist', async () => {
    const real = await listComponentNames()

    // `B24ChatMessage` etc. are real; the guard exists for the two that were
    // not — `B24Slider` (the component is `B24Range`) and `B24AuthForm` (no
    // such component at all, and the rule recommending it sent agents at an
    // import that cannot resolve). The prose anchor pins the other prefix, and
    // the negative one pins that prose files did not also get a `B24` name.
    expect(real.has('B24Range')).toBe(true)
    expect(real.has('ProseSteps')).toBe(true)
    expect(real.has('B24Steps')).toBe(false)

    const phantom = new Set<string>()
    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')
      for (const [name] of body.matchAll(COMPONENT_NAME)) {
        if (!real.has(name)) {
          phantom.add(`${doc}: ${name}`)
        }
      }
    }

    expect([...phantom].sort()).toEqual([])
  })

  it('imports only icons that exist', async () => {
    // The same defect as a phantom component, one package over, and the one
    // the component check cannot see: `card-pickers.md` shipped
    // `LayoutGridIcon`, `LayoutListIcon` and `LayoutKanbanIcon` from
    // `@bitrix24/b24icons-vue/main/` — none of which exist, and none of which
    // any check here could have noticed. The metadata file is the same one
    // `icons.md` tells agents to search, so this validates against the source
    // of truth an agent is pointed at rather than a second list.
    const metadata = JSON.parse(
      await readFile(join(repoRoot, 'node_modules/@bitrix24/b24icons-vue/dist/info-metadata.json'), 'utf8')
    ) as { list: Array<{ list: Array<{ type: string, icon: string }> }> }

    const real = new Set(metadata.list.flatMap(group => group.list.map(({ type, icon }) => `${type}/${icon}`)))
    expect(real.has('outline/AchievementIcon')).toBe(true)
    expect(real.has('main/LayoutGridIcon')).toBe(false)

    const phantom: string[] = []
    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')
      // Anchored on the closing quote so it only sees import specifiers.
      // Without it the prose pointing agents at
      // `node_modules/@bitrix24/b24icons-vue/dist/info-metadata.json` matches
      // as the icon `dist/info`.
      for (const [, path] of body.matchAll(/@bitrix24\/b24icons-vue\/([a-z0-9-]+\/[A-Za-z0-9]+)['"]/g)) {
        if (!real.has(path!)) {
          phantom.push(`${doc}: ${path}`)
        }
      }
    }

    expect(phantom.sort()).toEqual([])
  })

  it('keeps example code free of the mistakes agents copy verbatim', async () => {
    // Three shapes, all found in the wild in this package, none of which any
    // structural check above can see because they live inside fenced code.
    const confusable: string[] = []
    const objectBinds: string[] = []
    const duplicateImports: string[] = []

    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')

      // A Cyrillic letter inside an identifier is invisible on the page and
      // fatal in the editor — `<И24Card>` sat in `design-system.md` looking
      // exactly like `<B24Card>`.
      for (const [char] of body.matchAll(/\p{Script=Cyrillic}/gu)) {
        confusable.push(`${doc}: U+${char.codePointAt(0)!.toString(16).toUpperCase()} ${char}`)
      }

      for (const [block] of body.matchAll(/```[a-z]*\n[\s\S]*?```/g)) {
        // `:icon="{AchievementIcon}"` passes an object where a component is
        // expected; it renders nothing and raises no error.
        for (const [bind] of block.matchAll(/:[\w-]+="\{\s*[a-z_$][\w$]*\s*\}"/gi)) {
          objectBinds.push(`${doc}: ${bind}`)
        }

        // Scoped per block on purpose: one file legitimately imports the same
        // icon in two independent examples. Twice in one block is the
        // duplicate-identifier error that shipped in `conventions.md`.
        const bound = new Set<string>()
        for (const [, name] of block.matchAll(/^import\s+([A-Za-z_$][\w$]*)\s+from\s/gm)) {
          if (bound.has(name!)) {
            duplicateImports.push(`${doc}: ${name}`)
          }
          bound.add(name!)
        }
      }
    }

    expect(confusable).toEqual([])
    expect(objectBinds).toEqual([])
    expect(duplicateImports).toEqual([])
  })

  it('routes every task to a reference it also lists', async () => {
    const body = await readFile(join(skillDir, 'SKILL.md'), 'utf8')

    // The names an agent can act on are exactly the ones the "Reference files"
    // section links, so that section is the vocabulary and the routing table is
    // checked against it. Four rows used to name `auth`, `chat`, `docs` and
    // `editor`, inherited from the nuxt/ui skill, and no such file was ever in
    // this repository.
    const known = new Set(
      // Same narrowing as the link scan above, plus `\n`: a link left unclosed
      // must not swallow the rest of the file looking for `.md)`.
      [...body.matchAll(/\]\(references\/([^()[\]\n]+)\.md\)/g)].map(([, path]) => path!.split('/').pop()!)
    )
    expect(known.has('conventions')).toBe(true)

    // Scoped to the routing table rather than run over the whole file: any
    // other table added to SKILL.md later would otherwise be validated against
    // this vocabulary and fail for reasons that have nothing to do with routing.
    const table = body.match(/^### Routing table\n([\s\S]*?)(?=^## )/m)?.[1]
    expect(table).toBeDefined()

    const rows = [...table!.matchAll(/^\|(?!\s*-)([^|\n]+)\|([^|\n]+)\|\s*$/gm)]
      .filter(([, task]) => task!.trim() !== 'Task')

    // Counted independently of the pattern above, so a regex that silently
    // stops matching *some* rows fails instead of quietly checking fewer of
    // them. A bare lower bound would not: dropping 9 of 15 rows still clears it.
    const pipeLines = table!.split('\n').filter(line => line.trim().startsWith('|'))
    expect(rows).toHaveLength(pipeLines.length - 2) // minus the header and separator

    const routed = new Set(
      rows.flatMap(([, , refs]) =>
        refs!
          .split(',')
          // A trailing "(§ Section)" points at a heading inside the file; the
          // file itself is what has to exist.
          .map(ref => ref.replace(/\(.*$/, '').trim())
          .filter(Boolean)
      )
    )

    const unroutable = rows.flatMap(([, task, refs]) =>
      refs!
        .split(',')
        .map(ref => ref.replace(/\(.*$/, '').trim())
        .filter(ref => ref && !known.has(ref))
        .map(ref => `${task!.trim().slice(0, 40)} -> ${ref}`)
    )

    expect(unroutable).toEqual([])

    // The other direction, and the one that produced this issue: `detail-panel`
    // and `task-form` were 500 lines of good material that no row named, so no
    // task could ever reach them. Checking only that every token resolves would
    // have left that exactly as invisible after the fix as before it.
    const unreachable = [...known].filter(ref => !routed.has(ref)).sort()

    expect(unreachable).toEqual([])
  })

  it('indexes every documented component', async () => {
    // `components.md` calls itself "a categorized component index for finding
    // the right component name", so completeness is the whole point of it —
    // a component missing from the table is one an agent cannot be told about,
    // which is the same failure as `B24Slider` from the other direction and
    // just as invisible. `B24Breadcrumb`, `B24Countdown`, `B24Advice`,
    // `B24DescriptionList`, `B24LocaleSelect`, `B24PageFeature` and
    // `B24TableWrapper` were all missing when this was written.
    const index = await readFile(join(skillDir, 'references/components.md'), 'utf8')
    const indexed = new Set([...index.matchAll(COMPONENT_NAME)].map(([name]) => name))

    const real = await listComponentNames()

    const pagesDir = join(repoRoot, 'docs/content/docs/2.components')
    const pages = await glob('*.md', { cwd: pagesDir })
    expect(pages.length).toBeGreaterThan(50)

    const missing: string[] = []
    for (const page of pages) {
      // A deprecated component must stay OUT of the index — steering an agent
      // onto `B24SidebarLayout` is worse than not mentioning it at all — so
      // this is part of the rule, not an exemption from it.
      const front = (await readFile(join(pagesDir, page), 'utf8')).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
      if (/^category:\s*deprecated\s*$/m.test(front)) {
        continue
      }

      const name = `B24${page.replace(/\.md$/, '').split('-').map(part => part[0]!.toUpperCase() + part.slice(1)).join('')}`

      // Not every page under `2.components/` is a component: `0.index.md` is
      // the section landing page and `chat.md` is an overview of the whole
      // Chat family. Requiring a component file to exist filters both without
      // a hand-kept exclusion list that would itself drift.
      if (real.has(name) && !indexed.has(name)) {
        missing.push(name)
      }
    }

    expect(missing.sort()).toEqual([])
  })

  it('keeps the manifest description in step with the skill frontmatter', async () => {
    const manifest = await readManifest()
    const body = await readFile(join(skillDir, 'SKILL.md'), 'utf8')
    const frontmatter = body.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''

    const described = manifest.skills.find(skill => skill.name === 'b24-ui-nuxt')
    expect(described).toBeDefined()

    // Two copies of one sentence in two files is exactly how the "for Bitrix24
    // application" wording survived a proofread in one of them. Compared for
    // equality rather than containment: shortening only the manifest copy to a
    // prefix of the other leaves them genuinely different and a substring check
    // still green.
    expect(frontmatter.match(/^description: (.*)$/m)?.[1]).toBe(described!.description)
  })

  it('keeps every skill file inside the package it ships', async () => {
    const stray = (await glob('**/*.md', { cwd: skillsDir, ignore: ['**/node_modules/**'] }))
      // Derived from `skillDir` rather than repeating its last segment, so
      // renaming the package cannot leave this line pointing at the old name.
      .filter(doc => relative(skillDir, join(skillsDir, doc)).startsWith('..'))

    expect(stray).toEqual([])
  })
})
