import { describe, it, expect } from 'vitest'
import { highlight, sanitizeSnippet } from '../../src/runtime/utils/search'

describe('sanitizeSnippet', () => {
  it('preserves <mark> highlights', () => {
    expect(sanitizeSnippet('foo <mark>bar</mark> baz')).toBe('foo <mark>bar</mark> baz')
  })

  it('escapes other tags so they cannot be interpreted as HTML', () => {
    expect(sanitizeSnippet('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;')
  })

  it('escapes script tags even when mixed with mark highlights', () => {
    expect(sanitizeSnippet('<mark>hit</mark> <script>x</script>'))
      .toBe('<mark>hit</mark> &lt;script&gt;x&lt;/script&gt;')
  })

  it('escapes HTML-special characters', () => {
    expect(sanitizeSnippet(`5 < 10 & "quoted" 'value'`))
      .toBe('5 &lt; 10 &amp; &quot;quoted&quot; &#39;value&#39;')
  })

  it('does not double-escape the mark tag itself', () => {
    expect(sanitizeSnippet('<mark><b>x</b></mark>'))
      .toBe('<mark>&lt;b&gt;x&lt;/b&gt;</mark>')
  })

  it('handles empty input', () => {
    expect(sanitizeSnippet('')).toBe('')
  })
})

describe('highlight', () => {
  it('escapes an injected tag in the unmatched tail while keeping the match highlighted', () => {
    const value = 'zzzzz &<img src=x onerror=alert(1)>'
    const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 4]] }] }, 'zzzzz', 'label')

    expect(result).toContain('<mark>zzzzz</mark>')
    expect(result).not.toContain('<img')
    expect(result).toContain('&lt;img')
    expect(result).toContain('&amp;')
  })

  it('escapes payloads that contain a pre-existing HTML entity (regression: sanitize bypass)', () => {
    const value = '&amp;<img src=x onerror=alert(1)>'
    const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [] }] }, 'x', 'label')

    expect(result).not.toContain('<img')
    expect(result).toBe('&amp;amp;&lt;img src=x onerror=alert(1)&gt;')
  })

  it('escapes HTML-special characters around the highlighted region', () => {
    const value = `match < & "a" 'b'`
    const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 4]] }] }, 'match', 'label')

    expect(result).toBe(`<mark>match</mark> &lt; &amp; &quot;a&quot; &#39;b&#39;`)
  })

  it('returns undefined when there are no matches', () => {
    expect(highlight({ label: 'foo', matches: [] }, 'foo', 'label')).toBeUndefined()
    expect(highlight({ label: 'foo' }, 'foo', 'label')).toBeUndefined()
  })

  describe('useTokenSearch', () => {
    // b24ui-only fifth argument (see `.sync/PORTING.md` §2). It only moves
    // `minTokenLength`, the threshold a region must reach to be marked at all:
    // off, that is the length of the whole search term; on, the length of the
    // shortest word in it — so multi-word queries highlight each word instead of
    // nothing.
    function highlightWith(value: string, indices: [number, number][], searchTerm: string, useTokenSearch?: boolean) {
      return highlight({ label: value, matches: [{ key: 'label', value, indices }] }, searchTerm, 'label', undefined, useTokenSearch)
    }

    it('marks a region shorter than the whole term', () => {
      // The region is 5 long. `alpha beta` is 10, so the full-term threshold
      // rejects it; the shortest token, `beta`, is 4, so token search accepts it.
      expect(highlightWith('alpha beta', [[0, 4]], 'alpha beta', true)).toBe('<mark>alpha</mark> beta')
    })

    it('leaves that same region unmarked when off', () => {
      expect(highlightWith('alpha beta', [[0, 4]], 'alpha beta', false)).toBe('alpha beta')
    })

    it('is off by default — the path `CommandPalette` takes unless `fuseOptions` opts in', () => {
      expect(highlightWith('alpha beta', [[0, 4]], 'alpha beta')).toBe('alpha beta')
    })

    it('still refuses a region shorter than the shortest token', () => {
      // `be` is 2; the shortest token `beta` is 4. Token search lowers the bar,
      // it does not remove it.
      expect(highlightWith('alpha beta', [[6, 7]], 'alpha beta', true)).toBe('alpha beta')
    })

    it('falls back to the whole term when the tokenizer matches nothing', () => {
      // `/[\p{L}\p{M}\p{N}_]+/gu` finds no token in an emoji-only query, so
      // `tokens` is empty and the threshold stays `searchTerm.length` — 2 code
      // units for one emoji — rather than collapsing to zero and marking
      // everything.
      expect(highlightWith('\u{1F600}\u{1F600}\u{1F600}', [[0, 1]], '\u{1F600}', true))
        .toBe('<mark>\u{1F600}</mark>\u{1F600}\u{1F600}')
    })

    it('takes the shortest token, not the first or the longest', () => {
      // Tokens are `considerable` (12) and `ab` (2); only a 2-long threshold
      // admits this region.
      expect(highlightWith('xy considerable', [[0, 1]], 'considerable ab', true)).toBe('<mark>xy</mark> considerable')
    })
  })

  describe('truncation from the start', () => {
    // Matches a high surrogate not followed by a low one, or a low surrogate not
    // preceded by a high one — i.e. half of an astral character.
    const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/

    // `maxLength` counts the tag characters that the counter inside
    // `truncateHTMLFromStart` skips, so the two cancel and the surviving prefix is
    // always `'<mark>'.length + '</mark>'.length` characters — whatever the match
    // is, and whether the content is BMP or astral.
    const RETAINED = '<mark>'.length + '</mark>'.length

    // One character from each corner of the surrogate ranges. A fixture built only
    // from characters sitting comfortably inside them hides an implementation whose
    // range bounds are off by one: U+20000 encodes to a low surrogate of U+DC00 and
    // U+1F3FF to U+DFFF — the two edges — while U+1F600 sits between them.
    const ASTRAL = ['\u{10000}', '\u{10FFFF}', '\u{1F600}', '\u{1F3FF}', '\u{20000}']

    function highlightAfterFiller(filler: string, count: number) {
      const value = filler.repeat(count) + 'match'
      const index = value.indexOf('match')

      return highlight({ label: value, matches: [{ key: 'label', value, indices: [[index, index + 4]] }] }, 'match', 'label')
    }

    it.each(ASTRAL)('never splits %s, at any truncation boundary', (astral) => {
      // Truncating by UTF-16 code unit sliced the pair in half whenever the
      // boundary landed between its surrogates — from 7 characters onward, and
      // every length after that.
      const results = Array.from({ length: 40 }, (_, i) => highlightAfterFiller(astral, i + 1))

      // Count what survived rather than only scanning for lone surrogates: an
      // implementation that deletes every astral character emits none either, and
      // would otherwise pass a test named "never splits an astral character". This
      // also fails on a `highlight()` that returns `undefined` throughout, which an
      // empty-string coalesce would have hidden.
      expect(results.map(result => (result ?? '').split(astral).length - 1))
        .toEqual(Array.from({ length: 40 }, (_, i) => Math.min(i + 1, RETAINED)))

      expect(results.filter(result => LONE_SURROGATE.test(result ?? ''))).toEqual([])
    })

    it.each(ASTRAL)('keeps %s before the match intact, truncating to the budget', (astral) => {
      // Pinned exactly: counting by code unit kept six characters and half of a
      // seventh here, and a "fix" that stopped truncating astral content entirely
      // would keep all 20.
      expect(highlightAfterFiller(astral, 20)).toBe(`...${astral.repeat(RETAINED)}<mark>match</mark>`)
    })

    it('truncates a long BMP prefix to the same budget', () => {
      expect(highlightAfterFiller('a', 50)).toBe(`...${'a'.repeat(RETAINED)}<mark>match</mark>`)
    })

    it('measures the budget in code points when astral content follows the match', () => {
      // Guards the caller's half of the fix. Sizing the budget in UTF-16 units
      // while the counter inside `truncateHTMLFromStart` counts code points would
      // keep 23 leading characters here instead of 13.
      const value = `${'b'.repeat(40)}match${'\u{1F600}'.repeat(10)}`
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[40, 44]] }] }, 'match', 'label')

      expect(result).toBe(`...${'b'.repeat(RETAINED)}<mark>match</mark>${'\u{1F600}'.repeat(10)}`)
    })
  })
})
