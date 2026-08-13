import { describe, it, expect } from 'vitest'
import Fuse from 'fuse.js'
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
  // Matches a high surrogate not followed by a low one, or a low surrogate not
  // preceded by a high one — i.e. half of an astral character.
  const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/

  // One character from each corner of the surrogate ranges. A fixture built only
  // from characters sitting comfortably inside them hides an implementation whose
  // range bounds are off by one: U+20000 encodes to a low surrogate of U+DC00 and
  // U+1F3FF to U+DFFF — the two edges — while U+1F600 sits between them.
  const ASTRAL = ['\u{10000}', '\u{10FFFF}', '\u{1F600}', '\u{1F3FF}', '\u{20000}']

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

  describe('truncation from the start', () => {
    // `maxLength` counts the tag characters that the counter inside
    // `truncateHTMLFromStart` skips, so the two cancel and the surviving prefix is
    // always `'<mark>'.length + '</mark>'.length` characters — whatever the match
    // is, and whether the content is BMP or astral.
    const RETAINED = '<mark>'.length + '</mark>'.length

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

  describe('insertion boundaries', () => {
    // Fuse's `indices` are UTF-16 code-unit offsets, so a region boundary can
    // land between the surrogates of an astral character. The `<mark>` must
    // snap outward to cover the whole character instead of splitting it.

    it('closes the mark after the whole character when the region ends inside it', () => {
      // a b c d e \uD83D \uDE00 x y z — the region's exclusive end (6) points
      // at the low surrogate.
      const value = 'abcde\u{1F600}xyz'
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 4]] }] }, 'abcde', 'label')

      expect(result).toBe('<mark>abcde</mark>\u{1F600}xyz')

      const split = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 5]] }] }, 'abcde', 'label')

      expect(split).toBe('<mark>abcde\u{1F600}</mark>xyz')
      expect(LONE_SURROGATE.test(split ?? '')).toBe(false)
    })

    it('opens the mark before the whole character when the region starts inside it', () => {
      // a b c \uD83D \uDE00 d e f — the region start (4) points at the low
      // surrogate.
      const value = 'abc\u{1F600}def'
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[4, 6]] }] }, 'def', 'label')

      expect(result).toBe('abc<mark>\u{1F600}de</mark>f')
      expect(LONE_SURROGATE.test(result ?? '')).toBe(false)
    })

    it.each(ASTRAL)('snaps both boundaries when each lands inside %s', (astral) => {
      // a b <hi lo> c d <hi lo> e f — start (3) and exclusive end (7) each
      // point at a low surrogate.
      const value = `ab${astral}cd${astral}ef`
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[3, 6]] }] }, 'abcd', 'label')

      expect(result).toBe(`ab<mark>${astral}cd${astral}</mark>ef`)
      expect(LONE_SURROGATE.test(result ?? '')).toBe(false)
    })

    it('skips a region covering a single astral character, like a single BMP one', () => {
      const value = 'ab\u{1F600}cd'

      // [1, 1] is one BMP character and was always skipped; [2, 3] is one astral
      // character — two code units, but still a single-character region.
      expect(highlight({ label: value, matches: [{ key: 'label', value, indices: [[1, 1]] }] }, 'b', 'label')).toBe(value)
      expect(highlight({ label: value, matches: [{ key: 'label', value, indices: [[2, 3]] }] }, 'b', 'label')).toBe(value)
    })

    it.each(ASTRAL)('keeps every %s intact wherever the region boundary lands', (astral) => {
      const value = astral.repeat(5)

      for (let end = 0; end < value.length; end++) {
        const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, end]] }] }, 'aa', 'label') ?? ''

        // Count what survived, not only lone surrogates: deleting the split
        // character would otherwise pass.
        expect(result.split(astral).length - 1).toBe(5)
        expect(LONE_SURROGATE.test(result)).toBe(false)
      }
    })

    it('drops a region lying past the end of the value instead of emitting an empty mark', () => {
      // `highlight()` is a published export and `CommandPaletteGroup.postFilter`
      // lets a caller supply its own matches, so offsets computed against an
      // older revision of the text can point past its end. `substring` clamps
      // its arguments, so such a region sliced to nothing and emitted a bare
      // `<mark></mark>` — and pushed the next-region cursor past the end,
      // collapsing every legitimate region after it.
      const value = 'The quarterly revenue report is available'
      const outOfRange = highlight({ label: value, matches: [{ key: 'label', value, indices: [[126, 132]] }] }, 'report', 'label')

      expect(outOfRange).toBe(value)

      const afterValid = highlight({ label: value, matches: [{ key: 'label', value, indices: [[4, 12], [126, 132]] }] }, 'quarterly', 'label')

      expect(afterValid).toBe('The <mark>quarterly</mark> revenue report is available')

      // A region straddling the end keeps its in-range half; the usual
      // 13-character retained window applies in front of the mark.
      const straddling = highlight({ label: value, matches: [{ key: 'label', value, indices: [[32, 132]] }] }, 'available', 'label')

      expect(straddling).toBe('...ue report is <mark>available</mark>')
    })

    it('does not split characters at the boundaries fuse reports (repro from #362)', () => {
      // Real fuse.js at ContentSearch's shipped defaults, with well-formed input
      // on both sides: the user searched with the wrong emoji.
      const label = 'deployment \u{1F600} pipeline'
      const fuse = new Fuse([{ label }], { ignoreLocation: true, includeMatches: true, threshold: 0.1, keys: ['label'] })
      const matches = fuse.search('deployment \u{1F680}')[0]?.matches

      // Pin fuse's offsets: the first region's exclusive end (12) falls between
      // the surrogates of the emoji. If a fuse upgrade stops producing a
      // mid-pair boundary, fail loudly here instead of passing vacuously.
      expect(matches?.[0]?.indices).toEqual([[0, 11], [13, 13]])

      const result = highlight({ label, matches: [...matches!] }, 'deployment \u{1F680}', 'label', undefined, true)

      expect(result).toBe('<mark>deployment \u{1F600}</mark> pipeline')
      expect(LONE_SURROGATE.test(result ?? '')).toBe(false)
    })
  })
})
