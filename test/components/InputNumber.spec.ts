import { describe, it, expect, test } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { reactive } from 'vue'
import InputNumber, { type InputNumberProps, type InputNumberSlots } from '../../src/runtime/components/InputNumber.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/input-number'
import type { FormInputEvents } from '~/src/module'
import { renderForm } from '../utils/form'
import ArrowToTheLeftIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheLeftIcon'
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'

describe('InputNumber', () => {
  const sizes = Object.keys(theme.variants.size) as any
  // @todo fix this
  // const variants = []

  it.each([
    // Props
    ['with name', { props: { name: 'name' } }],
    ['with placeholder', { props: { placeholder: 'Number...' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with required', { props: { required: true } }],
    ['with orientation vertical', { props: { orientation: 'vertical' } }],
    ['with incrementIcon', { props: { incrementIcon: ArrowToTheLeftIcon } }],
    ['with decrementIcon', { props: { decrementIcon: ArrowToTheRightIcon } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    // @todo fix this
    // ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { variant } }]),
    // @todo fix this
    // ...variants.map((variant: string) => [`with success variant ${variant}`, { props: { variant, color: 'success' } }]),
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'absolute' } }],
    ['with b24ui', { props: { b24ui: { base: 'rounded-full' } } }],
    // Slots
    ['with increment slot', { slots: { increment: () => '+' } }],
    ['with decrement slot', { slots: { decrement: () => '-' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: InputNumberProps, slots?: Partial<InputNumberSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, InputNumber)
    expect(html).toMatchSnapshot()
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
