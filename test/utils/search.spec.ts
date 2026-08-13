import { describe, it, expect, vi } from 'vitest'
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

  // The subset where one code point is also one grapheme cluster, so a run of N
  // is N characters. U+1F3FF is an emoji modifier: UAX #29 glues a run of bare
  // modifiers into a single cluster, so it is excluded wherever a test counts
  // retained characters.
  const ASTRAL_STANDALONE = ASTRAL.filter(char => char !== '\u{1F3FF}')

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

  describe('mark insertion', () => {
    function highlightRegions(value: string, indices: [number, number][]) {
      // A one-character term keeps `minTokenLength` at 1, so every region here is
      // long enough to be marked and the fixtures isolate the boundary logic.
      return highlight({ label: value, matches: [{ key: 'label', value, indices }] }, 'x', 'label')
    }

    it('never places a mark inside an astral character', () => {
      // The fixture from #362, reproduced from real fuse.js output: searching
      // "zployment 😀" against this label returns [[1, 13]], and 13 falls between
      // the surrogates of the second emoji.
      const value = 'deployment \u{1F600}\u{1F600} pipeline'
      const result = highlightRegions(value, [[1, 13]])

      expect(result).not.toMatch(LONE_SURROGATE)
      expect(result).toBe('d<mark>eployment \u{1F600}\u{1F600}</mark> pipeline')
    })

    it('snaps a region that starts inside an astral character', () => {
      const value = '\u{1F600}\u{1F600}abc'

      // Index 1 is the low half of the first emoji.
      expect(highlightRegions(value, [[1, 4]])).toBe('<mark>\u{1F600}\u{1F600}a</mark>bc')
    })

    it('snaps the boundaries real fuse.js reports, not only recorded ones', () => {
      // Every other fixture here is a recorded copy of fuse output. A recording
      // cannot notice when an upgrade stops producing those offsets, and a
      // fixture that no longer straddles a character passes without exercising
      // anything. Drive the real library instead, at the options ContentSearch
      // ships (`ContentSearch.vue`), and assert the offsets it returns — so that
      // upgrade fails here loudly rather than going quiet.
      //
      // Well-formed input on both sides: the user searched with the wrong emoji.
      const label = 'deployment \u{1F600} pipeline'
      const fuse = new Fuse([{ label }], { ignoreLocation: true, includeMatches: true, threshold: 0.1, keys: ['label'] })
      const matches = fuse.search('deployment \u{1F680}')[0]?.matches

      // 12 is the low half of the emoji, so the first region's exclusive end
      // falls inside it.
      expect(matches?.[0]?.indices).toEqual([[0, 11], [13, 13]])

      const result = highlight({ label, matches: [...matches!] }, 'deployment \u{1F680}', 'label', undefined, true)

      expect(result).not.toMatch(LONE_SURROGATE)
      expect(result).toBe('<mark>deployment \u{1F600}</mark> pipeline')
    })

    it('does not duplicate text when adjacent regions meet inside one character', () => {
      // Both boundaries land on index 2, the low half of the emoji: the first
      // region's end snaps forward and the second region's start snaps back, so
      // without clamping they cross and `substring()` silently swaps its
      // arguments, emitting the overlap twice.
      const value = 'a\u{1F600}b'
      const result = highlightRegions(value, [[0, 1], [2, 3]])

      expect(result).not.toMatch(LONE_SURROGATE)
      expect(result?.replace(/<\/?mark>/g, '')).toBe(value)
    })

    it('drops the mark when a preceding region snaps past this one', () => {
      // The first region is too short to be marked, but its end still snaps
      // forward off the family emoji — past the second region's start. The
      // clamps then leave nothing between `start` and `end`, and emitting the
      // tags around that produced a bare `<mark></mark>` with the highlight lost
      // entirely. Found by review of the first revision of this PR.
      const value = '\u{1F468}‍\u{1F469}‍\u{1F467}tail'
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 1], [2, 7]] }] }, 'xxxxx', 'label')

      expect(result).not.toContain('<mark></mark>')
      expect(result).toBe(value)
    })

    it('ignores a region that lies past the end of the value', () => {
      // `substring()` clamps its own arguments, so a region beyond the value
      // slices to nothing while still comparing as non-empty. That emitted a bare
      // `<mark></mark>`, froze the cursor past every later region, and the empty
      // mark then drove truncation into eating the text before it.
      // A single region, so ordering cannot mask it: sorting moves an
      // out-of-range region to the end, where it does no harm.
      const value = 'The quarterly revenue report is available'
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[126, 132]] }] }, 'abc', 'label')

      expect(result).not.toContain('<mark>')
      expect(result).toBe(value)
    })

    it('orders regions before snapping, whatever order they arrive in', () => {
      // Fuse sorts and merges `indices` itself, so this never varies on the search
      // path — but `highlight()` is a published export and `postFilter` lets a
      // caller supply its own matches. Unordered, the clamps swallow every region
      // that arrives after a later one.
      const value = 'alpha beta gamma'
      const ordered = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 4], [11, 15]] }] }, 'aaa', 'label')
      const reversed = highlight({ label: value, matches: [{ key: 'label', value, indices: [[11, 15], [0, 4]] }] }, 'aaa', 'label')

      expect(ordered).toBe('<mark>alpha</mark> beta <mark>gamma</mark>')
      expect(reversed).toBe(ordered)
    })

    it('does not duplicate text when a region is nested inside an earlier one', () => {
      // `[1, 2]` lies wholly inside `[0, 5]`, so its end falls *behind* the
      // cursor the previous region left — and `substring()` swaps arguments it
      // finds reversed rather than returning empty, so the overlap is emitted
      // once for the gap slice, once for the region slice, and a third time by
      // the tail after the cursor rewinds: `<mark>abcdef</mark>defdefgh`.
      //
      // Plain ASCII on purpose. This is the clamp of `end` against `start`, not
      // the cluster snap; every other fixture in this file reaches it only
      // through a cluster, which is why the clamp could be deleted outright with
      // the whole suite still green.
      const value = 'abcdefgh'
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 5], [1, 2]] }] }, 'abc', 'label')

      expect(result).toBe('<mark>abcdef</mark>gh')
    })

    it('marks the longer of two regions that share a start', () => {
      // A tie on `region[0]` is broken by length, longest first. Shortest-first,
      // the clamps cut the longer region down to whatever the shorter one left
      // and emit the remainder as a second mark — `<mark>alp</mark><mark>ha
      // beta</mark>`, the same characters split across two highlights.
      const value = 'alpha beta gamma'
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 2], [0, 9]] }] }, 'abc', 'label')

      expect(result).toBe('<mark>alpha beta</mark> gamma')
    })

    it('drops a region whose bounds are not integers', () => {
      // Fuse only ever reports integer offsets; `postFilter` is under no such
      // obligation. `NaN` compares false against everything — `end > start`
      // included, so no mark is emitted and nothing looks wrong — and then lands
      // in the cursor, where `substring(NaN)` reads as `substring(0)` and repeats
      // the entire value after the part already written. `Infinity` clamps to the
      // end of the value and marks all of it.
      const value = 'alpha beta gamma'

      function withExtra(extra: [number, number]) {
        return highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 4], extra] }] }, 'alpha', 'label')
      }

      expect(withExtra([Number.NaN, Number.NaN])).toBe('<mark>alpha</mark> beta gamma')
      expect(withExtra([6, Number.POSITIVE_INFINITY])).toBe('<mark>alpha</mark> beta gamma')
      expect(withExtra([6.5, 9.5])).toBe('<mark>alpha</mark> beta gamma')
    })

    it('skips a region covering a single code unit', () => {
      // Upstream's rule, kept verbatim: a one-unit region is dropped before any
      // of the boundary logic runs. It is the reason a lone surrogate index can
      // never reach the snapper as `region[0] === region[1]`.
      const value = 'alpha beta'

      expect(highlight({ label: value, matches: [{ key: 'label', value, indices: [[2, 2]] }] }, 'a', 'label')).toBe(value)
    })

    it.each(ASTRAL)('wraps %s wholly, wherever the region boundary falls', (astral) => {
      const value = `${astral.repeat(3)}tail`

      // Every code-unit offset across the astral run, including the three that
      // split a pair.
      const results = Array.from({ length: 7 }, (_, end) => highlightRegions(value, [[0, end]]))

      expect(results.filter(result => LONE_SURROGATE.test(result ?? ''))).toEqual([])
      expect(results.map(result => result?.replace(/<\/?mark>/g, ''))).toEqual(Array.from({ length: 7 }, () => value))
    })
  })

  describe('grapheme clusters', () => {
    // Cutting a cluster is worse than cutting a surrogate pair: the result is a
    // *different* visible character rather than a broken one, so nothing signals
    // that anything was lost.
    const CLUSTERS: [string, string][] = [
      ['a flag', '\u{1F1FA}\u{1F1F8}'],
      ['a ZWJ family', '\u{1F468}‍\u{1F469}‍\u{1F467}'],
      ['an emoji with a skin-tone modifier', '\u{1F44D}\u{1F3FF}'],
      ['a Devanagari consonant with a vowel sign', 'कि'],
      ['a combining accent', 'é']
    ]

    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })

    function highlightAfter(cluster: string, count: number) {
      const value = cluster.repeat(count) + 'match'
      const index = value.indexOf('match')

      return highlight({ label: value, matches: [{ key: 'label', value, indices: [[index, index + 4]] }] }, 'match', 'label') ?? ''
    }

    it('never places a mark inside a cluster from the left either', () => {
      // The mirror of the case below. Every other exhaustive fixture moves the
      // *right* boundary, so a regression that dropped the start snap alone
      // would show up in one non-parametrised test on a plain surrogate pair —
      // never on a multi-code-point cluster. Offset 2 is between the two
      // regional indicators of the first flag.
      const value = `${'\u{1F1FA}\u{1F1F8}'.repeat(3)}tail`
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[2, 11]] }] }, 'x', 'label')

      expect(result).toBe(`<mark>${'\u{1F1FA}\u{1F1F8}'.repeat(3)}</mark>tail`)
    })

    // 20 repetitions: the truncation budget saturates at 13 characters, so every
    // fixture here is long enough to force a cut with room to spare, and the
    // sweep starts below it to cover the un-truncated cases too.
    it.each(CLUSTERS)('never truncates inside %s', (_name, cluster) => {
      for (let count = 1; count <= 20; count++) {
        const kept = highlightAfter(cluster, count)
          .replace(/^\.\.\./, '')
          .replace('<mark>match</mark>', '')

        // Re-segmenting what survived must yield whole copies of the fixture and
        // nothing else — a fragment would segment into something different.
        expect([...segmenter.segment(kept)].map(entry => entry.segment).filter(entry => entry !== cluster)).toEqual([])
      }
    })

    it('does not let a truncated flag re-pair into a different country', () => {
      // A flag is two regional indicators. Dropping one shifts the whole run by a
      // code point, so every following pair re-pairs — 🇺🇸🇺🇸… becomes 🇸🇺🇸🇺…,
      // a different country, with nothing to signal the loss. This is the case
      // that motivated #364.
      //
      // Asserted on the first retained cluster rather than with `toContain`: a
      // correct run of 🇺🇸🇺🇸 does contain the code units of 🇸🇺 between its
      // flags, since `String.includes` knows nothing about cluster boundaries.
      const flag = '\u{1F1FA}\u{1F1F8}'
      const kept = highlightAfter(flag, 20).replace(/^\.\.\./, '').replace('<mark>match</mark>', '')

      expect([...segmenter.segment(kept)][0]?.segment).toBe(flag)
    })

    it('never places a mark inside a cluster', () => {
      // Offset 2 sits between the two regional indicators of the first flag.
      const value = `${'\u{1F1FA}\u{1F1F8}'.repeat(3)}tail`
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 1]] }] }, 'x', 'label')

      expect(result).toBe(`<mark>\u{1F1FA}\u{1F1F8}</mark>${'\u{1F1FA}\u{1F1F8}'.repeat(2)}tail`)
    })

    it('keeps CRLF together — the one cluster below the fast-path floor', () => {
      // The `< U+0300` screen sends a boundary between two low characters
      // straight past the segmenter, which is right for every pair below the
      // floor but this one: UAX #29 keeps CR LF together. So the carve-out is
      // the only cluster rule in the file that `Intl.Segmenter` never gets to
      // enforce, and nothing else here reaches it — remove it and the mark
      // closes after the CR, splitting the pair.
      const value = 'a\r\nb'
      const result = highlight({ label: value, matches: [{ key: 'label', value, indices: [[0, 1]] }] }, 'x', 'label')

      expect(result).toBe('<mark>a\r\n</mark>b')
    })

    it('leaves a bare run of emoji modifiers whole — UAX #29 makes it one cluster', () => {
      // Not a realistic label, but it pins the behaviour that made the earlier
      // fixture wrong: 20 bare U+1F3FF are one character, not twenty, so the
      // budget cannot fit any of it and the whole run is dropped.
      expect(highlightAfter('\u{1F3FF}', 20)).toBe('...<mark>match</mark>')
    })
  })

  describe('degraded paths', () => {
    // Both branches below skip the segmenter and fall back to the surrogate-pair
    // check alone. Without these cases that check — and the four surrogate range
    // constants behind it — are unreachable from the suite: every runtime under
    // test ships `Intl.Segmenter`, and no other fixture comes near the length
    // ceiling. Eight off-by-one mutations of those constants survived the whole
    // file before this block existed.
    const GRAPHEME_SNAP_MAX_LENGTH = 8192
    const FLAG = '\u{1F1FA}\u{1F1F8}'

    // What the ceiling is measured against is the *marked-up* string, not the
    // value: truncation runs on `content`, after the tags are inserted, so it is
    // 13 characters longer. A fixture sized against `value.length` sits under the
    // ceiling and degrades anyway.
    const MARKUP = '<mark></mark>'.length

    // Captured before the stub below replaces the global, since this helper has
    // to keep segmenting while the module under test cannot.
    const RealSegmenter = Intl.Segmenter

    function firstCluster(result: string) {
      const kept = result.replace(/^\.\.\./, '').replace('<mark>match</mark>', '')

      return [...new RealSegmenter(undefined, { granularity: 'grapheme' }).segment(kept)][0]?.segment
    }

    function matchAfter(value: string) {
      const index = value.indexOf('match')

      return { label: value, matches: [{ key: 'label', value, indices: [[index, index + 4]] as [number, number][] }] }
    }

    it('keeps surrogate pairs whole when `Intl.Segmenter` is missing', async () => {
      // The segmenter is resolved once and cached, so the stub only takes effect
      // on a freshly imported module.
      vi.stubGlobal('Intl', new Proxy(Intl, {
        get: (target, property) => property === 'Segmenter' ? undefined : Reflect.get(target, property)
      }))
      vi.resetModules()

      try {
        const { highlight: degraded } = await import('../../src/runtime/utils/search')

        // Mark insertion, not truncation, is what exercises the surrogate check
        // here: the truncation loop walks by code point via `Array.from`, so its
        // cut index is aligned by construction and can never split a pair. Fuse's
        // `indices` carry no such guarantee, and index 1 below is the low half of
        // the first character. Each fixture also pins one corner of the four
        // surrogate range constants — U+10000 and U+20000 encode a low surrogate
        // of U+DC00, U+10FFFF and U+1F3FF one of U+DFFF, and U+10FFFF a high
        // surrogate of U+DBFF.
        const marked = ASTRAL.map((astral) => {
          const value = `${astral.repeat(2)}x`

          return degraded({ label: value, matches: [{ key: 'label', value, indices: [[1, 3]] }] }, 'x', 'label') ?? ''
        })

        expect(marked.filter(result => LONE_SURROGATE.test(result))).toEqual([])
        expect(marked).toEqual(ASTRAL.map(astral => `<mark>${astral.repeat(2)}</mark>x`))

        const results = ASTRAL.map(astral => degraded(matchAfter(`${astral.repeat(20)}match`), 'match', 'label') ?? '')

        expect(results.filter(result => LONE_SURROGATE.test(result))).toEqual([])
        expect(results.every(result => result.includes('<mark>match</mark>'))).toBe(true)

        // And the documented cost of the fallback: clusters are no longer whole.
        // It is every multi-code-point cluster that loses protection here, not
        // only flags.
        expect(firstCluster(degraded(matchAfter(`${FLAG.repeat(20)}match`), 'match', 'label') ?? '')).not.toBe(FLAG)

        // The four constants above are pinned only in the narrowing direction:
        // every fixture so far is a *real* pair, so shrinking a range stops it
        // being recognised and fails, while widening one changes nothing. What
        // widening breaks is the opposite input — two units that are not a pair
        // — which only malformed UTF-16 has, and which reaches `highlight()`
        // through any label built from a byte-truncated field. Each fixture
        // widens exactly one bound if the boundary at index 1 is snapped:
        // two low surrogates for `HIGH_SURROGATE_END`, two high ones for
        // `LOW_SURROGATE_START`, a BMP character before a lone low surrogate
        // for `HIGH_SURROGATE_START`, and a lone high surrogate before a
        // private-use character for `LOW_SURROGATE_END`.
        const unpaired = ['\uDC00\uDC01', '\uD800\uDB00', '\uD700\uDC00', '\uD800\uE000']

        expect(unpaired.map((prefix) => {
          const value = `${prefix}zz`

          return degraded({ label: value, matches: [{ key: 'label', value, indices: [[1, 2]] }] }, 'x', 'label')
        })).toEqual(unpaired.map(prefix => `${prefix[0]}<mark>${prefix[1]}z</mark>z`))
      } finally {
        vi.unstubAllGlobals()
        vi.resetModules()
      }
    })

    it('skips the segmenter one character past the length ceiling', () => {
      const value = `${'a'.repeat(GRAPHEME_SNAP_MAX_LENGTH - 57)}${FLAG.repeat(10)}match`
      const result = highlight(matchAfter(value), 'match', 'label') ?? ''

      expect(value.length + MARKUP).toBe(GRAPHEME_SNAP_MAX_LENGTH + 1)

      // The surrogate fallback still holds — that is the whole point of the
      // degradation being partial.
      expect(result).not.toMatch(LONE_SURROGATE)

      // And the documented cost: the flag re-pairs. Raise the ceiling by one and
      // the segmenter runs here, making this assertion fail.
      expect(firstCluster(result)).not.toBe(FLAG)
    })

    it('snaps clusters exactly at the ceiling', () => {
      // The mirror of the case above, one character shorter, so the pair fences
      // the constant to a single value: lower it by one and this fails, raise it
      // by one and the other does.
      const value = `${'a'.repeat(GRAPHEME_SNAP_MAX_LENGTH - 58)}${FLAG.repeat(10)}match`
      const result = highlight(matchAfter(value), 'match', 'label') ?? ''

      expect(value.length + MARKUP).toBe(GRAPHEME_SNAP_MAX_LENGTH)
      expect(firstCluster(result)).toBe(FLAG)
    })
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

    it.each(ASTRAL_STANDALONE)('never splits %s, at any truncation boundary', (astral) => {
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

    it.each(ASTRAL_STANDALONE)('keeps %s before the match intact, truncating to the budget', (astral) => {
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
