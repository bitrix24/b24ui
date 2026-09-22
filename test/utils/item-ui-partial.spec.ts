import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * Per-item `b24ui` overrides are spelled `Partial<Pick<…>>`, matching upstream.
 *
 * This is a **parity rule, not a correctness one**, and the distinction is the
 * whole point of the file.
 *
 * `nuxt/ui@c617565` wrapped 25 of these in `Partial<`, filed as a fix for
 * partial overrides being rejected. It changes nothing on either side.
 * `ComponentSlots` in `runtime/types/tv.ts` is `{ [K in keyof T['slots']]?:
 * SlotClass }` — every slot key is already optional, and `Pick<>` preserves
 * optionality — so `Pick<Slots, 'a' | 'b'>` and `Partial<Pick<Slots, 'a' |
 * 'b'>>` are the same type. That line is byte-identical in both repositories.
 *
 * Measured, because "these look equivalent" is exactly the reading that should
 * not be trusted: both directions of assignment between the two forms compile,
 * and a control using a genuinely required map fails the same assignment, so
 * the probe can tell the difference when there is one.
 *
 * The change is taken anyway, for the reason the sync exists: a file that
 * diverges from upstream in spelling is a file where the next patch does not
 * apply cleanly. This rule keeps that alignment — including for the next
 * component somebody adds — and says plainly that no behaviour depends on it,
 * so nobody later mistakes it for a guard against a real defect.
 *
 * An earlier version of this file also asserted the behaviour, with
 * `expectTypeOf(...).toExtend(...)` and then with an annotated `const`. Both
 * were removed: reverting `Partial<` in a component left both green, which is
 * consistent with there being nothing to assert. `expectTypeOf` is doubly
 * inert here — it raises nothing under plain `vue-tsc` and is a no-op at
 * runtime unless vitest runs in typecheck mode, which this suite does not.
 */
const COMPONENTS_DIR = resolve(process.cwd(), 'src/runtime/components')

function vueFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      return vueFiles(path)
    }
    return entry.name.endsWith('.vue') ? [path] : []
  })
}

const offenders: string[] = []
let inspected = 0

for (const file of vueFiles(COMPONENTS_DIR)) {
  readFileSync(file, 'utf-8').split('\n').forEach((text, index) => {
    if (!/^\s*b24ui\?:/.test(text)) {
      return
    }

    inspected++

    // Only the bare `Pick<…>` form is out of line. Anything else — an
    // intersection with another component's already-partial `ui`, a plain slot
    // map — is a different shape and not what upstream changed.
    if (/^\s*b24ui\?:\s*Pick</.test(text)) {
      offenders.push(`${relative(process.cwd(), file)}:${index + 1}`)
    }
  })
}

describe('per-item b24ui overrides', () => {
  it('are spelled Partial<Pick<…>> in every component, as upstream spells them', () => {
    expect(offenders, 'these declare a per-item `b24ui` as a bare `Pick<…>`, which diverges from upstream even though the two types are equivalent').toEqual([])
  })

  // Without this the rule above passes by finding nothing to check, which is
  // what a renamed prop or a moved components directory would produce.
  it('actually inspected the components', () => {
    expect(inspected).toBeGreaterThanOrEqual(20)
  })
})
