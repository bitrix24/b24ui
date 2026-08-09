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
 * tree, `description` is the `SKILL.md` frontmatter. The routing table, the
 * guidelines and the recipes stay hand-written — those are editorial, and a
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
 * Characters that must never reach a manifest string.
 *
 * C0 and DEL are the obvious ones. C1 (U+0080–U+009F) carries an 8-bit CSI
 * introducer, and the Cf class carries the bidi overrides and zero-width joiners
 * behind Trojan-Source-style spoofing — two names that render identically are
 * exactly the review failure this whole file exists to prevent.
 *
 * @param {string} value
 * @returns {boolean} true when the value carries anything invisible
 */
function hasHiddenCharacters(value) {
  return [...value].some(char =>
    char < ' ' || (char >= '\u007F' && char <= '\u009F') || /\p{Cf}/u.test(char)
  )
}

/**
 * Rejects a path segment that cannot be written to a portable manifest path.
 *
 * Applied to file segments *and* to the package directory name. An earlier
 * version normalised separators by splitting the joined path on `[\\/]`, which
 * on POSIX is not normalisation at all: a backslash is ordinary filename data
 * there, so a file anyone can create with `touch 'x\..\..\..\escape.md'` came
 * out of the generator as `references/x/../../../escape.md` — a traversal path,
 * manufactured by the code meant to sanitise it, in the file an installer reads
 * as instructions for where to write. The package name reached the manifest by
 * the same route with no check at all.
 *
 * @param {string} segment
 * @param {string} context - what to name in the error
 * @returns {void} nothing; throws when the value is unusable
 */
function assertPortableSegment(segment, context) {
  // `:"<>|?*` are invalid on Windows, and a bare `:` there is
  // alternate-data-stream syntax rather than a filename character.
  if (segment === '..' || segment.includes('\\') || /[:"<>|?*]/.test(segment) || hasHiddenCharacters(segment)) {
    throw new Error(`${context} is not portable: ${JSON.stringify(segment)}`)
  }
}

/**
 * Rejects two entries that are distinct here and the same file once installed.
 *
 * Case-insensitive on every default macOS and Windows filesystem, and macOS
 * conflates NFC and NFD — so `café.md` and `café.md` are two byte-distinct
 * entries that render identically in a diff and overwrite each other on install.
 *
 * @param {string[]} values
 * @param {string} context
 * @returns {void} nothing; throws when the value is unusable
 */
function assertNoCollisions(values, context) {
  const seen = new Map()

  for (const value of values) {
    const key = value.normalize('NFC').toLowerCase()
    const first = seen.get(key)

    if (first !== undefined) {
      throw new Error(`${context} collide once installed: ${JSON.stringify(first)} and ${JSON.stringify(value)}`)
    }

    seen.set(key, value)
  }
}

/**
 * Reads one single-line scalar out of a frontmatter block.
 *
 * The frontmatter is scraped rather than parsed — `yaml` is not a dependency of
 * this repository — so the rule is to refuse every shape this cannot represent
 * exactly, rather than to emulate a parser badly. Emulating it badly is what
 * the first version did, and it got five shapes wrong: it took the first
 * repeated key where YAML takes the last, kept the quotes a value containing
 * `: ` requires, read a block scalar as its indicator character, left `''` and
 * `\"` escapes undecoded, and treated a whole-value comment as the value.
 *
 * Every one of those now throws with the fix in the message. The cost is that a
 * description needing a YAML escape has to be reworded; for a one-line field
 * that is a fair trade against shipping silently-wrong text to every agent.
 *
 * @param {string} frontmatter
 * @param {string} key
 * @param {string} context - the file to name in errors
 * @returns {string | null} the value, or null when the key is absent or empty
 */
function readScalar(frontmatter, key, context) {
  const declared = [...frontmatter.matchAll(new RegExp(`^${key}:(.*)$`, 'gm'))]

  // YAML resolves a repeated key to the *last* value and a first-match regex to
  // the first, so the two disagree about which value is real. Not hypothetical:
  // `docs/.../page.md` shipped with `description:` twice, which is the bug that
  // sent this PR looking at frontmatter in the first place.
  if (declared.length > 1) {
    throw new Error(`${context} declares \`${key}\` ${declared.length} times`)
  }

  const raw = declared[0]?.[1]?.trim()
  if (!raw) {
    return null
  }

  if (raw.startsWith('#')) {
    throw new Error(`${context} has only a comment where \`${key}\` should be`)
  }

  if (raw.startsWith('|') || raw.startsWith('>')) {
    throw new Error(`${context} writes \`${key}\` as a multi-line YAML scalar; the manifest needs it on one line`)
  }

  let value = raw
  const quote = raw[0]

  if (quote === '\'' || quote === '"') {
    // A value containing `: ` has to be quoted, so quoting is ordinary rather
    // than exotic. Located by the last quote so a legitimate trailing comment
    // after the closing one is allowed.
    const end = raw.lastIndexOf(quote)
    if (end === 0) {
      throw new Error(`${context} leaves \`${key}\` unterminated`)
    }

    const trailing = raw.slice(end + 1).trim()
    if (trailing && !trailing.startsWith('#')) {
      throw new Error(`${context} has trailing content after the quoted \`${key}\``)
    }

    value = raw.slice(1, end)

    if (value.includes('\\') || value.includes(quote + quote)) {
      throw new Error(`${context} uses a YAML escape in \`${key}\`; reword it so the value needs none`)
    }
  } else if (/ #/.test(value)) {
    // An unquoted scalar ends at ` #`. Refused rather than stripped: the moment
    // this starts editing the value it is emulating a parser again.
    throw new Error(`${context} has a trailing comment on \`${key}\`; quote the value so the marker is unambiguous`)
  }

  // Control bytes survive `JSON.stringify` as escapes and come back as raw bytes
  // on the far side, where the value is printed by installers and surfaced by
  // agents — an escape sequence there is a terminal-injection primitive rather
  // than a description.
  if (hasHiddenCharacters(value)) {
    throw new Error(`${context} has control or invisible characters in \`${key}\``)
  }

  return value || null
}

/**
 * Every `.md` under `dir`, as `/`-separated paths relative to it, sorted.
 *
 * Paths are split on the *platform* separator and rejoined with `/`, and every
 * segment is validated — see `assertPortableSegment` for why that matters.
 *
 * Symlinks are **refused**, not skipped: following one would let a package claim
 * files outside itself, and dropping it quietly would be the failure this
 * generator exists to prevent — a reference that is on disk, looks installed,
 * and never arrives.
 *
 * @param {string} dir - absolute path to one skill package
 * @returns {Promise<string[]>} sorted, `/`-separated paths relative to `dir`
 */
async function listMarkdown(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })
  const files = []

  for (const entry of entries) {
    if (entry.isSymbolicLink()) {
      throw new Error(`skill packages must not contain symlinks: ${join(entry.parentPath, entry.name)}`)
    }

    // Case-sensitive on purpose: a `.MD` file would be excluded here, and the
    // markdown-only check in `test/utils/skill-manifest.spec.ts` fails on it
    // rather than letting it ship unlisted.
    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      continue
    }

    const path = relative(dir, join(entry.parentPath, entry.name))
    const segments = path.split(sep)

    if (isAbsolute(path)) {
      throw new Error(`skill file resolves outside its package: ${path}`)
    }

    for (const segment of segments) {
      assertPortableSegment(segment, 'skill file path segment')
    }

    files.push(segments.join('/'))
  }

  assertNoCollisions(files, 'skill files')

  return files.sort()
}

/**
 * The manifest text, trailing newline included, exactly as it belongs on disk.
 *
 * `repoRoot` is a parameter rather than derived from `import.meta.url`: under
 * vitest a path resolved relative to that URL comes back pointing at the dev
 * server, so a module that resolved its own root would work from the CLI and
 * break in the spec that imports it.
 *
 * @param {string} repoRoot - absolute path to the repository root
 * @returns {Promise<string>} the manifest text, trailing newline included
 */
export async function buildManifest(repoRoot) {
  const skillsDir = join(repoRoot, 'skills')

  let entries
  try {
    entries = await readdir(skillsDir, { withFileTypes: true })
  } catch (error) {
    throw new Error(`cannot read ${skillsDir}: ${error.code ?? error.message}`, { cause: error })
  }

  const packages = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()

  // A symlinked package directory reports `isDirectory()` false, so it would be
  // dropped without a word — the same silence `listMarkdown` refuses.
  const linked = entries.find(entry => entry.isSymbolicLink())
  if (linked) {
    throw new Error(`skills/ must not contain symlinks: ${linked.name}`)
  }

  assertNoCollisions(packages, 'skill packages')

  const skills = []
  for (const name of packages) {
    const packageDir = join(skillsDir, name)
    const context = `skills/${name}/SKILL.md`

    let frontmatter
    try {
      frontmatter = (await readFile(join(packageDir, 'SKILL.md'), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1]
    } catch (error) {
      // A directory under `skills/` with no `SKILL.md` is not a skill package.
      // Narrowed to that one case: a blanket catch here would drop a real
      // package on an EACCES or an I/O error and report nothing at all.
      if (error.code !== 'ENOENT') {
        throw error
      }
      continue
    }

    // The directory is the name; the frontmatter's copy is a second source for
    // one fact, so they are required to agree rather than left to drift.
    assertPortableSegment(name, 'skill package name')

    const declaredName = readScalar(frontmatter ?? '', 'name', context)
    if (declaredName && declaredName !== name) {
      throw new Error(`${context} declares \`name: ${declaredName}\`, which does not match its directory`)
    }

    const description = readScalar(frontmatter ?? '', 'description', context)
    if (!description) {
      throw new Error(`${context} has no \`description\` in its frontmatter`)
    }

    skills.push({ name, description, files: await listMarkdown(packageDir) })
  }

  if (!skills.length) {
    throw new Error(`no skill package found under ${skillsDir}`)
  }

  return `${JSON.stringify({ skills }, null, 2)}\n`
}
