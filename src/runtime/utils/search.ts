import type { FuseResult, FuseResultMatch } from 'fuse.js'
import type { GetItemKeys } from '../types/utils'

const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;'
}

function escapeHTML(str: string): string {
  return str.replace(/[&<>"']/g, char => htmlEscapes[char]!)
}

const HIGH_SURROGATE_START = 0xD800
const HIGH_SURROGATE_END = 0xDBFF
const LOW_SURROGATE_START = 0xDC00
const LOW_SURROGATE_END = 0xDFFF

// Nothing below U+0300 can continue a grapheme cluster: the range holds no
// combining marks, no joiners, no surrogates and no regional indicators. CRLF is
// the one pair that lives there, and UAX #29 keeps it together. Screening on this
// keeps ASCII and Latin-1 boundaries — the overwhelming majority — from ever
// reaching the segmenter.
const CLUSTER_CONTINUATION_FLOOR = 0x0300
const CARRIAGE_RETURN = 0x000D
const LINE_FEED = 0x000A

// `Segments.containing()` scans, so its cost grows with the value: a few
// microseconds up to ~8k, two orders of magnitude worse at 100k. Search snippets
// are short. Past this length the grapheme snap is skipped and only the
// surrogate-pair snap applies: `�` is still prevented, but every
// multi-code-point cluster loses protection — flags, ZWJ sequences, combining
// marks alike — the same degradation as a runtime without `Intl.Segmenter`.
const GRAPHEME_SNAP_MAX_LENGTH = 8192

// True when `index` points at the low half of a surrogate pair — i.e. cutting
// the string there would slice an astral character in two.
function splitsSurrogatePair(value: string, index: number): boolean {
  if (index <= 0 || index >= value.length) {
    return false
  }

  const low = value.charCodeAt(index)

  if (low < LOW_SURROGATE_START || low > LOW_SURROGATE_END) {
    return false
  }

  const high = value.charCodeAt(index - 1)

  return high >= HIGH_SURROGATE_START && high <= HIGH_SURROGATE_END
}

let graphemeSegmenter: Intl.Segmenter | null | undefined

function getGraphemeSegmenter(): Intl.Segmenter | null {
  if (graphemeSegmenter === undefined) {
    graphemeSegmenter = typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function'
      // Grapheme segmentation does not vary by locale; leaving it undefined
      // avoids depending on whatever the host default happens to be.
      ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
      : null
  }

  return graphemeSegmenter
}

interface ClusterSpan {
  index: number
  length: number
}

/**
 * Moves string offsets off the middle of a character.
 *
 * Code points are not the unit a reader sees: a flag is two regional
 * indicators, a family emoji several code points joined by ZWJ, and `कि` a
 * consonant plus a vowel sign. Cutting inside one yields a *different* visible
 * character rather than a broken one — 🇺🇸 cut by one code point re-pairs into
 * 🇸🇺, a different country (#364) — so the cut has to move to a cluster edge.
 *
 * Bound to one `value` because segmenting it is the expensive part.
 * `Segments.containing()` is called once per boundary, and a value can carry
 * hundreds of match regions: rebuilding the segmenter view for each of them
 * cost 8.1 ms over 1600 boundaries, against 0.6 ms when it is built once.
 */
function createClusterSnapper(value: string) {
  // `null` once resolved to "no segmenter for this value"; `undefined` while
  // still unresolved, so a value that never needs snapping never builds one.
  let segments: Intl.Segments | null | undefined

  function straddling(index: number): ClusterSpan | undefined {
    if (index <= 0 || index >= value.length) {
      return undefined
    }

    const current = value.charCodeAt(index)
    const previous = value.charCodeAt(index - 1)

    if (current < CLUSTER_CONTINUATION_FLOOR && previous < CLUSTER_CONTINUATION_FLOOR) {
      return previous === CARRIAGE_RETURN && current === LINE_FEED
        ? { index: index - 1, length: 2 }
        : undefined
    }

    if (segments === undefined) {
      const segmenter = value.length <= GRAPHEME_SNAP_MAX_LENGTH ? getGraphemeSegmenter() : null

      segments = segmenter ? segmenter.segment(value) : null
    }

    if (!segments) {
      return splitsSurrogatePair(value, index) ? { index: index - 1, length: 2 } : undefined
    }

    const segment = segments.containing(index)

    return segment && segment.index !== index
      ? { index: segment.index, length: segment.segment.length }
      : undefined
  }

  return {
    /** The start of the cluster straddling `index`, or `index` if it is already on an edge. */
    toStart(index: number): number {
      return straddling(index)?.index ?? index
    },
    /** The end of the cluster straddling `index`, or `index` if it is already on an edge. */
    toEnd(index: number): number {
      const cluster = straddling(index)

      return cluster ? cluster.index + cluster.length : index
    }
  }
}

function truncateHTMLFromStart(html: string, maxLength: number) {
  let keptLength = 0
  let totalLength = 0
  let insideTag = false
  let didTruncate = false

  // Iterate through the HTML string in reverse order, one code point at a time.
  // Indexing by UTF-16 code unit would slice an astral character (emoji, most
  // CJK extension blocks) in half when the truncation boundary lands between
  // its surrogates, emitting an unpaired surrogate that renders as `�`.
  // `<` and `>` are always single code units, so tag tracking is unaffected.
  const chars = Array.from(html)

  // Characters are retained until the one that overruns the budget, which is
  // dropped along with everything the scan has not reached — so the result is
  // always a suffix of `html`. Counting the retained code units rather than
  // building the string up front leaves an index to snap, and drops the
  // quadratic prepend on the way.
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i]!

    if (char === '>') {
      insideTag = true
    } else if (char === '<') {
      insideTag = false
      keptLength += char.length
      continue
    }

    if (!insideTag) {
      totalLength++
    }

    if (totalLength <= maxLength) {
      keptLength += char.length
    } else {
      // If we've reached the max length, we break out of the loop
      // to prevent further processing of the string
      didTruncate = true
      break
    }
  }

  if (!didTruncate) {
    return html
  }

  // A code point is not what the reader sees. Snap the cut past any grapheme
  // cluster it lands inside, so the visible character after the ellipsis is the
  // one the author wrote rather than its tail.
  return '...' + html.slice(createClusterSnapper(html).toEnd(html.length - keptLength))
}

/**
 * Escapes a full-text-search snippet to safe HTML, keeping its `<mark>` tags.
 *
 * Everything else in `snippet` is escaped, so a value carrying `<script>`
 * renders as text. The preserved tag is hardcoded on purpose: taking it as a
 * parameter would let a caller pass any tag through to the `v-html` that renders
 * the result.
 *
 * @param snippet Snippet from the search index, with `<mark>` marking the hits.
 * @returns HTML safe to render, with the highlight tags intact.
 */
export function sanitizeSnippet(snippet: string): string {
  const tagOpen = '\0markO\0'
  const tagClose = '\0markC\0'

  return escapeHTML(
    snippet
      .replaceAll('<mark>', tagOpen)
      .replaceAll('</mark>', tagClose)
  )
    .replaceAll(tagOpen, '<mark>')
    .replaceAll(tagClose, '</mark>')
}

/**
 * Wraps a Fuse match in `<mark>` and trims the text before it, as HTML.
 *
 * Returns `undefined` when nothing here applies to the item: when it carries no
 * matches at all — Fuse only populates them when `includeMatches` is set, which
 * `ContentSearch` does by default and `CommandPalette` leaves to the caller —
 * and equally when `forceKey` names a key none of the matches is on, or
 * `omitKeys` covers every one of them. Callers render the plain value in that
 * case. Everything except the inserted tags is escaped; the result is rendered
 * with `v-html`.
 *
 * Text before the match is dropped when it does not fit, leaving an ellipsis, so
 * the highlight stays visible in a narrow row. Both boundaries land on whole
 * characters as a reader counts them, never inside an emoji or a flag.
 *
 * @param item Search result; its `matches` come from Fuse.
 * @param searchTerm The query, used as the length threshold a match must reach.
 * @param forceKey Consider only the match on this key.
 * @param omitKeys Skip matches on these keys — used to keep a hit from being
 * highlighted twice across label, suffix and description.
 * @param useTokenSearch Measure the threshold against the shortest word of the
 * query instead of the whole of it, so multi-word queries highlight each word.
 * b24ui-only, and not present upstream — see `.sync/PORTING.md` §2.
 * @returns The escaped HTML, or `undefined` when there is nothing to highlight.
 */
export function highlight<T>(item: T & { matches?: FuseResult<T>['matches'] }, searchTerm: string, forceKey?: GetItemKeys<T>, omitKeys?: GetItemKeys<T>[], useTokenSearch?: boolean) {
  const tokens = useTokenSearch ? (searchTerm.match(/[\p{L}\p{M}\p{N}_]+/gu) || []) : []
  const minTokenLength = tokens.length > 0 ? Math.min(...tokens.map(t => t.length)) : searchTerm.length

  function generateHighlightedText(value: FuseResultMatch['value'], indices: FuseResultMatch['indices'] = []) {
    value = value || ''
    let content = ''
    let nextUnhighlightedRegionStartingIndex = 0

    const snap = createClusterSnapper(value)

    // Fuse merges, sorts and integer-bounds `indices` itself, so this is a no-op
    // for the search path. It matters because `highlight()` is a published
    // export and `CommandPaletteGroup.postFilter` lets a caller supply its own
    // matches.
    //
    // Non-integer bounds are dropped rather than snapped: `NaN` survives every
    // `Math.min`/`Math.max` below and lands in
    // `nextUnhighlightedRegionStartingIndex`, where `substring(NaN)` reads as
    // `substring(0)` and re-emits the whole value after the part already
    // written — the tail duplicates and every later region is lost.
    //
    // Ordering matters for the same reason: unordered, the clamps swallow every
    // region that arrives after a later one, and out-of-order boundaries make
    // `Segments.containing()` walk a long run of regional indicators from its
    // start each time, which costs as much as the per-boundary segmenter this
    // snapper exists to avoid. Equal starts put the longest first, so the outer
    // region is marked whole instead of the clamps splitting it in two.
    const orderedIndices = indices
      .filter(region => Number.isInteger(region[0]) && Number.isInteger(region[1]))
      .sort((a, b) => a[0] - b[0] || b[1] - a[1])

    orderedIndices.forEach((region) => {
      // skip if region is a single character
      if (region.length === 2 && region[0] === region[1]) {
        return
      }

      const lastIndiceNextIndex = region[1] + 1

      // Fuse reports `indices` as UTF-16 code-unit offsets, so a region boundary
      // can land inside a character the reader sees as one — between the
      // surrogates of an emoji (#362), or between the parts of a grapheme cluster
      // (#364). Slicing there puts `<mark>` inside the character. Snap each
      // boundary outward so a mark always wraps whole clusters.
      //
      // Then clamp, because `substring()` swaps arguments it finds reversed and
      // clamps ones it finds out of range — turning every ordering mistake here
      // into duplicated text rather than an error. `start` never moves behind
      // the cursor, since two adjacent regions meeting inside one cluster snap
      // past each other; `end` never moves behind `start`, since a region nested
      // inside an earlier one ends before the cursor already stands; and `end`
      // never leaves the value, which is what keeps a region wholly past its end
      // from slicing to nothing while still comparing as non-empty below,
      // emitting a bare `<mark></mark>` and freezing the cursor past every region
      // after it. `start` needs no ceiling of its own: it can only exceed the
      // value by exceeding `end`, which is checked.
      const start = Math.max(nextUnhighlightedRegionStartingIndex, snap.toStart(region[0]))
      const end = Math.min(Math.max(start, snap.toEnd(lastIndiceNextIndex)), value.length)

      // `end > start` is not redundant with the length test: when a preceding
      // region's end snaps past this one's start, the clamps leave the region
      // empty, and emitting the tags anyway produces a bare `<mark></mark>` with
      // the highlight lost entirely.
      const isMatched = (lastIndiceNextIndex - region[0]) >= minTokenLength && end > start

      content += [
        escapeHTML(value.substring(nextUnhighlightedRegionStartingIndex, start)),
        isMatched && `<mark>`,
        escapeHTML(value.substring(start, end)),
        isMatched && '</mark>'
      ].filter(Boolean).join('')

      nextUnhighlightedRegionStartingIndex = end
    })

    content += escapeHTML(value.substring(nextUnhighlightedRegionStartingIndex))

    const markIndex = content.indexOf('<mark>')
    if (markIndex !== -1) {
      // Measure the budget in code points too, so it stays in the same units as
      // the counter inside `truncateHTMLFromStart`. Identical to `.length` for
      // BMP-only content.
      content = truncateHTMLFromStart(content, Array.from(content.slice(markIndex)).length)
    }

    return content
  }

  if (!item.matches?.length) {
    return
  }

  for (const match of item.matches) {
    if (forceKey && match.key !== forceKey) {
      continue
    }
    if (omitKeys?.includes(match.key as GetItemKeys<T>)) {
      continue
    }

    return generateHighlightedText(match.value, match.indices)
  }
}
