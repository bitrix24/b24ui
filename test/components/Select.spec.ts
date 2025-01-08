import { describe, it, expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Select, { type SelectProps, type SelectSlots } from '../../src/runtime/components/Select.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/input'
import { renderForm } from '../utils/form'
import type { FormInputEvents } from '~/src/module'
import { expectEmitPayloadType } from '../utils/types'

describe('Select', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const variants = Object.keys(theme.variants.variant) as any

  const items = [{
    label: 'Backlog',
    value: 'backlog',
    // @todo fix this ////
    icon: 'i-lucide-circle-help'
  }, {
    label: 'Todo',
    value: 'todo',
    icon: 'i-lucide-circle-plus'
  }, {
    label: 'In Progress',
    value: 'in_progress',
    icon: 'i-lucide-circle-arrow-up'
  }, {
    label: 'Done',
    value: 'done',
    icon: 'i-lucide-circle-check'
  }, {
    label: 'Canceled',
    value: 'canceled',
    icon: 'i-lucide-circle-x'
  }]

  const props = { open: true, portal: false, items }

  it.each([
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: items[0] } }],
    ['with defaultValue', { props: { ...props, defaultValue: items[0] } }],
    ['with valueKey', { props: { ...props, valueKey: 'label' } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    ['with multiple', { props: { ...props, multiple: true } }],
    ['with multiple and modelValue', { props: { ...props, multiple: true, modelValue: [items[0], items[1]] } }],
    ['with id', { props: { ...props, id: 'id' } }],
    ['with name', { props: { ...props, name: 'name' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with required', { props: { ...props, required: true } }],
    ['with icon', { props: { icon: 'i-lucide-search' } }],
    // @todo fix this ////
    ['with leading and icon', { props: { leading: true, icon: 'i-lucide-arrow-left' } }],
    // @todo fix this ////
    ['with leadingIcon', { props: { leadingIcon: 'i-lucide-arrow-left' } }],
    // @todo fix this ////
    ['with trailing and icon', { props: { trailing: true, icon: 'i-lucide-arrow-right' } }],
    // @todo fix this ////
    ['with trailingIcon', { props: { trailingIcon: 'i-lucide-arrow-right' } }],
    // @todo fix this ////
    ['with avatar', { props: { avatar: { src: 'https://github.com/benjamincanac.png' } } }],
    // @todo fix this ////
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/benjamincanac.png' }, leadingIcon: 'i-lucide-arrow-left' } }],
    // @todo fix this ////
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/benjamincanac.png' }, trailingIcon: 'i-lucide-arrow-right' } }],
    ['with loading', { props: { loading: true } }],
    // @todo fix this ////
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/benjamincanac.png' } } }],
    ['with loading trailing', { props: { loading: true, trailing: true } }],
    // @todo fix this ////
    ['with loading trailing and avatar', { props: { loading: true, trailing: true, avatar: { src: 'https://github.com/benjamincanac.png' } } }],
    // @todo fix this ////
    ['with loadingIcon', { props: { loading: true, loadingIcon: 'i-lucide-sparkles' } }],
    // @todo fix this ////
    ['with trailingIcon', { props: { ...props, trailingIcon: 'i-lucide-chevron-down' } }],
    // @todo fix this ////
    ['with selectedIcon', { props: { ...props, selectedIcon: 'i-lucide-check' } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    // @todo fix this ////
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { ...props, variant } }]),
    // @todo fix this ////
    ...variants.map((variant: string) => [`with success variant ${variant}`, { props: { ...props, variant, color: 'success' } }]),
    ['with class', { props: { ...props, class: 'rounded-full' } }],
    ['with b24ui', { props: { ...props, b24ui: { group: 'p-2' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SelectProps<typeof items[number]>, slots?: Partial<SelectSlots<typeof items[number], false>> }) => {
    const html = await ComponentRender(nameOrHtml, options, Select)
    expect(html).toMatchSnapshot()
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(Select, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'SelectRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['Option 1']] })
    })

    test('change event', async () => {
      const wrapper = mount(Select, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'SelectRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })

    test('blur event', async () => {
      const wrapper = mount(Select, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'SelectRoot' })
      await input.vm.$emit('update:open', false)
      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] })
    })
  })

  describe('form integration', async () => {
    async function createForm(validateOn?: FormInputEvents[], eagerValidation?: boolean) {
      const wrapper = await renderForm({
        props: {
          validateOn,
          validateOnInputDelay: 0,
          async validate(state: any) {
            if (state.value !== 'Option 2')
              return [{ name: 'value', message: 'Error message' }]
            return []
          }
        },
        slotVars: {
          items: ['Option 1', 'Option 2']
        },
        slotTemplate: `
        <B24FormField name="value" :eager-validation="eagerValidation">
          <B24Select id="input" v-model="state.value" :items="items" />
        </B24FormField>
        `,
        slotVars: {
          eagerValidation
        }
      })
      const input = wrapper.findComponent({ name: 'SelectRoot' })
      return {
        wrapper,
        input
      }
    }

    test('validate on blur works', async () => {
      const { input, wrapper } = await createForm(['blur'])
      await input.vm.$emit('update:open', false)
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.setValue('Option 2')
      await input.vm.$emit('update:open', false)
      await flushPromises()

      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change'])

      input.setValue('Option 1')
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      input.setValue('Option 2')
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    // @todo fix this -> see test/components/Input.spec.ts
    test('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input'])

      input.setValue('Option 1')
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      input.setValue('Option 2')
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('should have the correct types', () => {
      // with object item
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [{ label: 'foo', value: 'bar' }]
      })).toEqualTypeOf<[string]>()

      // with string item
      expectEmitPayloadType('update:modelValue', () => Select({
        items: ['foo']
      })).toEqualTypeOf<[string]>()

      // with groups
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [['foo']]
      })).toEqualTypeOf<[string]>()

      // with groups and mixed types
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]]
      })).toEqualTypeOf<[string | number]>()

      // with groups, mixed types and valueKey = undefined
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
        valueKey: undefined
      })).toEqualTypeOf<[string | number]>()
    })
  })
})
