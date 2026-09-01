import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import SelectMenu from '../../src/runtime/components/SelectMenu.vue'
import theme from '#build/b24ui/input'
import { renderForm } from '../utils/form'
import { flushPromises, mount } from '@vue/test-utils'
import type { FormInputEvents } from '../../src/module'
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
    value: 'done'
  }, {
    label: 'Canceled',
    value: 'canceled'
  }]

  const itemsWithDescription = [...items.map(item => ({ ...item, description: 'Description' }))]

  const props = { open: true, portal: false, items }

  renderEach(SelectMenu, [
    // Props
    ['with items', { props }],
    ['with items with description', { props: { ...props, items: itemsWithDescription } }],
    ['with modelValue', { props: { ...props, modelValue: items[0] } }],
    ['with defaultValue', { props: { ...props, defaultValue: items[0] } }],
    ['with valueKey', { props: { ...props, valueKey: 'label', defaultValue: 'Backlog' } }],
    ['with by', { props: { ...props, by: 'value', defaultValue: items[0] } }],
    ['with labelKey', { props: { ...props, labelKey: 'value' } }],
    // Inherited from upstream, not a porting slip: `descriptionKey: 'description'`
    // sets the prop to the value it already has, on items carrying no such
    // field — byte-identical to `with items` (#454). Reading the description out
    // of `label` proves the *key* is what the component looks up.
    ['with descriptionKey', { props: { ...props, items: itemsWithDescription, descriptionKey: 'label' } }],
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
    ['with trailingIcon', { props: { trailingIcon: Shining2Icon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, leadingIcon: Shining2Icon } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, trailingIcon: Shining2Icon } }],
    ['with loading', { props: { loading: true } }],
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: Shining2Icon } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: Shining2Icon } }],
    ['with selectedIcon', { props: { ...props, selectedIcon: Shining2Icon } }],
    ['with clear', { props: { ...props, clear: true, modelValue: items[0] } }],
    ['with clear and clearIcon', { props: { ...props, clear: true, clearIcon: Shining2Icon, modelValue: items[0] } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with virtualize', { props: { ...props, virtualize: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ['with highlight', { props: { ...props, highlight: true } }],
    ['with highlight air-primary-success', { props: { ...props, color: 'air-primary-success', highlight: true } }],
    ['with ariaLabel', { props, attrs: { 'aria-label': 'Aria label' } }],
    ['with class', { props: { ...props, class: 'rounded-full' } }],
    ['with b24ui', { props: { ...props, b24ui: { group: 'p-2' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-description slot', { props: { ...props, items: itemsWithDescription }, slots: { 'item-description': () => 'Item description slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with create-item-label slot', { props: { ...props, searchTerm: 'New value', createItem: true }, slots: { 'create-item-label': () => 'Create item slot' } }]
  ])

  renderEach(
    SelectMenu,
    [
      ['with .trim modifier', { props: { modelModifiers: { trim: true } } }, { input: 'input  ', expected: 'input' }],
      ['with .number modifier', { props: { modelModifiers: { number: true } } }, { input: '42', expected: 42 }],
      ['with .nullable modifier', { props: { modelModifiers: { nullable: true } } }, { input: null, expected: null }],
      ['with .optional modifier', { props: { modelModifiers: { optional: true } } }, { input: undefined, expected: undefined }]
    ],
    '%s works', async (_, options, spec) => {
      const wrapper = mount(SelectMenu, {
        ...options
      })

      const selectMenu = wrapper.findComponent({ name: 'ComboboxRoot' })
      await selectMenu.setValue(spec.input)

      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[spec.expected]] })
    }
  )

  it('with trailing false should not render trailing section', () => {
    const wrapper = mount(SelectMenu, {
      props: {
        ...props,
        trailing: false
      }
    })

    expect(wrapper.find('[data-slot="trailing"]').exists()).toBe(false)
    expect(wrapper.find('[data-slot="trailingIcon"]').exists()).toBe(false)
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(SelectMenu, {
      props: {
        ...props,
        modelValue: items[0]

      }
    })
    expect(await axe(wrapper.element, {
      rules: {
        // "Certain ARIA roles must contain particular children (aria-required-children)"

        // Fix any of the following:
        //   Element has children which are not allowed: div[tabindex]
        'aria-required-children': { enabled: false }
      }
    })).toHaveNoViolations()
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
      input.vm.$emit('update:open', false)
      expect(wrapper.emitted()).toMatchObject({ blur: [[{ type: 'blur' }]] })
    })
  })

  describe('search input', () => {
    // Focus, not markup: nothing rendered differs, so no snapshot can show this.
    // These read `document.activeElement`, hence `attachTo: document.body`.
    //
    // What they cover, stated exactly, because it is less than it looks.
    // They pin the observable contract — `searchInput: { autofocus: false }`
    // leaves the search input unfocused on open — and they reach it through
    // `Input.vue`'s own autofocus, which runs on a macrotask. That much is real:
    // rewriting `props.autofocus` to `true` in Input.vue turns the second one
    // red.
    //
    // They do NOT cover the `@mount-auto-focus` handler ported alongside them.
    // That was measured rather than assumed: instrumenting `onMountAutoFocus`
    // shows it called **zero** times here, because reka's `FocusScope` does not
    // emit `mountAutoFocus` under happy-dom. Removing the handler, inverting its
    // condition, or making it `preventDefault()` unconditionally all leave these
    // green. The handler guards the browser path, where `FocusScope` does focus
    // the first focusable descendant — which is this input — and that path has
    // no test here at all.
    //
    // The selector is `input[data-slot="input"]`, not upstream's
    // `[data-slot="input"] input`: this fork puts the slot attribute on the
    // control itself rather than on a wrapper, so the descendant form matches
    // nothing and the assertion would fail on an empty wrapper rather than on
    // the behaviour.
    const openWith = async (searchInput?: Record<string, unknown>) => {
      const wrapper = mount(SelectMenu, {
        attachTo: document.body,
        props: { open: true, portal: false, items: ['Option 1', 'Option 2'], ...(searchInput ? { searchInput } : {}) }
      })

      await flushPromises()
      // Input.vue's autofocus runs on a macrotask
      await new Promise(resolve => setTimeout(resolve))

      return wrapper
    }

    test('focuses the search input when the menu opens by default', async () => {
      const wrapper = await openWith()

      expect(document.activeElement).toBe(wrapper.find('input[data-slot="input"]').element)

      wrapper.unmount()
    })

    test('does not focus the search input with searchInput autofocus disabled', async () => {
      const wrapper = await openWith({ autofocus: false })

      expect(document.activeElement).not.toBe(wrapper.find('input[data-slot="input"]').element)

      wrapper.unmount()
    })
  })

  describe('create-item', () => {
    // With `create-item`, the create item is always registered so reka-ui's collection
    // never goes from empty to non-empty, leaving the highlight stale when async items load.
    test('re-highlights first item when items change while open', async () => {
      const wrapper = mount(SelectMenu, {
        attachTo: document.body,
        props: {
          open: true,
          portal: false,
          ignoreFilter: true,
          createItem: 'always',
          multiple: true,
          items: []
        }
      })

      const root = wrapper.findComponent({ name: 'ComboboxRoot' })
      // Track open state (the watcher only re-highlights while the menu is open)
      await root.vm.$emit('update:open', true)
      await flushPromises()

      // Set the search term so the create item renders and becomes the only (highlighted) item.
      await wrapper.setProps({ searchTerm: 'a' })
      await flushPromises()

      // Items arrive asynchronously (e.g. fetched from a backend)
      await wrapper.setProps({ items: ['Option 1', 'Option 2'] })
      await flushPromises()

      const highlighted = wrapper.find('[role="option"][data-highlighted]')
      expect(highlighted.exists()).toBe(true)
      expect(highlighted.text()).toContain('Option 1')

      wrapper.unmount()
    })
  })

  describe('fixed', () => {
    // The prop's whole effect is a class that is *absent*, which is why it needs
    // an assertion rather than a snapshot case: a snapshot of `fixed: true`
    // would pin the classes without stating what the prop is for, and would go
    // on passing if the responsive rule stopped applying to Select entirely.
    //
    // The mechanism sits in `theme/input.ts`, which `theme/select.ts` extends:
    // compound variants pair `fixed: false` with each size to add a `md:text-…`
    // override, so the base class is the mobile size and the `md:` one takes
    // over above the breakpoint. Setting `fixed` drops the override and the
    // mobile size holds everywhere — which is the point, since a text input
    // below 16px makes iOS Safari zoom on focus.
    const baseClass = async (props_: Record<string, unknown>) => {
      const wrapper = await mountSuspended(SelectMenu, { props: { ...props, ...props_ } })
      return wrapper.find('[data-slot="base"]').attributes('class') ?? ''
    }

    it('applies the responsive override by default', async () => {
      expect(await baseClass({})).toMatch(/\bmd:text-\(length:/)
    })

    it('drops the responsive override when fixed', async () => {
      expect(await baseClass({ fixed: true })).not.toMatch(/\bmd:text-\(length:/)
    })

    it('keeps the mobile size itself either way', async () => {
      // Guards the obvious wrong fix: dropping the *base* size instead of the
      // override would also satisfy the assertion above, and would leave the
      // control with no size at all.
      for (const props_ of [{}, { fixed: true }]) {
        expect(await baseClass(props_)).toMatch(/(?<!md:)\btext-\(length:/)
      }
    })
  })

  describe('it should display correct label', () => {
    test.each([null, undefined, ''])('falsy model value %s should display placeholder', (modelValue) => {
      const wrapper = mount(SelectMenu, {
        props: {
          items,
          modelValue,
          placeholder: 'Select an item'
        }
      })

      expect(wrapper.text()).toBe('Select an item')
    })

    test('with string array and string value', () => {
      const wrapper = mount(SelectMenu, {
        props: {
          items: ['Apple', 'Banana', 'Cherry'],
          modelValue: 'Banana'
        }
      })

      expect(wrapper.text()).toBe('Banana')
    })

    test('with multiple and empty array value should display placeholder', () => {
      const wrapper = mount(SelectMenu, {
        props: {
          items,
          multiple: true,
          modelValue: [],
          placeholder: 'Select items'
        }
      })
      expect(wrapper.text()).toBe('Select items')
    })

    test('with falsy modelValue and options items contain falsy', () => {
      const wrapper = mount(SelectMenu, {
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
      expect(wrapper.text()).toBe('John Doe')
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
      input.vm.$emit('update:open', false)
      await flushPromises()

      expect(wrapper.text()).toContain('Error message')

      await input.setValue('Option 2')
      input.vm.$emit('update:open', false)
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
