import { defineComponent } from 'vue'
import { describe, it, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import type { FormFieldProps } from '../../src/runtime/components/FormField.vue'
import theme from '#build/b24ui/form-field'
import {
  B24Input,
  B24RadioGroup,
  B24Textarea,
  B24Checkbox,
  B24Select,
  B24SelectMenu,
  B24InputMenu,
  B24InputNumber,
  B24Switch,
  B24Range,
  B24PinInput,
  B24FormField,
  B24FileUpload
} from '#components'

// Mock useId to force a consistent return value in Nuxt and Vue. This is required to test aria attributes.
// `vi.mock` is hoisted to the top of the module, so it must live at the top level to reflect its actual execution order.
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    useId: () => 'v-0-0' // Static value matching Nuxt's format
  }
})

const inputComponents = [
  B24Input,
  B24RadioGroup,
  B24Textarea,
  B24Checkbox,
  B24Select,
  B24SelectMenu,
  B24InputMenu,
  B24InputNumber,
  B24Switch,
  B24Range,
  B24PinInput,
  B24FileUpload
]

async function renderFormField(options: {
  props: Partial<FormFieldProps>
  inputComponent: typeof inputComponents[number]
  /** Named slots to render alongside the control, e.g. a custom `label`. */
  slots?: Record<string, (...args: any[]) => any>
}) {
  return await mountSuspended(B24FormField, {
    props: options.props,
    slots: {
      ...options.slots,
      default: {
        // @ts-expect-error - Object literal may only specify known properties, and setup does not exist in type
        setup: () => ({ inputComponent: options.inputComponent }),
        components: {
          B24FormField,
          ...inputComponents
        },
        template: `
          <component :is="inputComponent" />
        `
      }
    }
  })
}

// A wrapper component is needed here because of a conflict with the error prop / expose.
// See: https://github.com/nuxt/test-utils/issues/684
const FormFieldWrapper = defineComponent({
  components: {
    B24FormField
  },
  template: `
<B24FormField>
  <template v-for="(_, name) in $slots" #[name]="slotData">
    <slot :name="name" v-bind="slotData" />
  </template>
</B24FormField>`
})

describe('FormField', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const orientations = Object.keys(theme.variants.orientation) as any

  renderEach(FormFieldWrapper, [
    // Props
    ['with label and description', { props: { label: 'Username', description: 'Enter your username' } }],
    ['with required', { props: { label: 'Username', required: true } }],
    ['with help', { props: { help: 'Username must be unique' } }],
    ['with error', { props: { error: 'Username is already taken' } }],
    ['with hint', { props: { hint: 'Use letters, numbers, and special characters' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Username', description: 'Enter your username', size } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { label: 'Username', description: 'Enter your username', orientation } }]),
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'relative' } }],
    ['with b24ui', { props: { b24ui: { label: 'text-base-900' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with label slot', { slots: { label: () => 'Label slot' } }],
    ['with description slot', { slots: { description: () => 'Description slot' } }],
    ['with error slot', { slots: { error: () => 'Error slot' } }],
    ['with hint slot', { slots: { hint: () => 'Hint slot' } }],
    ['with help slot', { slots: { help: () => 'Help slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(FormFieldWrapper, {
      props: {
        label: 'Username',
        description: 'Enter your username',
        help: 'Username must be unique',
        hint: 'Use letters, numbers, and special characters',
        error: 'Username is already taken'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe.each(inputComponents.map(inputComponent => [(inputComponent as any).__name, inputComponent]))('%s integration', async (name: string, inputComponent: any) => {
    if (name === 'RadioGroup') {
      test('unbinds label for', async () => {
        const wrapper = await renderFormField({
          props: { label: 'Label' },
          inputComponent
        })

        const label = wrapper.find('label[for=v-0-0]')
        expect(label.exists()).toBe(false)
      })
    } else {
      test('binds label for', async () => {
        const wrapper = await renderFormField({
          props: { label: 'Label' },
          inputComponent
        })
        const label = wrapper.find('label[for=v-0-0]')
        expect(label.exists()).toBe(true)

        const input = wrapper.find('[id=v-0-0]')
        expect(input.exists()).toBe(true)
      })

      // The docs tell people to reach for `#label` when a string is not
      // enough, so the association has to survive the slot. The `with label
      // slot` snapshot case cannot see this: it renders no control, so there
      // is no `id` for `for` to point at, and a refactor that moved the
      // `<Label :for>` outside the slotted branch would leave it green.
      test('binds label for through the #label slot', async () => {
        const wrapper = await renderFormField({
          props: { label: 'Label' },
          slots: { label: () => 'Custom label' },
          inputComponent
        })
        const label = wrapper.find('label[for=v-0-0]')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Custom label')

        const input = wrapper.find('[id=v-0-0]')
        expect(input.exists()).toBe(true)
      })

      // Documented as `<template #label="{ label }">`, and until now nothing
      // asserted the payload arrives — the snapshot case ignores its argument.
      test('passes the label prop into the #label slot', async () => {
        const wrapper = await renderFormField({
          props: { label: 'Label' },
          slots: { label: ({ label }: { label: string | undefined }) => `got ${label}` },
          inputComponent
        })

        expect(wrapper.find('label').text()).toBe('got Label')
      })
    }

    if (name === 'Range') {
      // Upstream calls this component `Slider`; see PORTING.md §1. `ariaAttrs`
      // sat on `SliderRoot`, which renders no `role`, so a screen reader read
      // an invalid field as valid — the thumb is the widget, and the thumb is
      // what carries `role="slider"`.
      test('binds aria attributes on the thumb', async () => {
        const wrapper = await renderFormField({
          props: { error: 'Error' },
          inputComponent
        })

        const invalid = wrapper.findAll('[aria-invalid="true"]')
        expect(invalid).toHaveLength(1)
        expect(invalid[0]!.attributes('role')).toBe('slider')
        expect(invalid[0]!.attributes('aria-describedby')).toBe('v-0-0-error')
      })
    }

    test('binds hints with aria-describedby', async () => {
      const wrapper = await renderFormField({
        props: { hint: 'somehint' },
        inputComponent
      })

      const attr = wrapper.find('[aria-describedby=v-0-0-hint]')
      expect(attr.exists()).toBe(true)
    })

    test('binds description with aria-describedby', async () => {
      const wrapper = await renderFormField({
        props: { description: 'somedescription' },
        inputComponent
      })

      const attr = wrapper.find('[aria-describedby=v-0-0-description]')
      expect(attr.exists()).toBe(true)
    })

    test('binds error with aria-describedby', async () => {
      const wrapper = await renderFormField({
        props: { error: 'someerror' },
        inputComponent
      })

      const attr = wrapper.find('[aria-describedby=v-0-0-error]')
      expect(attr.exists()).toBe(true)
    })

    test('binds aria-invalid on error', async () => {
      const wrapper = await renderFormField({
        props: { error: 'someerror' },
        inputComponent
      })

      const attr = wrapper.find('[aria-invalid=true]')
      expect(attr.exists()).toBe(true)
    })

    test('renders id for aria describedby when help prop is provided', async () => {
      const wrapper = await renderFormField({
        props: { help: 'somehelp' },
        inputComponent
      })

      const attr = wrapper.find('[id=v-0-0-help]')
      expect(attr.exists()).toBe(true)
    })

    test('renders no id for aria describedby when no help prop is provided', async () => {
      const wrapper = await renderFormField({
        props: { label: 'Username', description: 'Enter your username' },
        inputComponent
      })

      const attr = wrapper.find('[id=v-0-0-help]')
      expect(attr.exists()).toBe(false)
    })
  })
})
