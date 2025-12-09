import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises, mount } from '@vue/test-utils'
import Select from '../../src/runtime/components/Select.vue'
import type { SelectProps, SelectSlots } from '../../src/runtime/components/Select.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/input'
import { renderForm } from '../utils/form'
import type { FormInputEvents } from '../../src/module'
import { expectEmitPayloadType } from '../utils/types'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

describe('Select', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const variants = [] as any

  const items = [{
    label: 'Backlog',
    value: 'backlog',
    icon: Search2Icon,
    color: 'air-primary-copilot' as const
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
    value: 'done',
    icon: Search2Icon
  }, {
    label: 'Canceled',
    value: 'canceled',
    icon: Search2Icon
  }]

  const itemsWithDescription = [...items.map(item => ({ ...item, description: 'Description' }))]

  const props = { open: true, portal: false, items }

  it.each([
    // Props
    ['with items', { props }],
    ['with items with description', { props: { ...props, items: itemsWithDescription } }],
    ['with modelValue', { props: { ...props, modelValue: items[0]?.value } }],
    ['with defaultValue', { props: { ...props, defaultValue: items[0]?.value } }],
    ['with valueKey', { props: { ...props, valueKey: 'label' } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    ['with descriptionKey', { props: { ...props, descriptionKey: 'description' } }],
    ['with multiple', { props: { ...props, multiple: true } }],
    ['with multiple and modelValue', { props: { ...props, multiple: true, modelValue: [items[0], items[1]] } }],
    ['with id', { props: { ...props, id: 'id' } }],
    ['with name', { props: { ...props, name: 'name' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with required', { props: { ...props, required: true } }],
    ['with icon', { props: { icon: Shining2Icon } }],
    ['with leading and icon', { props: { leading: true, icon: Shining2Icon } }],
    ['with leadingIcon', { props: { leadingIcon: Shining2Icon } }],
    ['with trailingIcon', { props: { trailingIcon: Shining2Icon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, leadingIcon: Shining2Icon } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, trailingIcon: Shining2Icon } }],
    ['with loading', { props: { loading: true } }],
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: Shining2Icon } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: Shining2Icon } }],
    ['with selectedIcon', { props: { ...props, selectedIcon: Shining2Icon } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    // @todo fix this ////
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { ...props, variant } }]),
    // @todo fix this ////
    ...variants.map((variant: string) => [`with success variant ${variant}`, { props: { ...props, variant, color: 'air-primary-success' } }]),
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with class', { props: { ...props, class: 'rounded-full' } }],
    ['with b24ui', { props: { ...props, b24ui: { group: 'p-2' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-description slot', { props: { ...props, items: itemsWithDescription }, slots: { 'item-description': () => 'Item description slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SelectProps, slots?: Partial<SelectSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Select)
    expect(html).toMatchSnapshot()
  })

  it.each([
    ['with .trim modifier', { props: { modelModifiers: { trim: true } } }, { input: 'input  ', expected: 'input' }],
    ['with .number modifier', { props: { modelModifiers: { number: true } } }, { input: '42', expected: 42 }],
    ['with .nullable modifier', { props: { modelModifiers: { nullable: true } } }, { input: null, expected: null }],
    ['with .optional modifier', { props: { modelModifiers: { optional: true } } }, { input: undefined, expected: undefined }]
  ])('%s works', async (_nameOrHtml: string, options: { props?: any, slots?: any }, spec: { input: any, expected: any }) => {
    const wrapper = mount(Select, {
      ...options
    })

    const select = wrapper.findComponent({ name: 'SelectRoot' })
    await select.setValue(spec.input)

    expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[spec.expected]] })
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Select, {
      props: {
        ...props,
        modelValue: items[0]?.value,
        required: true,
        avatar: {
          src: 'https://github.com/bitrix24.png',
          alt: 'Some User'
        }
      },
      attrs: {
        'aria-label': 'Select an item'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
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
          <B24Select id="input" v-model="state.value" :items="items" />
        </B24FormField>
        `
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

      // with groups, multiple, mixed types and valueKey
      expectEmitPayloadType('update:modelValue', () => Select({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
        valueKey: 'value' // TODO: value is already the default valueKey
      })).toEqualTypeOf<[string | number]>()
    })
  })
})
