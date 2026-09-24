import { describe, it, expect, vi, afterEach } from 'vitest'
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'pathe'
import { appendThemeDefault } from '../../cli/utils.mjs'

/**
 * `pnpm cli make component` registers the new component in `ThemeDefaults` so
 * `<B24Theme :props>` autocompletes it. Two things have to hold for that to
 * work, and before nuxt/ui@4bfb47d neither did:
 *
 * 1. The CLI must write to the file the interface lives in. It wrote to
 *    `useComponentProps.ts`, which has no `ThemeDefaults` interface, so the
 *    regex missed and the function returned without a word — every scaffolded
 *    component silently skipped step 5 of AGENTS.md's workflow.
 * 2. It must insert one line. The old body did `[...lines, entry].sort()`, and
 *    run against the real `types/theme.ts` that is not one line: it moves 67
 *    of the body's 172, sorts the commented-out entries and the `form` TODO
 *    away from what they document, and hoists the 4-space `prose` entries to
 *    the top — so `radioGroup` … `user` end up *inside* `prose?: {}`. It still
 *    parses. The wrong path was the only thing keeping that from happening, so
 *    fixing the path alone would have turned a silent no-op into silent
 *    corruption.
 */

const REPO = process.cwd()
const THEME_TYPES = join(REPO, 'src/runtime/types/theme.ts')

let dir: string | undefined
function scratchCopy() {
  dir = mkdtempSync(join(tmpdir(), 'b24-cli-'))
  const file = join(dir, 'theme.ts')
  copyFileSync(THEME_TYPES, file)
  return file
}
afterEach(() => {
  if (dir) rmSync(dir, { recursive: true, force: true })
  dir = undefined
  vi.restoreAllMocks()
})

function addedLines(before: string, after: string) {
  const a = before.split('\n')
  const b = after.split('\n')
  // Everything in `before` must survive in order; return what was inserted.
  const out: string[] = []
  let i = 0
  for (const line of b) {
    if (i < a.length && line === a[i]) i++
    else out.push(line)
  }
  expect(i, 'an original line was changed or reordered').toBe(a.length)
  return out
}

describe('cli: ThemeDefaults registration', () => {
  it('writes to the file that declares the interface', () => {
    const src = readFileSync(join(REPO, 'cli/commands/make/component.mjs'), 'utf-8')
    const target = src.match(/appendThemeDefault\(\s*(\w+)/)?.[1]
    expect(target, 'appendThemeDefault call not found').toBeTruthy()
    const rel = src.match(new RegExp(`const ${target} = resolve\\(path, '([^']+)'\\)`))?.[1]
    expect(rel, `could not resolve the path held by \`${target}\``).toBeTruthy()
    expect(readFileSync(join(REPO, rel!), 'utf-8')).toContain('export interface ThemeDefaults {')
  })

  it('inserts exactly one line and leaves every other line where it was', async () => {
    const file = scratchCopy()
    const before = readFileSync(file, 'utf-8')
    await appendThemeDefault(file, 'formGroup', 'FormGroupProps')
    expect(addedLines(before, readFileSync(file, 'utf-8'))).toEqual(['  formGroup?: Partial<ComponentTypes.FormGroupProps>'])
  })

  it('keeps the prose block intact', async () => {
    const file = scratchCopy()
    await appendThemeDefault(file, 'zoomPanel', 'ZoomPanelProps')
    const after = readFileSync(file, 'utf-8')
    // Anti-vacuity: the block this protects must exist in the real file.
    const block = after.match(/\n {2}prose\?: \{\n([\s\S]*?)\n {2}\}/)?.[1]
    expect(block, 'no `prose?: {…}` block in types/theme.ts').toBeTruthy()
    const lines = block!.split('\n')
    expect(lines.length).toBeGreaterThan(5)
    expect(lines.every(l => l.startsWith('    '))).toBe(true)
  })

  it('puts a new key ahead of the comments that belong to the next entry', async () => {
    // `carousel` sorts between `card` and a run of commented-out entries; the
    // comments must stay attached to what follows them.
    const file = scratchCopy()
    const before = readFileSync(file, 'utf-8')
    expect(before).toContain('  // carousel?:')
    await appendThemeDefault(file, 'carousel', 'CarouselProps')
    const after = readFileSync(file, 'utf-8')
    expect(after).toContain('  card?: Partial<ComponentTypes.CardProps>\n  carousel?: Partial<ComponentTypes.CarouselProps>\n  // carousel?:')
  })

  it('is idempotent', async () => {
    const file = scratchCopy()
    await appendThemeDefault(file, 'formGroup', 'FormGroupProps')
    const once = readFileSync(file, 'utf-8')
    await appendThemeDefault(file, 'formGroup', 'FormGroupProps')
    expect(readFileSync(file, 'utf-8')).toBe(once)
  })

  it('says so, and writes nothing, when the interface is not there', async () => {
    const file = scratchCopy()
    writeFileSync(file, 'export const nothing = 1\n')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await appendThemeDefault(file, 'formGroup', 'FormGroupProps')
    expect(readFileSync(file, 'utf-8')).toBe('export const nothing = 1\n')
    expect(warn).toHaveBeenCalledOnce()
    expect(String(warn.mock.calls[0]![0])).toContain('formGroup')
  })
})
