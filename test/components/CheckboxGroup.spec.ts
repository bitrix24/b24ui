import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { flushPromises, mount } from '@vue/test-utils'
import CheckboxGroup from '../../src/runtime/components/CheckboxGroup.vue'
import type { CheckboxGroupProps, CheckboxGroupSlots } from '../../src/runtime/components/CheckboxGroup.vue'
import type { FormInputEvents } from '../../src/module'
import ComponentRender from '../component-render'
import { renderForm } from '../utils/form'
import theme from '#build/b24ui/checkbox-group'
// import themeCheckbox from '#build/b24ui/checkbox'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('CheckboxGroup', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const variants = Object.keys(theme.variants.variant) as any

  const items = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]

  const props = { items }

  it.each([
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: ['1'] } }],
    ['with defaultValue', { props: { ...props, defaultValue: ['1'] } }],
    ['with valueKey', { props: { ...props, valueKey: 'label' } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    ['with descriptionKey', { props: { ...props, descriptionKey: 'value' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with description', { props: { items: items.map((opt, count) => ({ ...opt, description: `Description ${count}` })) } }],
    ['with required', { props: { ...props, legend: 'Legend', required: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size, defaultValue: ['1'] } }]),
    ...variants.map((variant: string) => [`with variant ${variant}`, { props: { ...props, variant, defaultValue: ['1'] } }]),
    ...variants.map((variant: string) => [`with air-primary-success variant ${variant}`, { props: { ...props, variant, color: 'air-primary-success', defaultValue: ['1'] } }]),
    ...variants.map((variant: string) => [`with horizontal variant ${variant}`, { props: { ...props, variant, orientation: 'horizontal', defaultValue: ['1'] } }]),
    ['with ariaLabel', { props, attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with b24ui', { props: { ...props, b24ui: { fieldset: 'gap-x-4', label: 'text-red' } } }],
    // Slots
    ['with legend slot', { props, slots: { legend: () => 'Legend slot' } }],
    ['with label slot', { props, slots: { label: () => 'Label slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: CheckboxGroupProps, slots?: Partial<CheckboxGroupSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, CheckboxGroup)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(CheckboxGroup, {
      props: {
        items: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' }
        ],
        legend: 'Legend'

      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(CheckboxGroup, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'CheckboxGroupRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['Option 1']] })
    })

    test('change event', async () => {
      const wrapper = mount(CheckboxGroup, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'CheckboxGroupRoot' })
      await input.setValue('Option 1')
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
            if (!state.value?.includes('Option 2'))
              return [{ name: 'value', message: 'Error message' }]
            return []
          }
        },
        slotVars: {
          items: ['Option 1', 'Option 2']
        },
        slotTemplate: `
        <B24FormField name="value" label="Checkbox group">
          <B24CheckboxGroup id="input" v-model="state.value" :items="items" />
        </B24FormField>
        `
      })
      const input = wrapper.findComponent({ name: 'CheckboxGroupRoot' })
      return {
        wrapper,
        input
      }
    }

    test('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change'])

      input.setValue(['Option 1'])
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      input.setValue(['Option 2'])
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input'])

      input.setValue(['Option 1'])
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      input.setValue(['Option 2'])
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('no label for=... on FormField', async () => {
      const { wrapper } = await createForm()
      const formFieldLabel = wrapper.findAll('label').map(label => label.attributes()).filter(label => !label.for?.includes(':'))[0]
      expect(formFieldLabel?.for).toBeUndefined()
    })
  })
})
