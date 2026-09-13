import { reactive } from 'vue'
import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import { flushPromises } from '@vue/test-utils'
import InputNumber from '../../src/runtime/components/InputNumber.vue'
import type { FormInputEvents } from '../../src/module'
import { renderForm } from '../utils/form'
import theme from '#build/b24ui/input-number'
import ArrowToTheLeftIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheLeftIcon'
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'

describe('InputNumber', () => {
  const sizes = Object.keys(theme.variants.size) as any

  renderEach(InputNumber, [
    // Props
    ['with name', { props: { name: 'name' } }],
    ['with placeholder', { props: { placeholder: 'Number...' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with required', { props: { required: true } }],
    ['with orientation vertical', { props: { orientation: 'vertical' } }],
    ['with incrementIcon', { props: { incrementIcon: ArrowToTheLeftIcon } }],
    ['with decrementIcon', { props: { decrementIcon: ArrowToTheRightIcon } }],
    ['without increment', { props: { increment: false } }],
    ['without increment vertical', { props: { increment: false, orientation: 'vertical' } }],
    ['without decrement', { props: { decrement: false } }],
    ['without decrement vertical', { props: { decrement: false, orientation: 'vertical' } }],
    ['without increment and decrement', { props: { increment: false, decrement: false } }],
    ['without increment and decrement vertical', { props: { increment: false, decrement: false, orientation: 'vertical' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with highlight', { props: { highlight: true } }],
    ['with highlight air-primary-success', { props: { color: 'air-primary-success', highlight: true } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with .optional modifier', { props: { modelModifiers: { optional: true } } }, { input: '', expected: undefined }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'absolute' } }],
    ['with b24ui', { props: { b24ui: { base: 'rounded-full' } } }],
    // Bitrix24-only props, absent from `nuxt/ui`. `autofocus`/`autofocusDelay`
    // are left out: they move focus and change no markup.
    ['with noBorder', { props: { noBorder: true } }],
    ['with underline', { props: { underline: true } }],
    ['with rounded', { props: { rounded: true } }],
    ['with fixed', { props: { fixed: true } }],
    ['with tag', { props: { tag: 'Tag' } }],
    ['with tag and tagColor', { props: { tag: 'Tag', tagColor: 'air-primary-success' } }],
    ['with incrementDisabled', { props: { incrementDisabled: true } }],
    ['with decrementDisabled', { props: { decrementDisabled: true } }],
    ['with defaultValue', { props: { defaultValue: 7 } }],
    // Slots
    ['with increment slot', { slots: { increment: () => '+' } }],
    ['with decrement slot', { slots: { decrement: () => '-' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(InputNumber, {
      props: {
        placeholder: 'Enter a number',
        required: true,
        incrementIcon: ArrowToTheLeftIcon,
        decrementIcon: ArrowToTheRightIcon
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = await mountSuspended(InputNumber)
      const input = wrapper.findComponent({ name: 'NumberFieldRoot' })
      await input.setValue(1)
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[1]] })
      expect(1).toBe(1)
    })

    test('change event', async () => {
      const wrapper = await mountSuspended(InputNumber)
      const input = wrapper.findComponent({ name: 'NumberFieldRoot' })
      await input.setValue(1)
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })

    // The four upstream added with the fix. The first is the defect itself: with
    // only a `defaultValue` and no `v-model`, `useVModel` held its own copy and
    // the field stepped off that copy rather than off reka's internal state.
    test('increments uncontrolled defaultValue without v-model', async () => {
      const wrapper = await mountSuspended(InputNumber, { props: { defaultValue: 5 }, attachTo: document.body })
      const increment = wrapper.find('[data-slot="increment"] button')

      await increment.trigger('pointerdown')
      await increment.trigger('pointerup')
      await wrapper.find('input').trigger('blur')
      await flushPromises()

      expect(wrapper.emitted('update:modelValue')).toEqual([[6]])
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('6')

      wrapper.unmount()
    })

    // The other three pin the guard that pays for removing `useVModel`: reka
    // writes on blur, Enter and stepping at a bound whether or not the value
    // moved, so without the equality check every one of those re-emitted.
    test('emits once when controlled and blurred', async () => {
      const wrapper = await mountSuspended(InputNumber, {
        attachTo: document.body,
        props: {
          'modelValue': 5,
          'onUpdate:modelValue': (value: number | null | undefined) => wrapper.setProps({ modelValue: value })
        }
      })
      const increment = wrapper.find('[data-slot="increment"] button')

      await increment.trigger('pointerdown')
      await increment.trigger('pointerup')
      await flushPromises()
      await wrapper.find('input').trigger('blur')
      await flushPromises()

      expect(wrapper.emitted('update:modelValue')).toEqual([[6]])
      expect(wrapper.emitted('change')).toHaveLength(1)

      wrapper.unmount()
    })

    test('emits undefined once when cleared with .optional modifier', async () => {
      const wrapper = await mountSuspended(InputNumber, {
        props: {
          'modelValue': 5,
          'modelModifiers': { optional: true },
          'onUpdate:modelValue': (value: number | null | undefined) => wrapper.setProps({ modelValue: value })
        }
      })
      const input = wrapper.find('input')

      await input.setValue('')
      await input.trigger('blur')
      await flushPromises()
      await input.trigger('blur')
      await flushPromises()

      expect(wrapper.emitted('update:modelValue')).toEqual([[undefined]])
    })

    // `undefined` and `null` are different values but the same emptiness, which
    // is why the guard tests `value == null && props.modelValue == null` rather
    // than identity alone.
    test('does not emit when blurred with a null modelValue', async () => {
      const wrapper = await mountSuspended(InputNumber, { props: { modelValue: null } })

      await wrapper.find('input').trigger('blur')
      await flushPromises()

      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    test('blur event', async () => {
      const wrapper = await mountSuspended(InputNumber)
      const input = wrapper.findComponent({ name: 'NumberFieldInput' })
      await input.trigger('blur')
      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] })
    })
  })

  describe('form integration', async () => {
    async function createForm(validateOn?: FormInputEvents[]) {
      const wrapper = await renderForm({
        state: reactive({ value: 0 }),
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (state.value !== 1)
              return [{ name: 'value', message: 'Error message' }]
            return []
          }
        },
        slotTemplate: `
        <B24FormField name="value">
          <B24InputNumber id="input" v-model="state.value" />
        </B24FormField>
        `
      })
      const input = wrapper.findComponent({ name: 'NumberFieldRoot' })
      return {
        wrapper,
        input
      }
    }

    test('validate on blur works', async () => {
      const { input, wrapper } = await createForm(['blur'])
      const inputDom = wrapper.find('#input')

      await inputDom.trigger('blur')
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.setValue(1)
      await inputDom.trigger('blur')
      await flushPromises()
      expect(wrapper.html()).not.toContain('Error message')
    })

    test('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change'])

      await input.setValue(2)
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.setValue(1)
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input'])

      await input.setValue(10)
      await flushPromises()
      expect(wrapper.html()).toContain('Error message')

      await input.setValue(1)
      await flushPromises()
      expect(wrapper.html()).not.toContain('Error message')
    })
  })
})
