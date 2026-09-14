import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import { renderEach } from '../component-render'
import DateTimePicker from '../../src/runtime/components/DateTimePicker.vue'

describe('DateTimePicker', () => {
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

  it('keeps the time when a date is picked, and drops it when `dateOnly` is set', async () => {
    const wrapper = await mountSuspended(DateTimePicker, { props: { ...open, modelValue: value } })
    await wrapper.findAll('[data-slot="presets"] button')[1]!.trigger('click')

    const kept = wrapper.emitted('update:modelValue')!.at(-1)![0] as CalendarDateTime
    expect([kept.hour, kept.minute]).toEqual([14, 30])

    const dateOnly = await mountSuspended(DateTimePicker, {
      props: { ...open, dateOnly: true, modelValue: new CalendarDate(2024, 10, 6) }
    })
    await dateOnly.findAll('[data-slot="presets"] button')[1]!.trigger('click')

    expect(dateOnly.emitted('update:modelValue')!.at(-1)![0]).toBeInstanceOf(CalendarDate)
  })
})
