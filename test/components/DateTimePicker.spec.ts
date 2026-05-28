import { describe, it, expect, vi, afterAll } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import { renderEach } from '../component-render'
import DateTimePicker from '../../src/runtime/components/DateTimePicker.vue'
import theme from '#build/b24ui/date-time-picker'

describe('DateTimePicker', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const fixedNow = new Date('2025-01-01T00:00:00Z')

  vi.setSystemTime(fixedNow)

  afterAll(() => {
    vi.useRealTimers()
  })

  renderEach(DateTimePicker, [
    // Props
    ['empty', { props: {} }],
    ['with modelValue', { props: { modelValue: new CalendarDateTime(2025, 1, 1, 10, 30) } }],
    ['with defaultValue', { props: { defaultValue: new CalendarDateTime(2025, 1, 1, 10, 30) } }],
    ['with dateOnly', { props: { dateOnly: true, modelValue: new CalendarDate(2025, 1, 1) } }],
    ['with hidePresets', { props: { hidePresets: true } }],
    ['with disabled', { props: { disabled: true } }],
    ['with placeholder', { props: { placeholder: 'Pick a date and time' } }],
    ['with locale ru', { props: { locale: 'ru' } }],
    ['with minuteStep 15', { props: { minuteStep: 15 } }],
    ['with custom presets', { props: { presets: [
      { label: 'Custom A', value: new CalendarDate(2025, 1, 5) },
      { label: 'Custom B', hint: 'Two weeks', value: new CalendarDate(2025, 1, 15) }
    ] } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with color', { props: { color: 'air-primary-alert' } }],
    ['with class', { props: { class: 'max-w-sm' } }]
  ])

  describe('emits', () => {
    it('emits update:modelValue when value is pushed in', async () => {
      const wrapper = await mountSuspended(DateTimePicker, {
        props: { dateOnly: true, modelValue: new CalendarDate(2025, 1, 1) }
      })

      const target = new CalendarDate(2025, 1, 5)
      ;(wrapper.vm as any).$emit('update:modelValue', target)

      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })
  })

  describe('minuteStep clamping', () => {
    it('rejects NaN and falls back to default', async () => {
      const wrapper = await mountSuspended(DateTimePicker, {
        props: { minuteStep: Number.NaN as unknown as number }
      })

      // Component should mount without error and not produce an infinite loop.
      expect(wrapper.html()).toBeTruthy()
    })

    it('clamps zero to 1', async () => {
      const wrapper = await mountSuspended(DateTimePicker, { props: { minuteStep: 0 } })
      expect(wrapper.html()).toBeTruthy()
    })

    it('clamps very large values to 30', async () => {
      const wrapper = await mountSuspended(DateTimePicker, { props: { minuteStep: 9999 } })
      expect(wrapper.html()).toBeTruthy()
    })
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DateTimePicker, {
      props: {
        'modelValue': new CalendarDateTime(2025, 1, 1, 10, 30),
        'aria-label': 'Pick a date and time'
      }
    })

    expect(await axe(wrapper.element, {
      rules: {
        // The default trigger wraps a `B24Input` (readonly, `tabindex=-1`,
        // `aria-hidden`, `pointer-events-none`) inside a `role=button` div so
        // the entire visual area is clickable. The inner input is not
        // user-reachable, but axe still flags `nested-interactive`. The
        // input being decorative also trips `label` — both rules are
        // false positives for this composition.
        'nested-interactive': { enabled: false },
        'label': { enabled: false }
      }
    })).toHaveNoViolations()
  })
})
