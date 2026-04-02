import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import { flushPromises, mount } from '@vue/test-utils'
import InputMenu from '../../src/runtime/components/InputMenu.vue'
import type { FormInputEvents } from '../../src/module'
import { renderForm } from '../utils/form'
import { expectEmitPayloadType } from '../utils/types'
import theme from '#build/b24ui/input'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('InputMenu', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const items = [{
    label: 'Backlog',
    value: 'backlog',
    icon: SignIcon,
    color: 'air-primary' as const
  }, {
    label: 'Todo',
    value: 'todo',
    icon: SignIcon
  }, {
    label: 'In Progress',
    value: 'in_progress',
    icon: SignIcon
  }, {
    label: 'Done',
    value: 'done',
    icon: SignIcon
  }, {
    label: 'Canceled',
    value: 'canceled',
    icon: SignIcon
  }]

  const itemsWithDescription = [...items.map(item => ({ ...item, description: 'Description' }))]

  const props = { open: true, portal: false, items }

  renderEach(InputMenu, [
    // Props
    ['with items', { props }],
    ['with items with description', { props: { ...props, items: itemsWithDescription } }],
    ['with modelValue', { props: { ...props, modelValue: items[0] } }],
    ['with defaultValue', { props: { ...props, defaultValue: items[0] } }],
    ['with valueKey', { props: { ...props, valueKey: 'label', defaultValue: 'Backlog' } }],
    ['with by', { props: { ...props, by: 'value', defaultValue: items[0] } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    ['with descriptionKey', { props: { ...props, descriptionKey: 'description' } }],
    ['with multiple', { props: { ...props, multiple: true } }],
    ['with multiple and modelValue', { props: { ...props, multiple: true, modelValue: [items[0], items[1]] } }],
    ['with id', { props: { ...props, id: 'id' } }],
    ['with name', { props: { ...props, name: 'name' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with required', { props: { ...props, required: true } }],
    // Autocomplete
    ['with autocomplete', { props: { ...props, autocomplete: true } }],
    ['with autocomplete and modelValue', { props: { ...props, autocomplete: true, modelValue: 'Backlog' } }],
    ['with autocomplete and defaultValue', { props: { ...props, autocomplete: true, defaultValue: 'Backlog' } }],
    ['with autocomplete and placeholder', { props: { ...props, autocomplete: true, placeholder: 'Type something...' } }],
    ['with autocomplete and content', { props: { ...props, autocomplete: true, content: { hideWhenEmpty: true } } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with leading and icon', { props: { leading: true, icon: SignIcon } }],
    ['with trailingIcon', { props: { trailingIcon: SignIcon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, leadingIcon: SignIcon } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, trailingIcon: SignIcon } }],
    ['with loading', { props: { loading: true } }],
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: SignIcon } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: SignIcon } }],
    ['with selectedIcon', { props: { ...props, selectedIcon: SignIcon } }],
    ['with clear', { props: { ...props, clear: true, modelValue: items[0] } }],
    ['with clear and clearIcon', { props: { ...props, clear: true, clearIcon: SignIcon, modelValue: items[0] } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with virtualize', { props: { ...props, virtualize: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    [`with success`, { props: { ...props, color: 'air-primary-success' } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with b24ui', { props: { ...props, b24ui: { group: 'p-2' } } }],
    // Slots
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-description slot', { props: { ...props, items: itemsWithDescription }, slots: { 'item-description': () => 'Item description slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with create-item-label slot', { props: { ...props, searchTerm: 'New value', createItem: true }, slots: { 'create-item-label': () => 'Create item slot' } }]
  ])

  renderEach(
    InputMenu,
    [
      ['with .trim modifier', { props: { modelModifiers: { trim: true } } }, { input: 'input  ', expected: 'input' }],
      ['with .number modifier', { props: { modelModifiers: { number: true } } }, { input: '42', expected: 42 }],
      ['with .nullable modifier', { props: { modelModifiers: { nullable: true } } }, { input: null, expected: null }],
      ['with .optional modifier', { props: { modelModifiers: { optional: true } } }, { input: undefined, expected: undefined }]
    ],
    '%s works',
    async (_, options, spec) => {
      const wrapper = mount(InputMenu, {
        ...options
      })

      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
      await input.setValue(spec.input)

      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[spec.expected]] })
    }
  )

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(InputMenu, {
      props: {
        items,
        modelValue: items[0],
        placeholder: 'Select an item',
        icon: SignIcon,
        trailingIcon: SignIcon,
        required: true
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(InputMenu, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['Option 1']] })
    })

    test('change event', async () => {
      const wrapper = mount(InputMenu, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })

    test('blur event', async () => {
      const wrapper = mount(InputMenu, { props: { items: ['Option 1', 'Option 2'] } })
      const input = wrapper.findComponent({ name: 'ComboboxRoot' })
      await input.vm.$emit('update:open', false)
      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] })
    })

    test('remove-tag event', async () => {
      const wrapper = mount(InputMenu, { props: { modelValue: ['Option 1'], items: ['Option 1', 'Option 2'], multiple: true } })
      const input = wrapper.findComponent({ name: 'TagsInputRoot' })
      await input.vm.$emit('remove-tag', 'Option 1')
      expect(wrapper.emitted()).toMatchObject({ 'remove-tag': [['Option 1']] })
    })

    test('update:modelValue event with autocomplete', async () => {
      const wrapper = mount(InputMenu, { props: { items: ['Option 1', 'Option 2'], autocomplete: true } })
      const input = wrapper.findComponent({ name: 'AutocompleteRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['Option 1']] })
    })

    test('change event with autocomplete', async () => {
      const wrapper = mount(InputMenu, { props: { items: ['Option 1', 'Option 2'], autocomplete: true } })
      const input = wrapper.findComponent({ name: 'AutocompleteRoot' })
      await input.setValue('Option 1')
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })

    test('searchTerm syncs when parent updates modelValue in autocomplete mode', async () => {
      const wrapper = mount(InputMenu, { props: { items: ['Option 1', 'Option 2'], autocomplete: true, modelValue: 'Option 1' } })

      await wrapper.setProps({ modelValue: 'Option 2' })

      const emissions = wrapper.emitted('update:searchTerm')
      expect(emissions).toBeTruthy()
      expect(emissions![emissions!.length - 1]).toEqual(['Option 2'])
    })
  })

  describe('it should display correct label', () => {
    test.each([null, undefined, ''])('falsy model value %s should display placeholder', (modelValue) => {
      const wrapper = mount(InputMenu, {
        props: {
          items,
          modelValue,
          placeholder: 'Select an item'
        }
      })

      expect(wrapper.find('input').attributes('placeholder')).toBe('Select an item')
    })

    test('with string array and string value', () => {
      const wrapper = mount(InputMenu, {
        props: {
          items: ['Apple', 'Banana', 'Cherry'],
          modelValue: 'Banana'
        }
      })

      expect(wrapper.find('input').element.value).toBe('Banana')
    })

    test('with multiple and empty array value should display placeholder', () => {
      const wrapper = mount(InputMenu, {
        props: {
          items,
          multiple: true,
          modelValue: [],
          placeholder: 'Select items'
        }
      })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Select items')
    })

    test('with falsy modelValue and options items contain falsy', async () => {
      const wrapper = mount(InputMenu, {
        props: {
          items: [
            {
              label: 'John Doe',
              value: null
            },
            {
              label: 'John Lennon',
              value: 1
            }
          ],
          valueKey: 'value',
          modelValue: null
        }
      })
      expect(wrapper.find('input').element.value).toBe('John Doe')
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
          <B24InputMenu id="input" v-model="state.value" :items="items" />
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
      const { wrapper, input } = await createForm(['blur'])
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
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [{ label: 'foo', value: 'bar' }]
      })).toEqualTypeOf<[{ label: string, value: string }]>()

      // with object item and multiple
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [{ label: 'foo', value: 1 }],
        multiple: true
      })).toEqualTypeOf<[{ label: string, value: number }[]]>()

      // with object item and valueKey
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [{ label: 'foo', value: 'bar' }],
        valueKey: 'value'
      })).toEqualTypeOf<[string]>()

      // with object item and multiple and valueKey
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [{ label: 'foo', value: 1 }],
        multiple: true,
        valueKey: 'value'
      })).toEqualTypeOf<[number[]]>()

      // with object item and object valueKey
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [{ label: 'foo', value: { id: 1, name: 'bar' } }],
        valueKey: 'value'
      })).toEqualTypeOf<[{ id: number, name: string }]>()

      // with string item
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: ['foo']
      })).toEqualTypeOf<[string]>()

      // with string item and multiple
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: ['foo'],
        multiple: true
      })).toEqualTypeOf<[string[]]>()

      // with groups
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [['foo']]
      })).toEqualTypeOf<[string]>()

      // with groups and multiple
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [['foo']],
        multiple: true
      })).toEqualTypeOf<[string[]]>()

      // with groups, multiple and mixed types
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
        multiple: true
      })).toEqualTypeOf<[(string | number | { value: string } | { value: number })[]]>()

      // with groups, multiple, mixed types and valueKey
      expectEmitPayloadType('update:modelValue', () => InputMenu({
        items: [['foo', { value: 1 }], [{ value: 'bar' }, 2]],
        multiple: true,
        valueKey: 'value'
      })).toEqualTypeOf<[(string | number)[]]>()
    })
  })
})
