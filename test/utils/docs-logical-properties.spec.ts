import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * b24ui ships an `ar` locale with `dir: 'rtl'`, so the docs examples are
 * reachable in RTL — and `src/theme/` has used logical utilities (`ps-`, `me-`,
 * `border-s`, `start-`) throughout for a long time. The examples had not caught
 * up: sixteen still positioned with `ml-`/`pr-`/`left-0`/`border-r`, which
 * Tailwind does not flip.
 *
 * Those are the ones this guards, and only those, because for each of them the
 * logical form is *identical* under LTR — `ms-2` and `ml-2` compile to the same
 * rule when the direction is left-to-right. So there is no judgement in them and
 * nothing to weigh: a physical one is simply the older spelling.
 *
 * Deliberately NOT guarded, because both need a decision rather than a swap:
 *
 *  - **`text-right`** — 34 occurrences, almost all the numeric column of a Table
 *    example. Whether an amount column should follow the reading direction or
 *    stay pinned right is a design call, not a mechanical one.
 *  - **`translate-x`** — a physical axis with no logical counterpart. Flipping it
 *    means adding an `rtl:` variant with the opposite sign, which is what
 *    nuxt/ui@592d5b5 did for the alternating timeline; the remaining site
 *    (`NavigationMenuTrailingSlotExample`) needs the same treatment and someone
 *    who can look at the result.
 *
 * Both are tracked on the issue this spec was written alongside.
 */

const examplesDir = resolve(process.cwd(), 'docs/app/components/content/examples')

/** Physical utilities whose logical form is byte-identical under LTR. */
const PHYSICAL = [
  { label: 'ml-/mr-', pattern: /(?<![\w:-])-?m[lr]-(?=[\w.[])/g, use: 'ms-/me-' },
  { label: 'pl-/pr-', pattern: /(?<![\w:-])-?p[lr]-(?=[\w.[])/g, use: 'ps-/pe-' },
  { label: 'border-l/border-r', pattern: /(?<![\w:-])border-[lr](?![\w-])/g, use: 'border-s/border-e' },
  { label: 'left-/right-', pattern: /(?<![\w:-])-?(?:left|right)-(?=[\w.[])/g, use: 'start-/end-' }
]

const files = await glob('**/*.vue', { cwd: examplesDir })

/** The theme's own spelling, used below to prove these utilities still exist. */
const themeSource = (await glob('*.ts', { cwd: resolve(process.cwd(), 'src/theme') }))
  .map(file => readFileSync(resolve(process.cwd(), 'src/theme', file), 'utf-8'))
  .join('')

describe('docs examples position with logical properties', () => {
  it('finds the examples to check', () => {
    // Every assertion below passes vacuously on an empty glob.
    expect(files.length).toBeGreaterThan(300)
  })

  it('still contains the utilities it is looking for, somewhere in the tree', () => {
    // If Tailwind ever renamed these, the scan above would go quiet and this
    // file would report success while checking nothing. Anchored on `src/theme`,
    // which uses the logical forms, so a rename breaks this rather than hiding.
    expect(themeSource.length).toBeGreaterThan(10_000)
    expect(themeSource).toMatch(/(?<![\w:-])m[se]-/)
    expect(themeSource).toMatch(/(?<![\w:-])p[se]-/)
  })

  it.each(PHYSICAL)('uses $use rather than $label', ({ pattern, use }) => {
    const offenders = files
      .flatMap((file) => {
        const source = readFileSync(resolve(examplesDir, file), 'utf-8')
        return [...new Set(source.match(pattern) ?? [])].map(hit => `${file}: ${hit}… — use ${use}`)
      })
      .sort()

    // Named rather than counted: the failure has to say which file and which
    // utility, or the next person re-runs the audit by hand.
    expect(offenders).toEqual([])
  })
})
