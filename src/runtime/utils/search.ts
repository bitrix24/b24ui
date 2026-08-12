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

function truncateHTMLFromStart(html: string, maxLength: number) {
  let truncated = ''
  let totalLength = 0
  let insideTag = false

  // Iterate through the HTML string in reverse order, one code point at a time.
  // Indexing by UTF-16 code unit would slice an astral character (emoji, most
  // CJK extension blocks) in half when the truncation boundary lands between
  // its surrogates, emitting an unpaired surrogate that renders as `�`.
  // `<` and `>` are always single code units, so tag tracking is unaffected.
  const chars = Array.from(html)

  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i]!

    if (char === '>') {
      insideTag = true
    } else if (char === '<') {
      insideTag = false
      truncated = char + truncated
      continue
    }

    if (!insideTag) {
      totalLength++
    }

    if (totalLength <= maxLength) {
      truncated = char + truncated
    } else {
      // If we've reached the max length, we break out of the loop
      // to prevent further processing of the string
      truncated = '...' + truncated
      break
    }
  }

  return truncated
}

// Escape an FTS snippet to safe HTML while preserving the `<mark>` highlight tags.
// The tag is intentionally hardcoded — exposing it as a parameter would let a
// caller smuggle through arbitrary tags (e.g. `<script>`) since `v-html` is
// used to render the result downstream.
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

// Fuse's `indices` are UTF-16 code-unit offsets, so a region boundary can land
// between the two surrogates of an astral character (emoji, most CJK extension
// blocks). Slicing there puts the `<mark>` inside the character and orphans
// both halves, which render as `�`. True when `index` points at a low
// surrogate whose predecessor is a high surrogate.
function splitsSurrogatePair(value: string, index: number): boolean {
  if (index <= 0 || index >= value.length) {
    return false
  }

  const low = value.charCodeAt(index)
  const high = value.charCodeAt(index - 1)

  return low >= 0xDC00 && low <= 0xDFFF && high >= 0xD800 && high <= 0xDBFF
}

export function highlight<T>(item: T & { matches?: FuseResult<T>['matches'] }, searchTerm: string, forceKey?: GetItemKeys<T>, omitKeys?: GetItemKeys<T>[], useTokenSearch?: boolean) {
  const tokens = useTokenSearch ? (searchTerm.match(/[\p{L}\p{M}\p{N}_]+/gu) || []) : []
  const minTokenLength = tokens.length > 0 ? Math.min(...tokens.map(t => t.length)) : searchTerm.length

  function generateHighlightedText(value: FuseResultMatch['value'], indices: FuseResultMatch['indices'] = []) {
    value = value || ''
    let content = ''
    let nextUnhighlightedRegionStartingIndex = 0

    indices.forEach((region) => {
      // Snap a boundary that lands inside an astral character outward, so the
      // highlight always covers whole characters.
      let start = region[0]
      let end = region[1] + 1

      if (splitsSurrogatePair(value, start)) {
        start--
      }
      if (splitsSurrogatePair(value, end)) {
        end++
      }

      // A widened start must not reach back into a region that has already been
      // emitted — `substring` swaps reversed arguments and would duplicate it.
      start = Math.max(start, nextUnhighlightedRegionStartingIndex)

      // skip if region is a single character — one code point, so a lone astral
      // character (two code units) is skipped the same as a lone BMP one
      if (end - start <= 1 || (end - start === 2 && splitsSurrogatePair(value, start + 1))) {
        return
      }

      const isMatched = (region[1] + 1 - region[0]) >= minTokenLength

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
