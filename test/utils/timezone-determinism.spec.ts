import { describe, it, expect } from 'vitest'

/**
 * The suite renders dates into committed snapshots, so its timezone is part of
 * the expected output — and nothing in a normal run says so out loud.
 *
 * `Calendar.spec.ts`, `InputDate.spec.ts` and `InputTime.spec.ts` freeze "now"
 * at `new Date('2025-01-01')`. A bare `YYYY-MM-DD` string parses as UTC
 * midnight, which in every negative-offset zone is still 2024-12-31 locally,
 * so `data-today` moves to the wrong cell and 69 tests fail at once per
 * project (Calendar 45, InputDate 24) — both projects run them, so a full run
 * is roughly double that. GitHub runners are UTC and stay green, so the whole
 * failure is pushed onto whichever contributor happens to sit west of
 * Greenwich — on a clean clone, with no diff of theirs to explain it.
 *
 * `vitest.config.ts` pins `TZ=UTC` for that reason. These assertions exist so
 * that losing the pin fails here, naming the cause, rather than as a wall of
 * snapshot diffs that only reproduce on some machines.
 */
describe('suite timezone', () => {
  it('is pinned, so snapshot dates do not depend on the machine', () => {
    expect(process.env.TZ).toBe('UTC')
  })

  // The variable alone is not the property under test, and the gap between the
  // two is exactly how this breaks: under `--pool=threads` the worker receives
  // `TZ` as a copy of `process.env` while ICU goes on reading the OS
  // environment, so the assertion above passes while every date below is still
  // local. Assert the observed offset — with it at zero, local `Date` field
  // reads equal their UTC counterparts by definition, which is the whole of
  // what the frozen `2025-01-01` in the date specs depends on.
  it('is in effect for Date, not just declared', () => {
    expect(new Date('2025-01-01').getTimezoneOffset()).toBe(0)
  })

  // `Intl` resolves its timezone separately from `Date`'s own getters, so a
  // partial-ICU build can disagree with the assertion above. Asserted through
  // `resolvedOptions()` rather than a formatted string: the formats themselves
  // come from CLDR and get revised between releases, and a test that fails on
  // a CLDR punctuation change while blaming the timezone is worse than no test.
  it('resolves Intl in UTC too, so locale-formatted cells are stable', () => {
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe('UTC')
  })
})
