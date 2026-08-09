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
import { join } from 'node:path'

/** Every `.md` under `dir`, as `/`-separated paths relative to it, sorted. */
async function listMarkdown(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })

  return entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    // `parentPath` is absolute; make it relative to the package and normalise
    // the separator, because the manifest is read on every platform.
    .map(entry => join(entry.parentPath, entry.name).slice(dir.length + 1).split(/[\\/]/).join('/'))
    .sort()
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
    } catch {
      // A directory under `skills/` with no `SKILL.md` is not a skill package.
      continue
    }

    // `(.*)` then trim, rather than `\s*(.+)`: the two quantifiers there can
    // both claim a leading space, which is polynomial backtracking and a lint
    // error in this repo.
    const description = frontmatter?.match(/^description:(.*)$/m)?.[1]?.trim()
    if (!description) {
      throw new Error(`skills/${name}/SKILL.md has no \`description\` in its frontmatter`)
    }

    skills.push({ name, description, files: await listMarkdown(packageDir) })
  }

  if (!skills.length) {
    throw new Error(`no skill package found under ${skillsDir}`)
  }

  return `${JSON.stringify({ skills }, null, 2)}\n`
}
