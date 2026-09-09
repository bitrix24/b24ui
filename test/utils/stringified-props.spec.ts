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
 * What this does NOT catch: the same leak with a scalar value. `arrow="true"`
 * is a prop reaching the root exactly the same way, and it is indistinguishable
 * from an intentional attribute by any text pattern. Two such leaks were in the
 * corpus when this guard was written (`DropdownMenuContent`'s `arrow`, and a
 * `NavigationMenu` case passing a prop the component does not declare) and this
 * pattern saw neither — they were found by reading the components, not by
 * running this. Both are fixed, but the blind spot is real: a green run here
 * means no object-valued leak, not no leak.
 *
 * It asserts an empty list rather than pinning a baseline because the corpus
 * holds none — every case that would produce one is fixed.
 */
describe('object props stringified into the DOM', () => {
  const scan = () => {
    const found: string[] = []

    for (const file of snapshotFiles()) {
      const body = readFileSync(join(SNAPSHOT_ROOT, file), 'utf8')
      for (const [, attribute] of body.matchAll(/([a-zA-Z-]+)="\[object Object\]"/g)) {
        found.push(`${file}: ${attribute}="[object Object]"`)
      }
    }

    return [...new Set(found)].sort()
  }

  // Read here rather than inside the `it()`, the way the collision guard beside
  // this one already does it. The corpus is 28 MB across 218 files: ~0.5s in
  // plain node, 1.9s in the `nuxt` project alone — 38% of vitest's 5s default
  // with no contention — and past it under a full run sharing forks with 346
  // other files. It timed out that way twice before the cause was pinned, once
  // reported as an unexplained single failure. Describe-body work is not
  // subject to the per-test timeout, so the scan happens once and the
  // assertions below are free.
  const found = scan()

  it('reads the corpus before drawing conclusions from it', () => {
    // An empty glob would pass this file vacuously.
    expect(snapshotFiles().length).toBeGreaterThan(100)
  })

  it('leaks no object-valued prop into the corpus as an attribute', () => {
    expect(found).toEqual([])
  })
})
