import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * A focus outline that declares only a colour is not a weak focus outline — it
 * is no focus outline at all.
 *
 * `outline-(--some-token)` compiles to `outline-color` and nothing else. The
 * width and the style come from a separate utility (`outline-2`,
 * `outline-(length:--token)`), and with neither of those present
 * `outline-style` keeps its initial value of `none`, so the browser paints
 * nothing. What a keyboard user then sees is the user-agent default for a
 * focusable element — and where that is `outline: auto`, the declared colour is
 * ignored outright, because `auto` uses the UA's own colour. Either way the
 * design token is dead and the indicator is not the one the theme specifies.
 *
 * Five themes shipped in exactly that state — `accordion`, `chat-reasoning`,
 * `chat-tool`, `footer-columns` and `table` — across 626 rendered elements.
 * Every other gate was green throughout: the classes are valid, the CSS
 * compiles, the components render, and the snapshots recorded the broken class
 * list as the expected one.
 *
 * That last part is why this guard reads the snapshots rather than the theme
 * sources. Composition is the hard half — a width can arrive from a slot, a
 * variant or a compound variant, and only the rendered `class` attribute says
 * which classes actually land on one element together. `FileUpload` is the
 * case in point: its colour comes from a compound variant and its width from
 * the `base` slot, and it was never broken. A source-level rule would have had
 * to call it a false positive.
 *
 * Snapshots alone are not a guard, though. `pnpm test:update` rewrites them
 * wholesale, so a regression re-enters as an accepted diff. This turns the same
 * bytes into an assertion that does not move when the snapshots do.
 *
 * One consequence to know about: under `pnpm test:update` this spec reads the
 * snapshots the same run is rewriting, so after a change to a focus outline it
 * reports the state from *before* the update and goes red. That is not a
 * failure to chase — re-run the suite normally and it reflects the new files.
 * `ci.yml` never passes `-u`, so the gate always reads what is committed.
 */
const SNAPSHOT_DIR = resolve(process.cwd(), 'test/components/__snapshots__')

/** The air token every focus ring in this library is supposed to be drawn with. */
const FOCUS_COLOR = 'outline-(--ui-color-design-outline-focused-stroke)'

/**
 * Utilities that set `outline-width` — and with it `outline-style`, since
 * Tailwind's width utilities emit `outline-style: var(--tw-outline-style)`
 * alongside. `outline-none` and `outline-hidden` deliberately do not count:
 * they set `outline-style: none`, which is the state this guard exists to
 * catch.
 */
function isWidth(cls: string): boolean {
  return /(?:^|:)outline-(?:\d+(?:\.\d+)?|\(length:)/.test(cls)
}

/**
 * Everything before the utility itself — `focus-visible:`,
 * `[&>tr]:data-[selectable=true]:focus-visible:` and so on. Only ever called on
 * a class that ends with `FOCUS_COLOR`, so trimming that suffix is exact; a
 * regex for `outline-` would instead cut at the first match, which a prefix
 * containing an arbitrary selector could supply itself.
 */
function prefixOf(cls: string): string {
  return cls.slice(0, cls.length - FOCUS_COLOR.length)
}

interface Offender { file: string, prefix: string, classes: string }

const offenders: Offender[] = []
let inspected = 0
const filesWithToken = new Set<string>()

for (const file of readdirSync(SNAPSHOT_DIR).filter(name => name.endsWith('.snap'))) {
  const contents = readFileSync(resolve(SNAPSHOT_DIR, file), 'utf-8')

  for (const match of contents.matchAll(/class="([^"]*)"/g)) {
    const classes = match[1]!
    if (!classes.includes(FOCUS_COLOR)) {
      continue
    }

    filesWithToken.add(file)
    const tokens = classes.split(/\s+/).filter(Boolean)

    // One element can carry the focus colour under several prefixes — a table
    // row does, once for `data-[selectable=true]` and once for
    // `data-[selected=true]` — and each needs its own width.
    for (const coloured of tokens.filter(token => token.endsWith(FOCUS_COLOR))) {
      inspected++
      const prefix = prefixOf(coloured)

      // The width has to sit under the same prefix. A width on a different
      // variant is a width on a different state, which paints nothing here.
      if (!tokens.some(token => token.startsWith(prefix) && isWidth(token))) {
        offenders.push({ file, prefix, classes })
      }
    }
  }
}

describe('focus outlines', () => {
  it('every element that sets the focus colour also sets a width', () => {
    const report = offenders.map(o => `${o.file}  prefix="${o.prefix}"`)
    const unique = [...new Set(report)]

    expect(unique, `these elements declare ${FOCUS_COLOR} with no outline width under the same prefix, so nothing is painted`).toEqual([])
  })

  // Without this the suite above passes by finding nothing to check, which is
  // exactly what a renamed token or a moved snapshot directory would produce.
  it('actually inspected the snapshots', () => {
    expect(filesWithToken.size).toBeGreaterThanOrEqual(10)
    expect(inspected).toBeGreaterThanOrEqual(500)
  })
})
