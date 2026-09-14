import { describe, it, expect } from 'vitest'
import { getEstimateSize } from '../../src/runtime/utils/virtualizer'

/**
 * `getEstimateSize` feeds `@tanstack/vue-virtual`'s `estimateSize`, which is how
 * a virtualised `CommandPalette`, `InputMenu`, `Listbox` or `SelectMenu` decides
 * where each row sits before measuring it.
 *
 * The size it is handed is the component's `size` prop, and that prop is not
 * closed: a size added through `app.config.ts` reaches here as an ordinary
 * string. Indexing the lookup with one returned `undefined`, which the
 * virtualizer takes as a row height — every offset after it becomes `NaN` and
 * the list stops positioning. Hence the `md` fallback.
 *
 * There was no spec for this file at all before; upstream added theirs with the
 * fix and this is that file, plus the fork's own `xss` size.
 */

describe('getEstimateSize', () => {
  it('returns the height for each built-in size', () => {
    expect(getEstimateSize([{ label: 'foo' }], 'xs')(0)).toBe(24)
    expect(getEstimateSize([{ label: 'foo' }], 'xl')(0)).toBe(40)
  })

  // Ours alone — upstream has no `xss`, and the fallback would swallow it
  // silently if the entry were ever dropped from the lookup.
  it('returns the fork-only `xss` height rather than falling back', () => {
    expect(getEstimateSize([{ label: 'foo' }], 'xss')(0)).toBe(20)
    expect(getEstimateSize([{ label: 'foo', description: 'bar' }], 'xss', 'description')(0)).toBe(40)
  })

  it('falls back to the `md` size for a custom theme size', () => {
    expect(getEstimateSize([{ label: 'foo' }], 'xxs')(0)).toBe(32)
  })

  it('falls back to the `md` size for a custom theme size with a description', () => {
    const items = [{ label: 'foo', description: 'bar' }]

    expect(getEstimateSize(items, 'xxs', 'description')(0)).toBe(52)
    expect(getEstimateSize(items, 'xxs', undefined, true)(0)).toBe(52)
  })

  it('uses the larger size only for items that have a description', () => {
    const items = [{ label: 'foo', description: 'bar' }, { label: 'baz' }]
    const estimateSize = getEstimateSize(items, 'md', 'description')

    expect(estimateSize(0)).toBe(52)
    expect(estimateSize(1)).toBe(32)
  })
})
