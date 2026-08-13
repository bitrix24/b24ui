import { bench, describe } from 'vitest'
import { highlight } from '../../src/runtime/utils/search'

// `highlight()` runs on every keystroke — three times per result (label, suffix,
// description) for every item, before virtualization decides what is visible.
// The grapheme snapping it does is guarded by two constants whose values were
// chosen by measurement, and neither is observable from a unit test:
//
//   - the `< U+0300` screen, which keeps ASCII and Latin-1 boundaries away from
//     `Intl.Segmenter` entirely. It does nothing for Cyrillic, CJK, Devanagari
//     or anything else above the floor — those pay for the segmenter.
//   - the 8192-character ceiling, past which segmentation is skipped.
//
// The scripts that produced the numbers in `.sync/PORTING.md` were throwaway.
// These cases are the durable version: run `pnpm run bench` before changing
// either constant, or the alternatives already rejected once — segmenting the
// whole string, or segmenting a fixed window — will look attractive again.

const MATCH = 'match'

function itemFor(value: string) {
  const index = value.indexOf(MATCH)

  return { label: value, matches: [{ key: 'label', value, indices: [[index, index + MATCH.length - 1]] as [number, number][] }] }
}

// ~979 characters of prefix, with the match at the end — the shape truncation
// exists for, and the one where the snap actually fires.
function prefixed(filler: string) {
  return itemFor(filler.repeat(Math.ceil(979 / filler.length)) + MATCH)
}

const ascii = prefixed('a')
const cyrillic = prefixed('ф')
const cjk = prefixed('漢')
const emoji = prefixed('\u{1F600}')

// Regional indicators are the worst case: `Segments.containing()` has to walk
// the run to work out how the flags pair up.
const flags = prefixed('\u{1F1FA}\u{1F1F8}')

// Either side of the ceiling, same content, so the pair shows what skipping the
// segmenter buys and what it costs.
const underCeiling = itemFor(`${'a'.repeat(8000)}${'\u{1F1FA}\u{1F1F8}'.repeat(10)}${MATCH}`)
const overCeiling = itemFor(`${'a'.repeat(9000)}${'\u{1F1FA}\u{1F1F8}'.repeat(10)}${MATCH}`)

// A value carrying many match regions: snapping is bound to one segmenter view
// per value, and this is the case that regresses hardest if that is undone.
const manyRegions = (() => {
  const value = '\u{1F1FA}\u{1F1F8}'.repeat(400) + MATCH
  const indices: [number, number][] = []

  for (let index = 0; index + 5 < value.length - MATCH.length; index += 4) {
    indices.push([index, index + 4])
  }

  return { label: value, matches: [{ key: 'label', value, indices }] }
})()

describe('highlight', () => {
  bench('ascii', () => {
    highlight(ascii, MATCH, 'label')
  })

  bench('cyrillic', () => {
    highlight(cyrillic, MATCH, 'label')
  })

  bench('cjk', () => {
    highlight(cjk, MATCH, 'label')
  })

  bench('emoji', () => {
    highlight(emoji, MATCH, 'label')
  })

  bench('flags', () => {
    highlight(flags, MATCH, 'label')
  })

  bench('under the segmentation ceiling', () => {
    highlight(underCeiling, MATCH, 'label')
  })

  bench('over the segmentation ceiling', () => {
    highlight(overCeiling, MATCH, 'label')
  })

  bench('many match regions', () => {
    highlight(manyRegions, MATCH, 'label')
  })
})
