import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * A tag's width cap is a share of the field, never a pixel count.
 *
 * `max-w-[180px]` was b24ui's own addition — upstream nuxt/ui sets
 * `truncate` with no cap at all — and it produced the bug in #342: two tags
 * side by side, both ellipsised, with visible empty space to the right of
 * them. The cut had nothing to do with how much room the tag had, because a
 * constant cannot know how wide the field is or what shares its row.
 *
 * The reason this is a spec and not just a fixed theme file is that the
 * failure is invisible to every gate. happy-dom does no layout, so a snapshot
 * records the class and never notices that it truncates text which would have
 * fit; the component renders, the tests pass, and only a human looking at a
 * real field sees it. The same is true of the revert: a port that takes an
 * upstream hunk touching these slots, or anyone reaching for a quick fix,
 * puts a pixel back and nothing goes red.
 *
 * Three properties, in order of how much they carry:
 *
 * 1. No pixel cap on any tag slot in any theme. This is the sweep, and it is
 *    the half with teeth — it holds for slots that do not exist yet.
 * 2. The two themes that cap tags do so as a percentage, and pair it with
 *    `min-w-0`. Without `min-w-0` the flex child refuses to shrink below its
 *    content width, `truncate` never engages, and the cap silently does
 *    nothing — the failure mode that looks most like working code.
 * 3. The delete control does not shrink. The tag can now be squeezed; the
 *    close button must not be what gives way.
 */
const repoRoot = process.cwd()
const themeDir = join(repoRoot, 'src/theme')

/** Theme file → the slots that carry a tag's own width constraints. */
const TAG_SLOTS: Record<string, { item: string, text: string, del: string }> = {
  'input-menu.ts': { item: 'tagsItem', text: 'tagsItemText', del: 'tagsItemDelete' },
  'input-tags.ts': { item: 'item', text: 'itemText', del: 'itemDelete' }
}

/**
 * Any `max-w-[<number><unit>]` where the unit is absolute. Percentages, `full`
 * and container-query units are the point of the fix, so they are not matched;
 * `rem`/`em` are, because they are just as blind to the field's width as `px`.
 */
const ABSOLUTE_CAP = /max-w-\[\d+(?:\.\d+)?(?:px|rem|em|pt|ch)\]/g

function read(file: string): string {
  return readFileSync(join(themeDir, file), 'utf8')
}

/**
 * Every slot whose name says it renders a tag or an item, paired with its
 * source. Keyed on the slot name rather than on proximity in the file: an
 * earlier draft looked for `tag`/`item` within a few lines of a `max-w` and
 * reported `empty.ts`'s `max-w-[384px]`, which caps a block of body copy and
 * has nothing to do with this.
 */
function tagSlots(source: string): Array<[string, string]> {
  const found: Array<[string, string]> = []
  // Slot keys sit at a known depth inside `slots: { ... }`; matching the key
  // and taking the rest of its definition is enough, and avoids parsing TS.
  for (const match of source.matchAll(/^\s{4,8}(\w*(?:[Tt]ag|[Ii]tem)\w*):/gm)) {
    found.push([match[1]!, slotSource(source, match[1]!)])
  }
  return found
}

/**
 * Exactly one slot's definition, whether it is written as a string or as an
 * array joined with spaces.
 *
 * The bound has to be exact, and comments have to go. Two drafts of this
 * helper were wrong in the same direction, both found by mutation and neither
 * by reading. The first ended the slice twenty characters past the array
 * terminator as slop, so `tagsItem` was credited with the `min-w-0` belonging
 * to `tagsItemText`. The second kept the `//` comments — which explain the
 * `min-w-0` and therefore contain the string — so deleting the class still
 * satisfied `toContain('min-w-0')`. A spec that passes on its own prose is
 * worse than no spec, because it reads as coverage.
 */
function slotSource(source: string, slot: string): string {
  const start = source.search(new RegExp(`^\\s+${slot}:`, 'm'))
  expect(start, `slot \`${slot}\` not found — was it renamed?`).toBeGreaterThan(-1)
  const rest = source.slice(start)
  const array = rest.indexOf("].join(' '),")
  const line = rest.indexOf('\n')
  // An array definition runs to its terminator; a string one ends at its line.
  // Whichever comes first is this slot's; anything past it is the next slot's.
  if (array !== -1 && (line === -1 || array < rest.indexOf('\n', array))) {
    const nextKey = rest.slice(0, array).search(/\n\s+\w+:\s/)
    if (nextKey === -1) return stripComments(rest.slice(0, array))
  }
  return stripComments(rest.slice(0, line === -1 ? undefined : line))
}

/** Line comments, gone: prose about a class is not the class. */
function stripComments(source: string): string {
  return source.split('\n').filter(l => !l.trim().startsWith('//')).join('\n')
}

describe('tag width caps', () => {
  it('no theme caps a tag slot at an absolute width', () => {
    const offenders: string[] = []

    for (const file of readdirSync(themeDir).filter(f => f.endsWith('.ts'))) {
      for (const [slot, value] of tagSlots(read(file))) {
        for (const cap of value.match(ABSOLUTE_CAP) ?? []) {
          offenders.push(`src/theme/${file}: ${slot} has ${cap}`)
        }
      }
    }

    expect(offenders, [
      'A tag width cap must be relative to the field, not an absolute length.',
      'See #342: `max-w-[180px]` ellipsised tags that had room to spare, because',
      'a constant knows nothing about the field width or what shares the row.'
    ].join('\n')).toEqual([])
  })

  for (const [file, slots] of Object.entries(TAG_SLOTS)) {
    describe(file, () => {
      const source = read(file)

      it('caps the tag as a share of the field', () => {
        const item = slotSource(source, slots.item)
        expect(item, `${slots.item} should cap at a percentage of the field`).toMatch(/max-w-\[\d+%\]/)
      })

      it('lets the tag shrink, or the cap does nothing', () => {
        const item = slotSource(source, slots.item)
        expect(item, [
          `${slots.item} needs \`min-w-0\`: a flex child will not shrink below its`,
          'content width without it, so `truncate` on the text never engages and',
          'the cap is inert while looking correct.'
        ].join('\n')).toContain('min-w-0')
      })

      it('truncates the label rather than the tag box', () => {
        const text = slotSource(source, slots.text)
        expect(text).toContain('truncate')
        expect(text, `${slots.text} needs \`min-w-0\` for the same reason as the item`).toContain('min-w-0')
      })

      it('keeps the delete control at full size', () => {
        const del = slotSource(source, slots.del)
        expect(del, [
          `${slots.del} needs \`shrink-0\`: the tag is now squeezable, and without`,
          'this the close button is what collapses first.'
        ].join('\n')).toContain('shrink-0')
      })
    })
  }
})
