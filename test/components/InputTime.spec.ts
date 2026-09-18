import { describe, it, expect, vi, afterAll, afterEach, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { renderEach } from '../component-render'
import InputTime from '../../src/runtime/components/InputTime.vue'
import type { FormInputEvents } from '../../src/module'
import { renderForm } from '../utils/form'
import theme from '#build/b24ui/input-time'
import { Time } from '@internationalized/date'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('InputTime', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const date = new Date('2025-01-01')

  vi.setSystemTime(date)

  afterEach(() => {
    vi.setSystemTime(date)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  renderEach(InputTime, [
    // Props
    ['with modelValue', { props: { modelValue: new Time(12, 30) } }],
    ['with default value', { props: { defaultValue: new Time(12, 30) } }],
    ['with placeholder', { props: { placeholder: new Time(12, 30) } }],
    ['with range', { props: { range: true } }],
    ['with range and modelValue', { props: { range: true, modelValue: { start: new Time(12, 30), end: new Time(14, 30) } } }],
    ['with range and defaultValue', { props: { range: true, defaultValue: { start: new Time(12, 30), end: new Time(14, 30) } } }],
    ['with disabled', { props: { disabled: true, modelValue: new Time(12, 30) } }],
    ['with required', { props: { required: true, modelValue: new Time(12, 30) } }],
    ['with readonly', { props: { readonly: true, modelValue: new Time(12, 30) } }],
    ['with hour cycle 24', { props: { hourCycle: 24 as const } }],
    ['with hour cycle 12', { props: { hourCycle: 12 as const } }],
    ['with granularity', { props: { granularity: 'minute' } }],
    ['with hide time zone', { props: { hideTimeZone: true } }],
    ['with max value', { props: { maxValue: new Time(12, 30) } }],
    ['with min value', { props: { minValue: new Time(12, 30) } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with leadingIcon', { props: { leadingIcon: Cross30Icon } }],
    ['with trailingIcon', { props: { trailingIcon: SignIcon } }],
    ['with separatorIcon', { props: { range: true, separatorIcon: Cross30Icon } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with highlight', { props: { highlight: true, defaultValue: new Time(12, 30) } }],
    ['with highlight air-primary-success', { props: { color: 'air-primary-success', highlight: true, defaultValue: new Time(12, 30) } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'max-w-sm' } }],
    ['with b24ui', { props: { b24ui: { base: 'rounded-full' } } }],
    // Slots
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }],
    ['with separator slot', { slots: { separator: () => '=' } }]
  ])

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = await mountSuspended(InputTime)
      const time = new Time(12, 30)

      await wrapper.setValue(time)
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[time]] })
    })

    test('update:modelValue event range', async () => {
      const wrapper = await mountSuspended(InputTime, { props: { range: true } })
      const time = { start: new Time(12, 30), end: new Time(14, 30) }

      await wrapper.setValue(time)
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[time]] })
    })

    test('focus and blur events when focus enters and leaves the field, not between segments', async () => {
      const wrapper = await mountSuspended(InputTime)
      const segments = wrapper.findAll('[data-segment]').filter(segment => segment.attributes('data-segment') !== 'literal')
      const [first, second] = segments

      // Vue skips native events stamped at the exact time their listener was attached
      vi.setSystemTime(new Date(date.getTime() + 1000))

      first!.element.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }))
      first!.element.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: second!.element }))
      second!.element.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: first!.element }))
      second!.element.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: null }))

      expect(wrapper.emitted()).toMatchObject({ focus: [[{ type: 'focusin' }]], blur: [[{ type: 'focusout' }]] })
    })
  })

  describe('form integration', async () => {
    async function createForm(validateOn?: FormInputEvents[]) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (!state.value) {
              return [{ name: 'value', message: 'Error message' }]
            }
            return []
          }
        },
        slotTemplate: `
        <B24FormField name="value">
          <B24InputTime id="input" v-model="state.value" />
        </B24FormField>
        `
      })

      const input = wrapper.findComponent({ name: 'TimeFieldRoot' })
      const segments = wrapper.findAll('[data-segment]').filter(segment => segment.attributes('data-segment') !== 'literal')

      // Vue skips native events stamped at the exact time their listener was attached
      vi.setSystemTime(new Date(date.getTime() + 1000))

      return { wrapper, input, segments }
    }

    test('validate on blur works', async () => {
      const { wrapper, input, segments } = await createForm(['blur'])
      const last = segments[segments.length - 1]!

      last.element.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: null }))
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.vm.$emit('update:modelValue', new Time(12, 30))
      last.element.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: null }))
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on blur ignores focus moving between segments', async () => {
      const { wrapper, segments } = await createForm(['blur'])
      const [first, second] = segments

      first!.element.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: second!.element }))
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(InputTime, {
      props: {
        modelValue: new Time(12, 30)
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
