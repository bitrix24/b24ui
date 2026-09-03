import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'
import { buildManifest } from '../../scripts/lib/skill-manifest.mjs'

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

// `dot: true` on every glob here: picomatch hides dotfiles by default, so
// without it a `.DS_Store` — the example the markdown-only check names as its
// reason for existing — and a `.draft.md` are both invisible to every check in
// this file.
const GLOB = { dot: true, ignore: ['**/node_modules/**'] }

const listDocs = () => glob('**/*.md', { cwd: skillDir, ...GLOB })

/**
 * Every skill package on disk, the way the generator discovers them.
 *
 * The generator is multi-package; most checks below scope themselves to
 * `skillDir` because the editorial ones need a package to talk about. These
 * two must not, though — comparing every package's manifest entry against one
 * package's files, or calling another package's files stray, would fail the
 * build spuriously the day a second skill lands.
 */
const listPackages = async () =>
  (await glob('*/SKILL.md', { cwd: skillsDir, ...GLOB })).map(path => path.split('/')[0]!).sort()

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

/**
 * The `color` variant keys a component's theme actually declares.
 *
 * Read from `src/theme/<component>.ts` rather than from a list here, for the
 * same reason as the component and icon checks: a second list drifts. Brace
 * matching rather than a line regex because the map nests (`{ base: '…' }`
 * entries) and a flat scan would pick up slot names from inside them.
 */
const colourKeys = (source: string): Set<string> | undefined => {
  const start = source.indexOf('    color: {')
  if (start === -1) {
    return undefined
  }

  let depth = 0
  let i = source.indexOf('{', start)
  const open = i
  for (; i < source.length; i++) {
    if (source[i] === '{') {
      depth++
    } else if (source[i] === '}') {
      depth--
      if (depth === 0) {
        break
      }
    }
  }

  return new Set([...source.slice(open, i).matchAll(/^\s{6}'?([a-z0-9-]+)'?\s*:/gim)].map(match => match[1]!))
}

/** `B24SelectMenu` -> `select-menu`, the theme file that names its colours. */
const themeFileFor = (component: string) =>
  component.replace(/^(?:B24|Prose)/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

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

  it('has `index.json` committed exactly as the generator writes it', async () => {
    // The load-bearing check now that the manifest is generated, and the one
    // that names its own fix: `pnpm run skill:sync` produces the correct file.
    // The file-list check below it is kept for legibility — it says *which*
    // reference an agent would lose, where this one says the file is stale.
    //
    // Compared through the generator itself rather than a reimplementation
    // here, so the two cannot agree with each other while both are wrong.
    expect(await readFile(join(skillsDir, 'index.json'), 'utf8')).toBe(await buildManifest(repoRoot))
  })

  it('discovers packages and refuses the shapes it cannot represent', async () => {
    // The repository has exactly one skill package, so every other check
    // exercises one code path and leaves discovery, the multi-package case and
    // both error branches unrun — they would first execute on the day someone
    // adds a second skill, which is the worst possible time to find out.
    //
    // Built in the OS temp directory: this suite must never write inside the
    // repository, and a fixture that did would be indistinguishable from the
    // import-time write that made an earlier draft of the generator repair the
    // very manifest it was checking.
    const root = await mkdtemp(join(tmpdir(), 'b24ui-skill-'))

    try {
      const write = async (path: string, body: string) => {
        await mkdir(dirname(join(root, path)), { recursive: true })
        await writeFile(join(root, path), body)
      }

      const frontmatter = (description: string) => `---\ndescription: ${description}\n---\n`

      await write('skills/alpha/SKILL.md', frontmatter('First skill.'))
      await write('skills/alpha/references/guidelines/one.md', '# One')
      await write('skills/alpha/references/deep/nested/two.md', '# Two')
      await write('skills/zeta/SKILL.md', frontmatter('Second skill.'))
      // Not a skill package: no `SKILL.md`, so it is skipped rather than
      // failing the run.
      await write('skills/notes/scratch.md', '# Scratch')
      // Written last, sorts first: with these three in creation order the
      // package sort is doing real work, where `alpha` before `zeta` alone
      // would pass whether it sorted or not.
      await write('skills/aardvark/SKILL.md', frontmatter('Third skill.'))

      const manifest = JSON.parse(await buildManifest(root))

      expect(manifest.skills.map((skill: { name: string }) => skill.name)).toEqual(['aardvark', 'alpha', 'zeta'])
      expect(manifest.skills[1].description).toBe('First skill.')
      expect(manifest.skills[1].files).toEqual([
        'SKILL.md',
        'references/deep/nested/two.md',
        'references/guidelines/one.md'
      ])
      // Nested paths are `/`-joined whatever the platform separator is, since
      // the manifest is read wherever the skill is installed.
      expect(await buildManifest(root)).not.toContain('\\')

      // A description containing `: ` has to be quoted in YAML, so quoting is
      // ordinary rather than exotic — and without unwrapping, the quote
      // characters themselves would ship inside the JSON string.
      await write('skills/zeta/SKILL.md', frontmatter(`'Build UIs: fast.'`))
      expect(JSON.parse(await buildManifest(root)).skills[2].description).toBe('Build UIs: fast.')

      // The directory is the name; the frontmatter's copy is a second source for
      // one fact, so they are required to agree rather than left to drift.
      await write('skills/zeta/SKILL.md', '---\nname: something-else\ndescription: Second.\n---\n')
      await expect(buildManifest(root)).rejects.toThrow(/does not match its directory/)

      // Double quotes take the same path as single ones; testing only one left
      // half the branch unexercised.
      await write('skills/zeta/SKILL.md', frontmatter('"Build UIs: fast."'))
      expect(JSON.parse(await buildManifest(root)).skills[2].description).toBe('Build UIs: fast.')

      // A YAML escape is refused rather than shipped undecoded — `''` is one
      // apostrophe to a parser and two to a naive reader.
      await write('skills/zeta/SKILL.md', frontmatter(`'It''s fast.'`))
      await expect(buildManifest(root)).rejects.toThrow(/YAML escape/)

      // A comment after a *quoted* value is legal and must not be mistaken for
      // part of it.
      await write('skills/zeta/SKILL.md', frontmatter(`'Fast.' # for Bitrix24`))
      expect(JSON.parse(await buildManifest(root)).skills[2].description).toBe('Fast.')

      // Whole value is a comment: YAML reads null, a naive reader reads the
      // comment text as the description.
      await write('skills/zeta/SKILL.md', frontmatter('# TODO write me'))
      await expect(buildManifest(root)).rejects.toThrow(/only a comment/)

      // Present but empty, distinct from absent.
      await write('skills/zeta/SKILL.md', frontmatter(''))
      await expect(buildManifest(root)).rejects.toThrow(/no `description`/)

      // A block scalar carrying a chomping or indentation indicator — the bare
      // `>` case alone would pass a guard that only compared literals.
      await write('skills/zeta/SKILL.md', frontmatter('|-'))
      await expect(buildManifest(root)).rejects.toThrow(/multi-line YAML scalar/)

      // `name` gets every protection `description` does; it used to get none.
      await write('skills/zeta/SKILL.md', '---\nname: zeta\nname: evil\ndescription: Second.\n---\n')
      await expect(buildManifest(root)).rejects.toThrow(/declares `name` 2 times/)

      await write('skills/zeta/SKILL.md', '---\nname: \'zeta\'\ndescription: Second.\n---\n')
      expect(JSON.parse(await buildManifest(root)).skills[2].name).toBe('zeta')

      await write('skills/zeta/SKILL.md', frontmatter('Build UIs fast # and see also'))
      await expect(buildManifest(root)).rejects.toThrow(/trailing comment/)

      await write('skills/zeta/SKILL.md', frontmatter('>'))
      await expect(buildManifest(root)).rejects.toThrow(/multi-line YAML scalar/)

      // YAML resolves a repeated key to the *last* value and this scraper to
      // the first, so the manifest would carry a description the file does not
      // actually declare. Exactly the shape of the `page.md` bug.
      await write('skills/zeta/SKILL.md', '---\ndescription: First.\ndescription: Second.\n---\n')
      await expect(buildManifest(root)).rejects.toThrow(/declares `description` 2 times/)

      await write('skills/zeta/SKILL.md', frontmatter('Bell \u0007 and escape \u001B[31m.'))
      await expect(buildManifest(root)).rejects.toThrow(/control or invisible characters/)

      await write('skills/zeta/SKILL.md', '---\nname: zeta\n---\n')
      await expect(buildManifest(root)).rejects.toThrow(/no `description`/)

      // A backslash is ordinary filename data on POSIX. Normalising separators
      // by splitting on it turned `x\..\..\..\escape.md` — which `touch`
      // creates, no permissions needed — into `references/x/../../../escape.md`
      // in a file the installer reads as where-to-write instructions.
      await write('skills/zeta/SKILL.md', frontmatter('Second skill.'))
      // POSIX-only: on Windows those backslashes are real separators, so the
      // file lands outside `skills/` and no package contains it.
      if (process.platform !== 'win32') {
        await write(String.raw`skills/zeta/x\..\..\..\escape.md`, 'payload')
        await expect(buildManifest(root)).rejects.toThrow(/is not portable/)
        await rm(join(root, String.raw`skills/zeta/x\..\..\..\escape.md`))
      }

      // The package directory reaches the manifest as `name`, and for a while it
      // was the one value that got no validation at all — a directory anyone can
      // create with `mkdir 'x\..\..\evil'` put `..\` straight into the field an
      // installer joins onto its destination path.
      if (process.platform !== 'win32') {
        await write(String.raw`skills/x\..\..\evil/SKILL.md`, frontmatter('Escaped.'))
        await expect(buildManifest(root)).rejects.toThrow(/skill package name is not portable/)
        await rm(join(root, String.raw`skills/x\..\..\evil`), { recursive: true })
      }

      // Two names that are one file once installed — case-insensitively on
      // Windows and macOS, and NFC/NFD-conflated on macOS.
      await write('skills/zeta/Notes.md', '# Notes')
      await write('skills/zeta/notes.md', '# Notes')
      await expect(buildManifest(root)).rejects.toThrow(/collide once installed/)
      await rm(join(root, 'skills/zeta/Notes.md'))
      await rm(join(root, 'skills/zeta/notes.md'))

      // Refused rather than skipped: a symlinked reference is on disk, looks
      // installed, and never arrives.
      // `symlink` needs elevated rights on Windows without Developer Mode.
      if (process.platform !== 'win32') {
        await symlink(join(root, 'skills/alpha/references/guidelines/one.md'), join(root, 'skills/zeta/linked.md'))
        await expect(buildManifest(root)).rejects.toThrow(/must not contain symlinks/)
        await rm(join(root, 'skills/zeta/linked.md'))

        // A symlinked *directory* reports neither `isFile()` nor `isDirectory()`,
        // so a guard narrowed to files would drop it without a word.
        await symlink(join(root, 'skills/alpha/references'), join(root, 'skills/zeta/linked'))
        await expect(buildManifest(root)).rejects.toThrow(/must not contain symlinks/)
        await rm(join(root, 'skills/zeta/linked'))
      }

      // Nothing under `skills/` is a package: an empty manifest would install
      // nothing while looking successful.
      const bare = await mkdtemp(join(tmpdir(), 'b24ui-skill-'))
      try {
        await mkdir(join(bare, 'skills/notes'), { recursive: true })
        await writeFile(join(bare, 'skills/notes/scratch.md'), '# Scratch')
        await expect(buildManifest(bare)).rejects.toThrow(/no skill package found/)
      } finally {
        await rm(bare, { recursive: true, force: true })
      }
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })

  it('lists exactly the files on disk in `index.json`', async () => {
    const manifest = await readManifest()
    const packages = await listPackages()
    expect(manifest.skills.map(skill => skill.name).sort()).toEqual(packages)

    const listed = manifest.skills.flatMap(skill => skill.files.map(file => `${skill.name}/${file}`)).sort()
    const onDisk = (await glob('*/**/*.md', { cwd: skillsDir, ...GLOB })).sort()

    // Kept alongside the generator check because it fails *legibly*: a diff of
    // two path lists says which reference an agent would lose, where a diff of
    // two JSON blobs says a file is stale. Both directions matter and they
    // fail differently — on disk but unlisted is never installed, listed but
    // missing breaks the install itself.
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

      // Inline `[text](target)` only. Reference-style links (`[text][ref]`
      // with a `[ref]: path` definition) are not checked; none exist in the
      // package today, and supporting them means resolving the two halves
      // against each other for a form nothing here uses.
      //
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

  it('passes only colours the component theme declares', async () => {
    // The third defect class in #345, and the one that proves the guard is
    // worth having: `data-tables.md` shipped `color="neutral"` on `B24Badge`,
    // that was fixed by hand to `air-secondary-no-accent` — which `Badge` does
    // not declare either, only `Button` does — and it sat wrong for another
    // month. Rendering it produces no `style-*` class at all, so the Inactive
    // badge is simply uncoloured. Nothing throws, nothing warns.
    const themes = new Map<string, Set<string>>()
    for (const file of await glob('*.ts', { cwd: join(repoRoot, 'src/theme'), ...GLOB })) {
      const keys = colourKeys(await readFile(join(repoRoot, 'src/theme', file), 'utf8'))
      if (keys?.size) {
        themes.set(file.replace(/\.ts$/, ''), keys)
      }
    }

    expect(themes.get('button')?.has('air-secondary-no-accent')).toBe(true)
    expect(themes.get('badge')?.has('air-secondary-no-accent')).toBe(false)
    expect(themes.get('badge')?.has('air-tertiary')).toBe(true)

    const unknown: string[] = []
    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')
      for (const [, name, attrs] of body.matchAll(/<((?:B24|Prose)[A-Za-z0-9]+)\b([^>]*)>/g)) {
        const theme = themes.get(themeFileFor(name!))
        if (!theme) {
          continue
        }
        // A static attribute is a literal. The leading boundary keeps `:color`
        // and `active-color` out — those are expressions and other props.
        for (const [, , value] of attrs!.matchAll(/(^|\s)color="([^"]+)"/g)) {
          if (!theme.has(value!)) {
            unknown.push(`${doc}: <${name} color="${value}">`)
          }
        }
        // Quoted literals inside a bound expression are still checkable, and
        // that is where the Badge defect lived — a ternary, not an attribute.
        for (const [, expression] of attrs!.matchAll(/:color="([^"]+)"/g)) {
          for (const [, literal] of expression!.matchAll(/'([a-z][a-z0-9-]*)'/g)) {
            if (!theme.has(literal!)) {
              unknown.push(`${doc}: <${name} :color="… '${literal}' …">`)
            }
          }
        }
      }
    }

    expect(unknown.sort()).toEqual([])
  })

  it('references only CSS custom properties that exist', async () => {
    // Same shape one layer down, and the cheapest sibling of the colour check:
    // `design-system.md` told readers to set `--b24ui-header-heights`, plural,
    // which is declared nowhere — the singular is what every declaration uses.
    // `forms.md` reached for `--ui-color-typography-secondary`, and there is no
    // `--ui-color-typography-*` family at all. Both resolve to nothing and
    // style nothing, silently.
    const declared = new Set<string>()
    for (const file of await glob('**/*.{css,ts,vue}', { cwd: join(repoRoot, 'src'), ...GLOB })) {
      const body = await readFile(join(repoRoot, 'src', file), 'utf8')
      for (const [, token] of body.matchAll(/(--(?:b24ui|ui)-[a-z0-9-]+)\s*:/g)) {
        declared.add(token!)
      }
    }

    expect(declared.has('--ui-color-base-5')).toBe(true)
    expect(declared.has('--ui-color-typography-secondary')).toBe(false)

    const unknown: string[] = []
    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')
      // Only tokens being *used*: `var(--x)` or Tailwind's `text-(--x)`. The
      // closing paren is what separates a real reference from the placeholders
      // the prose writes — `--ui-color-base-N`, `…-bg-gradient-{1,2,3}`,
      // `…-bg-content-*` — which would otherwise all read as phantom tokens.
      for (const [, token] of body.matchAll(/\((--(?:b24ui|ui)-[a-z0-9-]+)\)/g)) {
        if (!declared.has(token!)) {
          unknown.push(`${doc}: ${token}`)
        }
      }
    }

    expect([...new Set(unknown)].sort()).toEqual([])
  })

  it('keeps example code free of the mistakes agents copy verbatim', async () => {
    // Three shapes, all found in the wild in this package, none of which any
    // structural check above can see because they live inside fenced code.
    const confusable: string[] = []
    const objectBinds: string[] = []
    const duplicateImports: string[] = []

    for (const doc of await listDocs()) {
      const body = await readFile(join(skillDir, doc), 'utf8')

      // A Cyrillic or Greek letter inside an identifier is invisible on the
      // page and fatal in the editor — `<И24Card>` sat in `design-system.md`
      // looking exactly like `<B24Card>`, and Greek capital Beta is the same
      // trap one alphabet over.
      // Only *mixed-script* tokens, not any Cyrillic character. Bitrix24 is a
      // Russian-market product and a reference file demonstrating a locale with
      // real Russian sample text is legitimate content; `И24Card` is not,
      // because the token mixes Cyrillic with ASCII. That mix is the homoglyph
      // signature — pure Russian prose never trips it.
      for (const [token] of body.matchAll(/[\p{L}\p{N}_$]+/gu)) {
        const confusableChar = [...token].find(char => /[\p{Script=Cyrillic}\p{Script=Greek}]/u.test(char))
        if (confusableChar && /[a-z0-9]/i.test(token)) {
          confusable.push(`${doc}: ${token} contains U+${confusableChar.codePointAt(0)!.toString(16).toUpperCase()}`)
        }
      }

      for (const [block] of body.matchAll(/```[a-z]*\n[\s\S]*?```/g)) {
        // `:icon="{AchievementIcon}"` passes an object where a component is
        // expected; it renders nothing and raises no error.
        // Uppercase identifier only: `:class="{ active }"` and `:style="{ open }"`
        // are the standard Vue object shorthand and completely correct, while
        // the bug shape is always a capitalised component or icon name.
        for (const [bind] of block.matchAll(/:[\w-]+="\{\s*[A-Z][\w$]*\s*\}"/g)) {
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
    // The routing table names references by bare word, so the vocabulary is
    // keyed by basename — which is only unambiguous while the basenames are
    // unique. `guidelines/settings.md` alongside `recipes/settings.md` would
    // collapse into one entry and let a row resolve to the wrong file: the
    // `B24Slider`-pointing-at-`range.md` shape, one level up.
    const references = (await listDocs()).filter(doc => doc.startsWith('references/'))
    const basenames = references.map(doc => doc.split('/').pop()!)
    expect(basenames).toHaveLength(new Set(basenames).size)

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

  it('points every index row at the documentation for that component', async () => {
    // The row is three columns: the name and the purpose are editorial, the
    // link is not — it is a mechanical function of the component, and #344
    // asked whether the whole table should therefore be generated. It should
    // not: the sections deliberately group by task rather than by the docs'
    // `category`, and the hand-written purpose beats the docs description for
    // an agent — "Data table (TanStack Table) with sorting, selection,
    // pinning" against "A responsive data table component." So the mechanical
    // column gets a check instead, and the editorial ones keep their author.
    //
    // Measured, not assumed: four of the twelve sections mix docs categories
    // — Layout, Element, Overlay and Navigation, with Element alone drawing
    // from five (`element`, `overlay`, `data`, `layout`, `i18n`). Generating
    // by category would move `Accordion`, `Timeline`, `User` and `ScrollArea`
    // out of where someone deciding what to build would look for them.
    //
    // Matched through the page's frontmatter `title` rather than by
    // kebab-casing the name, so a wrong link and a wrong name both fail here
    // — and so this depends on the frontmatter being right. `page.md` turned
    // out to have `description:` twice and no `title:` at all, which is how
    // that was found.
    const pagesDir = join(repoRoot, 'docs/content/docs/2.components')
    const titles = new Map<string, string>()

    for (const page of await glob('*.md', { cwd: pagesDir })) {
      const front = (await readFile(join(pagesDir, page), 'utf8')).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
      const title = front.match(/^title:(.*)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '')
      if (title) {
        titles.set(page, title)
      }
    }

    expect(titles.get('page.md')).toBe('Page')

    const index = await readFile(join(skillDir, 'references/components.md'), 'utf8')
    // Captures the label AND the href. An earlier version stopped at the
    // closing `]`, so it looked up the link *text* and never read the URL at
    // all — which passes today only because the two happen to agree, and would
    // go on passing if someone repointed the href and left the label alone.
    // That is precisely the edit a mechanical check exists to catch.
    // `(?:[^|\n]|\\\\\\|)*` for the purpose column: a bare `[^|]*` cannot cross a
    // markdown-escaped pipe (legal in a table cell, and this file documents
    // props whose values are `px` \\| `rem`), and it matches newlines, so a
    // malformed row could span two lines. Either way the row would drop out of
    // `rows` rather than fail — which the count below now catches, but a regex
    // that cannot match legal content would fail for the wrong reason.
    const rows = [...index.matchAll(/^\| `B24([A-Za-z0-9]+)` \|(?:[^|\n]|\\\|)*\| \[([^\]]+)\]\(([^)\n]+)\)/gm)]

    // Counted independently of the pattern, not against a loose floor: a row
    // that loses its Docs column stops matching and simply vanishes from
    // `rows`, so `toBeGreaterThan(100)` against 116 rows would tolerate fifteen
    // of them silently losing their link. Every `B24` row has a link column —
    // the Prose tables use bare names and a different shape — so the two counts
    // must agree exactly.
    const rowLines = index.split('\n').filter(line => /^\| `B24/.test(line))
    expect(rows).toHaveLength(rowLines.length)
    expect(rows.length).toBeGreaterThan(100)

    // The whole URL, not just its last segment. Checking the suffix alone lets
    // a row keep its filename while losing `raw/` — which serves rendered HTML
    // instead of the markdown an agent asked for — or point at another host
    // entirely.
    const DOCS = 'https://bitrix24.github.io/b24ui/raw/docs/components'

    const wrong = rows
      .filter(([, name, label, href]) => titles.get(label!) !== name || href !== `${DOCS}/${label}`)
      .map(([, name, label, href]) => `B24${name} -> ${label} (${titles.get(label!) ?? 'no such page'}) at ${href}`)

    expect(wrong).toEqual([])
  })

  // The description-vs-frontmatter check that used to live here is gone rather
  // than kept alongside the generator: it re-derived its expected value with
  // the same one-line regex the generator uses, so the two could only ever
  // agree — including on a quoted or commented scalar, where both were wrong in
  // the same direction. The file-list check above survives the same argument
  // because `tinyglobby` walks the tree independently, so it is a second
  // opinion rather than an echo. `buildManifest`'s own handling of those
  // shapes is covered by the fixture case instead.

  it('keeps every skill file inside the package it ships', async () => {
    const packages = await listPackages()
    const stray = (await glob('**/*.md', { cwd: skillsDir, ...GLOB }))
      // A file belongs to some package or to none; `index.json` itself is not
      // markdown, so anything loose under `skills/` ships nowhere.
      .filter(doc => !packages.some(name => doc.startsWith(`${name}/`)))

    expect(stray).toEqual([])
  })

  it('ships markdown only', async () => {
    // Every other check globs `**/*.md`, which is only sufficient while the
    // package contains nothing else — an image or a stray `.DS_Store` inside
    // it is invisible to all of them, in both directions. That matters beyond
    // tidiness: the docs also advertise installing the raw directory tree
    // (Cursor's `install-skill?url=…/tree/main/skills/b24-ui-nuxt`), which
    // copies whatever is there rather than what `index.json` lists.
    //
    // If an asset is ever genuinely needed, this is the line that says so out
    // loud, and the manifest has to grow a way to carry it.
    const packages = await listPackages()
    const other = (await Promise.all(packages.map(name =>
      glob('**/*', { cwd: join(skillsDir, name), dot: true, ignore: ['**/*.md', '**/node_modules/**'] })
        .then(found => found.map(file => `${name}/${file}`))
    ))).flat()

    expect(other).toEqual([])
  })
})
