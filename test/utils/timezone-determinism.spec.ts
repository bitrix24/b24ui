import { describe, it, expect } from 'vitest'

/**
 * The suite renders dates into committed snapshots, so its timezone is part of
 * the expected output — and nothing in a normal run says so out loud.
 *
 * `Calendar.spec.ts`, `InputDate.spec.ts` and `InputTime.spec.ts` freeze "now"
 * at `new Date('2025-01-01')`. A bare `YYYY-MM-DD` string parses as UTC
 * midnight, which in every negative-offset zone is still 2024-12-31 locally,
 * so `data-today` moves to the wrong cell and 69 snapshots fail at once
 * (Calendar 45, InputDate 24). GitHub runners are UTC and stay green, so the
 * whole failure is pushed onto whichever contributor happens to sit west of
 * Greenwich — on a clean clone, with no diff of theirs to explain it.
 *
 * `vitest.config.ts` pins `TZ=UTC` for that reason. These assertions exist so
 * that removing the pin fails here, naming the cause, rather than 69 snapshot
 * diffs that only reproduce on some machines.
 */
describe('suite timezone', () => {
  it('is pinned, so snapshot dates do not depend on the machine', () => {
    expect(process.env.TZ).toBe('UTC')
  })

  // The env var alone is not the property under test — Node caches its
  // timezone, and a runner that reads `TZ` too late would leave this suite
  // formatting in local time while the variable claims otherwise. Assert the
  // observable behaviour instead.
  it('is in effect for Date, not just declared', () => {
    expect(new Date('2025-01-01').getTimezoneOffset()).toBe(0)
  })

  it('keeps a UTC-midnight date on the same calendar day the specs expect', () => {
    const frozenNow = new Date('2025-01-01')

    expect(frozenNow.getFullYear()).toBe(2025)
    expect(frozenNow.getMonth()).toBe(0)
    expect(frozenNow.getDate()).toBe(1)
  })

  it('formats through Intl in UTC too, so locale-formatted cells are stable', () => {
    const formatted = new Date('2025-01-01T00:30:00Z').toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })

    expect(formatted).toBe('Jan 1, 00:30')
  })
})
