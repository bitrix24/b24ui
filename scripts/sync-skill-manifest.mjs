/**
 * Writes `skills/index.json` from the skill packages on disk (see #344).
 *
 *   pnpm run skill:sync    # write it
 *   pnpm run skill:check   # exit 1 if it would change
 *
 * The generation itself is in `scripts/lib/skill-manifest.mjs`, which has no
 * side effects so the spec can import it without this file's writes running.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildManifest } from './lib/skill-manifest.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = join(repoRoot, 'skills', 'index.json')

const generated = await buildManifest(repoRoot)
// Only "not written yet" counts as absent. A blanket catch would report an
// unreadable file as out of date and then blindly overwrite it — the same
// hazard the library narrows its own catch for.
const current = await readFile(manifestPath, 'utf8').catch((error) => {
  if (error.code !== 'ENOENT') {
    throw error
  }
  return null
})

if (process.argv.includes('--check')) {
  if (current !== generated) {
    console.error('skills/index.json is out of date — run `pnpm run skill:sync`')
    process.exit(1)
  }
  console.log('skills/index.json is up to date')
} else if (current === generated) {
  console.log('skills/index.json is already up to date')
} else {
  await writeFile(manifestPath, generated)
  console.log('skills/index.json regenerated')
}
