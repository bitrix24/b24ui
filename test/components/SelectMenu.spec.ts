import { describe, it, expect, test } from 'vitest'
import SelectMenu, { type SelectMenuProps, type SelectMenuSlots } from '../../src/runtime/components/SelectMenu.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/input'
import { renderForm } from '../utils/form'
import { flushPromises, mount } from '@vue/test-utils'
import type { FormInputEvents } from '~/src/module'
import { expectEmitPayloadType } from '../utils/types'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

describe('SelectMenu', () => {
  const sizes = Object.keys(theme.variants.size) as any
  // const variants = [] as any

  const items = [{
    label: 'Backlog',
    value: 'backlog',
    icon: Search2Icon,
    color: 'collab'
  }, {
    label: 'Todo',
    value: 'todo',
    icon: Search2Icon
  }, {
    label: 'In Progress',
    value: 'in_progress',
    icon: Search2Icon
  }, {
    label: 'Done',
    value: 'done'
  }, {
    label: 'Canceled',
    value: 'canceled'
  }]

  const props = { open: true, portal: false, items }

  it.each([
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: items[0] } }],
    ['with defaultValue', { props: { ...props, defaultValue: items[0] } }],
    ['with valueKey', { props: { ...props, valueKey: 'value' } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    ['with multiple', { props: { ...props, multiple: true } }],
    ['with multiple and modelValue', { props: { ...props, multiple: true, modelValue: [items[0], items[1]] } }],
    ['with id', { props: { ...props, id: 'id' } }],
    ['with name', { props: { ...props, name: 'name' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['without searchInput', { props: { ...props, searchInput: false } }],
    ['with searchInput placeholder', { props: { ...props, searchInput: { placeholder: 'Filter items...' } } }],
    ['with searchInput icon', { props: { ...props, searchInput: { icon: Search2Icon } } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with required', { props: { ...props, required: true } }],
    ['with icon', { props: { icon: Shining2Icon } }],
    ['with leading and icon', { props: { leading: true, icon: Shining2Icon } }],
    ['with leadingIcon', { props: { leadingIcon: Shining2Icon } }],
    ['with trailing and icon', { props: { trailing: true, icon: Shining2Icon } }],
    ['with trailingIcon', { props: { trailingIcon: Shining2Icon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, leadingIcon: Shining2Icon } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, trailingIcon: Shining2Icon } }],
    ['with loading', { props: { loading: true } }],
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with loading trailing', { props: { loading: true, trailing: true } }],
    ['with loading trailing and avatar', { props: { loading: true, trailing: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: Shining2Icon } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: Shining2Icon } }],
    ['with selectedIcon', { props: { ...props, selectedIcon: Shining2Icon } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    // @todo fix this
    // ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { ...props, variant } }]),
    // @todo fix this
    // ...variants.map((variant: string) => [`with success variant ${variant}`, { props: { ...props, variant, color: 'success' } }]),
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with class', { props: { ...props, class: 'rounded-full' } }],
    ['with b24ui', { props: { ...props, b24ui: { group: 'p-2' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with create-item-label slot', { props: { ...props, searchTerm: 'New value', createItem: true }, slots: { 'create-item-label': () => 'Create item slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SelectMenuProps, slots?: Partial<SelectMenuSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, SelectMenu)
    expect(html).toMatchSnapshot()
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(SelectMenu, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['Option 1']] })
    })

    test('change event', async () => {
      const wrapper = mount(SelectMenu, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })

    test('blur event', async () => {
      const wrapper = mount(SelectMenu, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
      await input.vm.$emit('update:open', false)
      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] })
    })
  })

  describe('form integration', async () => {
    async function createForm(validateOn?: FormInputEvents[]) {
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
        <B24FormField name="value">
          <B24SelectMenu id="input" v-model="state.value" :items="items" />
        </B24FormField>
        `
      })
      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
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

    test('should have the correct types', () => {
      // with object item
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [{ label: 'foo', value: 'bar' }]
      })).toEqualTypeOf<[{ label: string, value: string }]>()

      // with object item and multiple
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [{ label: 'foo', value: 1 }],
        multiple: true
      })).toEqualTypeOf<[{ label: string, value: number }[]]>()

      // with object item and valueKey
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [{ label: 'foo', value: 'bar' }],
        valueKey: 'value'
      })).toEqualTypeOf<[string]>()

      // with object item and multiple and valueKey
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [{ label: 'foo', value: 1 }],
        multiple: true,
        valueKey: 'value'
      })).toEqualTypeOf<[number[]]>()

      // with object item and object valueKey
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [{ label: 'foo', value: { id: 1, name: 'bar' } }],
        valueKey: 'value'
      })).toEqualTypeOf<[{ id: number, name: string }]>()

      // with string item
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: ['foo']
      })).toEqualTypeOf<[string]>()

      // with string item and multiple
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: ['foo'],
        multiple: true
      })).toEqualTypeOf<[string[]]>()

      // with groups
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [['foo']]
      })).toEqualTypeOf<[string]>()

      // with groups and multiple
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [['foo']],
        multiple: true
      })).toEqualTypeOf<[string[]]>()

      // with groups, multiple and mixed types
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
        multiple: true
      })).toEqualTypeOf<[(string | number | { value: string } | { value: number })[]]>()

      // with groups, multiple, mixed types and valueKey
      expectEmitPayloadType('update:modelValue', () => SelectMenu({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
        multiple: true,
        valueKey: 'value'
      })).toEqualTypeOf<[(string | number)[]]>()
    })
  })
})
