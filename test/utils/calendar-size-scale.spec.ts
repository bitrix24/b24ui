import { describe, it, expect } from 'vitest'
import theme from '../../src/theme/calendar'

/**
 * `Calendar` sizes its cell trigger from two maps that the theme spreads into
 * `compoundVariants` — one for the day grid, one for the month/year pickers.
 * Neither is reachable from the `size` variant, so the two can disagree with it
 * and with each other in silence.
 *
 * They did. `xs` and `sm` were both `size-7`/`h-7`, so `size="xs"` rendered
 * exactly `sm` — the prop was accepted, documented and inert (nuxt/ui#6832).
 * And `lg` carried its own `text-…` on the trigger, duplicating the font size
 * the `size` variant already sets on `cell`, which is how the month/year
 * pickers ended up rendering `lg` at the `md` font size.
 *
 * Snapshots do not cover this. `Calendar.spec.ts` renders the day view only, so
 * the picker map has no snapshot at all, and a duplicate step produces two
 * identical snapshots rather than a failure.
 */

/** `compoundVariants` entries that carry a `cellTrigger`, by size, per view. */
function triggers(matches: (view: unknown) => boolean): Map<string, string> {
  return new Map(
    (theme.compoundVariants as Array<Record<string, any>>)
      .filter(variant => variant.size && matches(variant.view) && typeof variant.class?.cellTrigger === 'string')
      .map(variant => [variant.size as string, variant.class.cellTrigger as string])
  )
}

const daySizes = triggers(view => view === 'day')
const pickerSizes = triggers(view => Array.isArray(view))

const sizeKeys = Object.keys(theme.variants.size).sort()

const MAPS = [
  ['day grid', daySizes],
  ['month/year picker', pickerSizes]
] as const

describe('Calendar size scale', () => {
  it('reads both maps out of the theme', () => {
    // Every assertion below is vacuous if the `compoundVariants` shape changes
    // and these come back empty.
    expect(sizeKeys.length).toBeGreaterThan(2)
    expect(daySizes.size).toBeGreaterThan(2)
    expect(pickerSizes.size).toBeGreaterThan(2)
  })

  it.each(MAPS)('%s covers exactly the declared sizes', (_label, map) => {
    // A size in the variant but not the map renders with no dimensions at all;
    // one in the map but not the variant is unreachable.
    expect([...map.keys()].sort()).toEqual(sizeKeys)
  })

  it.each(MAPS)('%s gives every size a distinct step', (_label, map) => {
    const byClass = new Map<string, string[]>()
    for (const [size, classes] of map) {
      byClass.set(classes, [...(byClass.get(classes) ?? []), size])
    }

    // Named rather than counted — the failure has to say which two sizes
    // collapsed into one.
    const collisions = [...byClass.entries()]
      .filter(([, sizes]) => sizes.length > 1)
      .map(([classes, sizes]) => `${sizes.sort().join(' == ')}: ${classes}`)
      .sort()

    expect(collisions).toEqual([])
  })

  it.each(MAPS)('%s leaves font size to the `size` variant', (_label, map) => {
    // The trigger is nested inside `cell`, which the `size` variant already
    // sizes. A `text-…` here overrides it for one view and not the other.
    const withText = [...map.entries()]
      .filter(([, classes]) => /(?:^|\s)text-/.test(classes))
      .map(([size, classes]) => `${size}: ${classes}`)
      .sort()

    expect(withText).toEqual([])
  })

  it('sizes `cell` for every declared size, since the trigger no longer does', () => {
    const missing = sizeKeys
      .filter(size => !/(?:^|\s)text-/.test((theme.variants.size as Record<string, any>)[size]?.cell ?? ''))
      .sort()

    expect(missing).toEqual([])
  })
})
