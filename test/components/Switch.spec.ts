import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Switch from '../../src/runtime/components/Switch.vue'
import theme from '#build/b24ui/switch'
import { flushPromises, mount } from '@vue/test-utils'
import { renderForm } from '../utils/form'
import type { FormInputEvents } from '../../src/module'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

describe('Switch', () => {
  const sizes = Object.keys(theme.variants.size) as any

  renderEach(Switch, [
    // Props
    ['with modelValue', { props: { modelValue: true } }],
    ['with defaultValue', { props: { defaultValue: true } }],
    ['with id', { props: { id: 'id' } }],
    ['with name', { props: { name: 'name' } }],
    ['with value', { props: { value: 'value' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with checkedIcon', { props: { checkedIcon: Search2Icon, defaultValue: true } }],
    ['with uncheckedIcon', { props: { uncheckedIcon: Shining2Icon } }],
    ['with loading', { props: { loading: true } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: Search2Icon } }],
    ['with label', { props: { label: 'Label' } }],
    ['with required', { props: { label: 'Label', required: true } }],
    ['with description', { props: { label: 'Label', description: 'Description' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with color success', { props: { color: 'air-primary-success', defaultValue: true } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'inline-flex' } }],
    ['with b24ui', { props: { b24ui: { wrapper: 'ms-4' } } }],
    // Slots
    ['with label slot', { slots: { label: () => 'Label slot' } }],
    ['with description slot', { slots: { label: () => 'Description slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Switch, {
      props: {
        modelValue: true,
        required: true,
        label: 'Label',
        description: 'Description'
      }
    })
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(Switch)
      const input = wrapper.findComponent({ name: 'SwitchRoot' })
      await input.vm.$emit('update:modelValue', true)
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[true]] })
    })

    test('change event', async () => {
      const wrapper = mount(Switch)
      const input = wrapper.findComponent({ name: 'SwitchRoot' })
      await input.vm.$emit('update:modelValue', true)
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })
  })

  describe('form integration', async () => {
    async function createForm(validateOn?: FormInputEvents[]) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (!state.value)
              return [{ name: 'value', message: 'Error message' }]
            return []
          }
        },
        slotTemplate: `
        <B24FormField name="value">
          <B24Switch v-model="state.value" />
        </B24FormField>
        `
      })
      const input = wrapper.findComponent({ name: 'SwitchRoot' })
      return {
        wrapper,
        input
      }
    }

    test('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change'])
      await input.setValue(false)
      await input.vm.$emit('update:modelValue', false)
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.vm.$emit('update:modelValue', true)
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input'])
      await input.vm.$emit('update:modelValue', false)
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.vm.$emit('update:modelValue', true)
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })
  })
})
