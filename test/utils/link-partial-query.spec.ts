import { describe, it, expect } from 'vitest'
import { isPartiallyEqual } from '../../src/runtime/utils/link'

/**
 * What `exactQuery: 'partial'` means for a link's active state.
 *
 * `Link` calls this with the link's own query and the current route's query, in
 * that order. The current route carries whatever else the app put in the URL —
 * a search term, a page number, a tracking parameter — and a link that declares
 * `?tab=general` should stay highlighted through all of it. So keys the second
 * object adds are ignored, and everything the link declares still has to match.
 *
 * Nothing exercised it before: `utils/link.ts` sat at 44% statements and 0%
 * branches, and the only visible symptom of it breaking is a navigation item
 * that highlights when it should not, or stops highlighting when it should.
 */
describe('isPartiallyEqual', () => {
  it('ignores keys the current route adds', () => {
    expect(isPartiallyEqual({ tab: 'general' }, { tab: 'general', page: '2', q: 'term' })).toBe(true)
  })

  it('refuses when a declared key holds a different value', () => {
    expect(isPartiallyEqual({ tab: 'general' }, { tab: 'billing', page: '2' })).toBe(false)
  })

  it('refuses when a declared key is missing from the route', () => {
    // The asymmetry that makes this "partial" rather than "subset either way":
    // extra keys on the right are forgiven, missing ones are not.
    expect(isPartiallyEqual({ tab: 'general' }, { page: '2' })).toBe(false)
  })

  it('matches two empty queries', () => {
    expect(isPartiallyEqual({}, {})).toBe(true)
  })

  it('matches an empty declaration against any route', () => {
    expect(isPartiallyEqual({}, { page: '2' })).toBe(true)
  })

  it('compares values rather than their string forms', () => {
    expect(isPartiallyEqual({ page: 2 }, { page: '2' })).toBe(false)
  })

  it('handles a repeated query parameter, which vue-router gives as an array', () => {
    expect(isPartiallyEqual({ tag: ['a', 'b'] }, { tag: ['a', 'b'], page: '2' })).toBe(true)
    expect(isPartiallyEqual({ tag: ['a', 'b'] }, { tag: ['a'], page: '2' })).toBe(false)
  })
})
