import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
// Same traversal the collision guard uses, so the two can never disagree about
// which files are part of the corpus.
import { SNAPSHOT_ROOT, snapshotFiles } from '../../scripts/indistinguishable-snapshots.mjs'

/**
 * An object-valued prop that reaches the DOM renders as
 * `nextmonth="[object Object]"` — Vue stringifying it as a fall-through
 * attribute.
 *
 * #477 is why this exists. `Calendar` forwards its props to the reka picker
 * root through `useForwardProps`, minus a hand-maintained `omittedProps` list.
 * Four button-config props were missing from that list, so each rendered as a
 * junk attribute on the root. It survived because nothing downstream could
 * see it: the props themselves worked, the calendar rendered correctly, and
 * the snapshot recorded the four attributes as expected output. `viewControl`
 * being in the list is the tell — the class of bug was known and one of five
 * was covered.
 *
 * The corpus held exactly these four, all in `Calendar`, and only `Calendar`
 * pairs `omittedProps` with `useForwardProps`, so this asserts an empty list
 * rather than pinning a baseline.
 */
describe('object props stringified into the DOM', () => {
  const hits = () => {
    const found: string[] = []

    for (const file of snapshotFiles()) {
      const body = readFileSync(join(SNAPSHOT_ROOT, file), 'utf8')
      for (const [, attribute] of body.matchAll(/([a-zA-Z-]+)="\[object Object\]"/g)) {
        found.push(`${file}: ${attribute}="[object Object]"`)
      }
    }

    return [...new Set(found)].sort()
  }

  it('reads the corpus before drawing conclusions from it', () => {
    // An empty glob would pass this file vacuously.
    expect(snapshotFiles().length).toBeGreaterThan(100)
  })

  it('leaks no object-valued prop as an attribute', () => {
    expect(hits()).toEqual([])
  })
})
