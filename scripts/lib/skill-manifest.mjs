/**
 * Builds `skills/index.json` from the skill packages on disk.
 *
 * `npx skills add bitrix24/b24ui` installs exactly what that manifest lists, so
 * an entry missing from it is a reference the agent silently never receives.
 * The list was hand-maintained until #344 and drifted the way hand-kept copies
 * do: `card-pickers.md` and `settings.md` sat on disk, routed from `SKILL.md`,
 * and absent from the manifest (#93). Nothing about that looks wrong in review —
 * the file is a plausible list of plausible paths.
 *
 * Both fields are derivations, not decisions: `files` is the package's own `.md`
 * tree, `description` is the `SKILL.md` frontmatter verbatim. The routing table,
 * the guidelines and the recipes stay hand-written — those are editorial, and a
 * generator has no opinion worth having about them.
 *
 * This module is deliberately **side-effect free**. The CLI lives in
 * `scripts/sync-skill-manifest.mjs`, because the first version combined them and
 * `test/utils/skill-manifest.spec.ts` — which imports `buildManifest` so it
 * checks the same function CI runs — silently *repaired* the manifest at import
 * time. Its mutation test passed against a deliberately broken file. A check
 * that fixes what it is meant to catch is worse than no check.
 */
import { readFile, readdir } from 'node:fs/promises'
import { isAbsolute, join, relative, sep } from 'node:path'

/**
 * Every `.md` under `dir`, as `/`-separated paths relative to it, sorted.
 *
 * Each path is split on the *platform* separator and rejoined with `/`, and
 * every segment is checked. An earlier version normalised by splitting the
 * whole joined string on `[\\/]`, which on POSIX is not normalisation at all:
 * a backslash is ordinary filename data there, so a file anyone can create with
 * `touch 'x\..\..\..\escape.md'` came out of the generator as
 * `references/x/../../../escape.md` — a traversal path, manufactured by the
 * code meant to sanitise it, in the file an installer treats as instructions
 * for where to write.
 *
 * Symlinks are excluded: `readdir` reports a symlinked file as neither
 * `isFile()` nor a traversable directory, so they are already skipped — this
 * comment exists because that is Node behaviour rather than an explicit choice
 * here, and swapping `Dirent.isFile()` for a `stat` call would silently follow
 * them out of the package.
 */
async function listMarkdown(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })
  const files = []

  for (const entry of entries) {
    // `readdir` reports a symlink's own type, so a symlinked file is not
    // `isFile()` and a symlinked directory is never traversed. Following them
    // would let a package claim files outside itself; dropping them quietly
    // would be the failure this generator exists to prevent — a reference that
    // is on disk, looks installed, and never arrives. So: refuse, loudly.
    if (entry.isSymbolicLink()) {
      throw new Error(`skill packages must not contain symlinks: ${join(entry.parentPath, entry.name)}`)
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      continue
    }

    const path = relative(dir, join(entry.parentPath, entry.name))
    const segments = path.split(sep)

    if (isAbsolute(path) || segments.includes('..') || segments.some(segment => segment.includes('\\'))) {
      throw new Error(`skill file has a name that cannot be written to a portable manifest path: ${path}`)
    }

    files.push(segments.join('/'))
  }

  return files.sort()
}

/**
 * The manifest text, trailing newline included, exactly as it belongs on disk.
 *
 * `repoRoot` is a parameter rather than derived from `import.meta.url`: under
 * vitest a path resolved relative to that URL comes back pointing at the dev
 * server, so a module that resolved its own root would work from the CLI and
 * break in the spec that imports it.
 */
export async function buildManifest(repoRoot) {
  const skillsDir = join(repoRoot, 'skills')

  const packages = (await readdir(skillsDir, { withFileTypes: true }))
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()

  const skills = []
  for (const name of packages) {
    const packageDir = join(skillsDir, name)

    let frontmatter
    try {
      frontmatter = (await readFile(join(packageDir, 'SKILL.md'), 'utf8')).match(/^---\n([\s\S]*?)\n---/)?.[1]
    } catch (error) {
      // A directory under `skills/` with no `SKILL.md` is not a skill package.
      // Narrowed to that one case: a blanket catch here would drop a real
      // package on an EACCES or an I/O error and report nothing at all.
      if (error.code !== 'ENOENT') {
        throw error
      }
      continue
    }

    // `name` comes from the directory, and the frontmatter declares one too —
    // two sources for one fact, which is the shape this generator exists to
    // remove. Nothing downstream reads the frontmatter copy, so a drift between
    // them is silent: the manifest would keep saying `b24-ui-nuxt` while the
    // file it points at called itself something else.
    const declaredName = frontmatter?.match(/^name:(.*)$/m)?.[1]?.trim()
    if (declaredName && declaredName !== name) {
      throw new Error(
        `skills/${name}/SKILL.md declares \`name: ${declaredName}\`, which does not match its directory`
      )
    }

    // The frontmatter is scraped, not parsed, so the shapes a parser would
    // handle differently have to be refused rather than guessed at. A repeated
    // key is the first: this regex returns the *first* match and YAML takes the
    // *last*, so the two disagree about which value is real. Not hypothetical —
    // `docs/.../page.md` shipped with `description:` twice, which is the bug
    // that sent this PR looking at frontmatter in the first place.
    const declared = [...(frontmatter ?? '').matchAll(/^description:(.*)$/gm)]
    if (declared.length > 1) {
      throw new Error(`skills/${name}/SKILL.md declares \`description\` ${declared.length} times`)
    }

    // `(.*)` then trim, rather than `\s*(.+)`: the two quantifiers there can
    // both claim a leading space, which is polynomial backtracking and a lint
    // error in this repo.
    const raw = declared[0]?.[1]?.trim()
    if (!raw) {
      throw new Error(`skills/${name}/SKILL.md has no \`description\` in its frontmatter`)
    }

    // A quoted scalar is not exotic — a description containing `: ` has to be
    // quoted, and `docs/.../page.md` quotes its own for exactly that reason.
    // Without unwrapping, the quote characters themselves would ship inside the
    // JSON string to every agent that installs the skill.
    const quoted = /^(['"])([\s\S]*)\1$/.exec(raw)
    const description = quoted ? quoted[2] : raw

    // An unquoted scalar ends at ` #`, so anything after that is a YAML comment
    // rather than description text. Refused rather than stripped: the moment
    // this starts editing the value it is emulating a parser, and the shapes it
    // gets wrong are invisible in the output.
    if (!quoted && / #/.test(description)) {
      throw new Error(
        `skills/${name}/SKILL.md has a trailing comment on \`description\`; `
        + 'quote the value so the comment marker is unambiguous'
      )
    }

    // Control bytes survive `JSON.stringify` as escapes and come back as raw
    // bytes on the far side, where the description is printed by installers and
    // surfaced by agents — an escape sequence in it is a terminal-injection
    // primitive rather than a description.
    // Tested by code point rather than by regex, because a control-character
    // class is itself a lint error here.
    if ([...description].some(char => char < ' ' || char === '\u007F')) {
      throw new Error(`skills/${name}/SKILL.md has control characters in its \`description\``)
    }

    // This reads one line, so a YAML block scalar would silently become the
    // indicator character and nothing else — and the spec's description check
    // extracts it the same naive way, so both sides would agree while both
    // were wrong. Refuse the shape instead of guessing at it.
    if (description === '|' || description === '>' || /^[|>][-+\d]*$/.test(description)) {
      throw new Error(
        `skills/${name}/SKILL.md writes \`description\` as a multi-line YAML scalar; `
        + 'the manifest needs it on one line'
      )
    }

    skills.push({ name, description, files: await listMarkdown(packageDir) })
  }

  if (!skills.length) {
    throw new Error(`no skill package found under ${skillsDir}`)
  }

  return `${JSON.stringify({ skills }, null, 2)}\n`
}
