import { afterAll, describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import { renderEach } from '../component-render'
import DateTimePicker from '../../src/runtime/components/DateTimePicker.vue'

describe('DateTimePicker', () => {
  // Same clock `Calendar`, `InputDate` and `InputTime` pin. Without it the
  // preset hints render today's date straight into the snapshots, which then go
  // red the following morning — they were written on 2026-09-14 and carried
  // "Monday, September 14" six times.
  vi.setSystemTime(new Date('2025-01-01'))

  afterAll(() => {
    vi.useRealTimers()
  })

  // `portal: false` keeps the popover content inside the wrapper so it can be
  // asserted on; `locale` is pinned because the trigger and the preset hints are
  // formatted through `Intl`, and the suite runs in whatever locale the host has.
  const open = { open: true, locale: 'en', popover: { portal: false } }
  const value = new CalendarDateTime(2024, 10, 6, 14, 30)

  renderEach(DateTimePicker, [
    // Props
    ['closed', { props: { locale: 'en' } }],
    ['with placeholder', { props: { locale: 'en', placeholder: 'Pick a date' } }],
    ['with value', { props: { locale: 'en', modelValue: value } }],
    ['with date only', { props: { locale: 'en', dateOnly: true, modelValue: new CalendarDate(2024, 10, 6) } }],
    ['with disabled', { props: { locale: 'en', disabled: true } }],
    ['open', { props: open }],
    ['open without presets', { props: { ...open, hidePresets: true } }],
    ['open with value', { props: { ...open, modelValue: value } }],
    // Slots
    ['with default slot', { props: { locale: 'en' }, slots: { default: () => 'Trigger slot' } }],
    ['with presets slot', { props: open, slots: { presets: () => 'Presets slot' } }],
    ['with preset slot', { props: open, slots: { preset: () => 'Preset slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, modelValue: value } })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('accepts a controlled `open`, so `v-model:open` works', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { locale: 'en', popover: { portal: false } } })
    expect(wrapper.find('[data-slot="body"]').exists()).toBe(false)

    await wrapper.setProps({ open: true })
    expect(wrapper.find('[data-slot="body"]').exists()).toBe(true)
  })

  it.each([
    ['the default', undefined, 12],
    ['a divisor of 60', 15, 4],
    ['a step above the cap', 90, 2],
    ['a step below the floor', 0, 60],
    ['a non-finite step', Number.NaN, 12]
  ])('renders a bounded minute grid for %s', async (_name, minuteStep, expected) => {
    const wrapper = await mountSuspended(DateTimePicker, {
      props: { ...open, modelValue: value, ...(minuteStep === undefined ? {} : { minuteStep }) }
    })
    // The grid only exists on the time step, which a value already selected reaches
    // by clicking the footer.
    await wrapper.find('[data-slot="footer"]').trigger('click')

    expect(wrapper.findAll('[data-slot="timeBody"] [aria-pressed]').length).toBe(24 + expected)
  })

  it('marks the selected hour and minute, and only those', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, modelValue: value } })
    await wrapper.find('[data-slot="footer"]').trigger('click')

    const pressed = wrapper.findAll('[aria-pressed="true"]').map(cell => cell.text())
    expect(pressed).toEqual(['14', '30'])
  })

  it('resolves a factory preset once per render', async () => {
    let calls = 0
    const presets = [{
      label: 'Computed',
      value: () => {
        calls += 1
        return new CalendarDate(2024, 10, 6)
      }
    }]
    await mountSuspended(DateTimePicker, { props: { ...open, presets } })

    // Twice would mean the template resolved it separately for the active check
    // and for the click handler — a factory returning a "now"-like value would
    // then disagree with itself between the two.
    expect(calls).toBe(1)
  })

  // Index into the default preset list: today, tomorrow, end of week, in a
  // week, end of month.
  const TOMORROW = 1
  const END_OF_WEEK = 2

  it('keeps the time when a date is picked, and drops it when `dateOnly` is set', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, modelValue: value } })
    await wrapper.findAll('[data-slot="presets"] button')[TOMORROW]!.trigger('click')

    const kept = wrapper.emitted('update:modelValue')!.at(-1)![0] as CalendarDateTime
    expect([kept.hour, kept.minute]).toEqual([14, 30])

    const dateOnly = await mountSuspended(DateTimePicker, {
      props: { ...open, dateOnly: true, modelValue: new CalendarDate(2024, 10, 6) }
    })
    await dateOnly.findAll('[data-slot="presets"] button')[TOMORROW]!.trigger('click')

    expect(dateOnly.emitted('update:modelValue')!.at(-1)![0]).toBeInstanceOf(CalendarDate)
  })

  it('passes accessibility tests on the time step too', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, modelValue: value } })
    // The hour and minute grids only exist past the footer, so the check above
    // never saw them: a role-less `aria-pressed` there went unnoticed.
    await wrapper.find('[data-slot="footer"]').trigger('click')

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('emits `change` alongside `update:modelValue`', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, modelValue: value } })
    await wrapper.findAll('[data-slot="presets"] button')[TOMORROW]!.trigger('click')

    expect(wrapper.emitted('change')?.at(-1)).toEqual(wrapper.emitted('update:modelValue')?.at(-1))
  })

  it('emits `update:open` when it closes itself', async () => {
    const wrapper = await mountSuspended(DateTimePicker, {
      props: { locale: 'en', defaultOpen: true, dateOnly: true, popover: { portal: false } }
    })
    await wrapper.findAll('[data-slot="presets"] button')[TOMORROW]!.trigger('click')

    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('stays open while `open` is held, even when the parent ignores the emit', async () => {
    const wrapper = await mountSuspended(DateTimePicker, {
      props: { ...open, dateOnly: true }
    })
    await wrapper.findAll('[data-slot="presets"] button')[TOMORROW]!.trigger('click')

    // The prop is the single source of truth while it is given. Mirroring it
    // into a ref let the picker close itself behind a parent that had not
    // agreed to close.
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    expect(wrapper.find('[data-slot="body"]').exists()).toBe(true)
  })

  it('resolves the end-of-week preset to a Friday whatever the week starts on', async () => {
    // `startOfWeek(…).add({ days: 4 })` reads as Friday only where the week
    // starts on Monday; under `en` it landed on Thursday and under `ar` on
    // Wednesday, and the wrong day sat in the snapshot unnoticed.
    for (const locale of ['en', 'ru', 'ar']) {
      const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, locale, dateOnly: true } })
      await wrapper.findAll('[data-slot="presets"] button')[END_OF_WEEK]!.trigger('click')

      const picked = wrapper.emitted('update:modelValue')!.at(-1)![0] as CalendarDate
      expect([locale, picked.toDate('UTC').getUTCDay()]).toEqual([locale, 5])
    }
  })

  it('skips a preset whose factory throws instead of taking the picker down', async () => {
    // Resolution happens inside one computed the template reads, so an escaping
    // exception replaced the whole component — the working calendar with it.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const presets = [
      { label: 'Broken', value: () => { throw new Error('boom') } },
      { label: 'Fine', value: () => new CalendarDate(2024, 10, 6) }
    ]
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, presets } })

    expect(wrapper.findAll('[data-slot="presets"] button').map(b => b.text())).toEqual(['Fine'])
    expect(wrapper.find('[data-slot="body"]').exists()).toBe(true)
    expect(warn).toHaveBeenCalledOnce()
    warn.mockRestore()
  })

  it('falls back to `en` for a locale `Intl` rejects', async () => {
    // Every formatter feeds `locale` to `Intl.DateTimeFormat`, and one of them
    // renders on the always-visible trigger, so a malformed tag threw before
    // the picker could be opened at all.
    const wrapper = await mountSuspended(DateTimePicker, {
      props: { locale: 'not a locale!!', modelValue: value }
    })

    expect(wrapper.find('input').element.value).toBe('Oct 6, 2024, 2:30 PM')
  })

  it('commits a value when the footer opens the time step without one', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open } })
    await wrapper.find('[data-slot="footer"]').trigger('click')

    // Without this the time grid would mark hour and minute cells that no
    // committed value backs, and the first minute click would be the first the
    // parent hears about.
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBeInstanceOf(CalendarDateTime)
  })

  it('seeds itself from `defaultValue` and `defaultOpen`', async () => {
    const wrapper = await mountSuspended(DateTimePicker, {
      props: { locale: 'en', defaultValue: value, defaultOpen: true, popover: { portal: false } }
    })

    expect(wrapper.find('input').element.value).toBe('Oct 6, 2024, 2:30 PM')
    expect(wrapper.find('[data-slot="body"]').exists()).toBe(true)
  })

  it('puts the colour on the teleported content, where the grid can see it', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, modelValue: value } })

    // The colour variant used to sit on a `root` slot the template never
    // rendered, and both wrappers teleport their content out of the component,
    // so `--b24ui-background` was undefined wherever it was actually used: the
    // selected hour and minute came out transparent and the active preset kept
    // the default grey border. Nothing failed — `aria-pressed` was still
    // correct, so the tests and `axe` stayed green while the picker looked
    // unselected.
    expect(wrapper.find('[data-slot="body"]').element.closest('.style-filled')).not.toBeNull()
  })
})
