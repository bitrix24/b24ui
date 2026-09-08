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
    // `label` is a precondition, not decoration: the hint renders inside the
    // label row, and the component only draws that row when there is a label.
    // Without one both of these rendered nothing and were byte-identical to
    // `with b24ui` (#454, #462).
    ['with hint', { props: { label: 'Username', hint: 'Use letters, numbers, and special characters' } }],
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
    ['with hint slot', { props: { label: 'Username' }, slots: { hint: () => 'Hint slot' } }],
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

      // The `with hint slot` and `with description slot` snapshot cases render
      // the slot and stop there. What the docs promise is stronger: that
      // reaching for the slot costs nothing — the block keeps its id, and the
      // control keeps pointing at it. A refactor that rendered slotted content
      // outside the `:id` wrapper would leave both snapshots green and take the
      // announcement away.
      test.each([
        ['hint', 'v-0-0-hint'],
        ['description', 'v-0-0-description']
      ])('keeps the aria-describedby association through the #%s slot', async (slot, describedby) => {
        const wrapper = await renderFormField({
          // `label` is not decoration here: the hint lives inside the label
          // row, which the component only renders when there is a label to
          // put it next to. Without one, `#hint` renders nothing at all — as
          // the `with hint slot` snapshot case has been quietly recording.
          props: { label: 'Label', [slot]: 'From the prop' },
          slots: { [slot]: () => 'From the slot' },
          inputComponent
        })

        const block = wrapper.find(`[id=${describedby}]`)
        expect(block.exists()).toBe(true)
        expect(block.text()).toBe('From the slot')
        expect(wrapper.find(`[aria-describedby~=${describedby}]`).exists()).toBe(true)
      })

      // The counterpart, and the one the first version of these tests was
      // missing. Setting prop *and* slot passes on the strength of the prop —
      // it cannot see whether the slot contributes anything to
      // `aria-describedby`. Until #497 it did not: the attribute was built
      // from the props handed down through `provide`, and slots were not in
      // there at all, so slotted text sat on screen undescribed.
      test.each([
        ['hint', 'v-0-0-hint'],
        ['description', 'v-0-0-description'],
        ['help', 'v-0-0-help']
      ])('renders the #%s slot with no prop, and announces it', async (slot, blockId) => {
        const wrapper = await renderFormField({
          // `label` only so the hint row exists at all; it is not what is
          // under test here.
          props: { label: 'Label' },
          slots: { [slot]: () => 'From the slot' },
          inputComponent
        })

        expect(wrapper.find(`[id=${blockId}]`).text()).toBe('From the slot')

        const control = wrapper.find('[aria-invalid]')
        expect(control.attributes('aria-describedby')).toBe(blockId)
      })

      // The mirror image, and the direction that produced a dangling
      // reference: the prop is set, but the hint needs a label row to live in
      // and there is none, so nothing is drawn. The pre-existing `binds hints
      // with aria-describedby` spec below asserts the attribute is on the
      // control and stops there, which is why this went unnoticed until #497.
      test('omits the hint from aria-describedby when no hint was drawn', async () => {
        const wrapper = await renderFormField({
          props: { hint: 'From the prop' },
          inputComponent
        })

        expect(wrapper.find('[id=v-0-0-hint]').exists()).toBe(false)
        expect(wrapper.find('[aria-invalid]').attributes('aria-describedby')).toBeUndefined()
      })

      test.each(['hint', 'description'])('passes the %s prop into its slot', async (slot) => {
        const wrapper = await renderFormField({
          props: { label: 'Label', [slot]: 'From the prop' },
          slots: { [slot]: (payload: Record<string, string | undefined>) => `got ${payload[slot]}` },
          inputComponent
        })

        expect(wrapper.text()).toContain('got From the prop')
      })

      // `#error` is not a drop-in replacement for the prop, and the docs say so
      // with a recommended pattern. These pin the two halves of that claim,
      // because getting either wrong is silent: the page still renders, it is
      // only the announcement that goes missing.
      //
      // First half — the trap. An `#error` slot with no error value renders the
      // block anyway and takes `help` with it. Before #497 the aria wiring was
      // computed from the props, so the control advertised
      // `aria-describedby="…-help"` — an element no longer in the document —
      // while the error nobody described sat on screen in red. Now the
      // attribute names the block that actually drew.
      //
      // `aria-invalid` stays `false` on purpose: it reports the field's error
      // state, and there is none. The `#error` slot's `v-if` is satisfied by
      // the slot merely existing, so keying invalidity off it would mark every
      // field invalid for anyone who supplies the slot as markup. The
      // recommended pattern below is what sets it.
      test('renders #error with no error, and describes the block it drew', async () => {
        const wrapper = await renderFormField({
          props: { help: 'Help text' },
          slots: { error: () => 'Slotted error' },
          inputComponent
        })

        expect(wrapper.find('[id=v-0-0-error]').text()).toBe('Slotted error')
        expect(wrapper.find('[id=v-0-0-help]').exists()).toBe(false)

        const control = wrapper.find('[aria-invalid]')
        expect(control.attributes('aria-invalid')).toBe('false')
        expect(control.attributes('aria-describedby')).toBe('v-0-0-error')
      })

      // Second half — the pattern the docs recommend. `error` bound to `false`
      // when there is nothing wrong, to the message when there is; the slot
      // supplies markup only.
      test('honours #error and keeps help when error is bound to false', async () => {
        const wrapper = await renderFormField({
          props: { error: false, help: 'Help text' },
          slots: { error: ({ error }: { error: string | undefined }) => `got ${error}` },
          inputComponent
        })

        expect(wrapper.find('[id=v-0-0-error]').exists()).toBe(false)
        expect(wrapper.find('[id=v-0-0-help]').text()).toBe('Help text')

        const control = wrapper.find('[aria-invalid]')
        expect(control.attributes('aria-invalid')).toBe('false')
        expect(control.attributes('aria-describedby')).toBe('v-0-0-help')
      })

      test('renders #error with the message when error is bound to a string', async () => {
        const wrapper = await renderFormField({
          props: { error: 'Boom', help: 'Help text' },
          slots: { error: ({ error }: { error: string | undefined }) => `got ${error}` },
          inputComponent
        })

        expect(wrapper.find('[id=v-0-0-error]').text()).toBe('got Boom')
        expect(wrapper.find('[id=v-0-0-help]').exists()).toBe(false)

        const control = wrapper.find('[aria-invalid]')
        expect(control.attributes('aria-invalid')).toBe('true')
        // `help` is the `v-else-if` of the error branch, so it did not draw and
        // is not named — before #497 the attribute read `…-error …-help`.
        expect(control.attributes('aria-describedby')).toBe('v-0-0-error')
      })

      // The third direction of #497, and the one no test covered. `error` is
      // `boolean | string`; `true` marks the field invalid without a message,
      // so the error block — which needs a string — never draws. The attribute
      // used to name it anyway, because the props-derived list only asked
      // whether `error` was truthy.
      test('marks the field invalid without describing an error that has no message', async () => {
        const wrapper = await renderFormField({
          props: { error: true, help: 'Help text' },
          inputComponent
        })

        expect(wrapper.find('[id=v-0-0-error]').exists()).toBe(false)

        const control = wrapper.find('[aria-invalid]')
        expect(control.attributes('aria-invalid')).toBe('true')
        // `help` still draws: `hasError` is false, so it is not behind the
        // error branch.
        expect(wrapper.find('[id=v-0-0-help]').text()).toBe('Help text')
        expect(control.attributes('aria-describedby')).toBe('v-0-0-help')
      })

      test('passes the help prop into the #help slot', async () => {
        const wrapper = await renderFormField({
          props: { help: 'From the prop' },
          slots: { help: ({ help }: { help: string | undefined }) => `got ${help}` },
          inputComponent
        })

        expect(wrapper.find('[id=v-0-0-help]').text()).toBe('got From the prop')
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

    // `label` is not scenery. Without it the hint row is never drawn, and this
    // spec used to pass anyway: it asked whether the control carries the
    // attribute, never whether the id it names exists. That is how the
    // dangling reference above stayed invisible for as long as it did — a test
    // for an association that only checked one end of it.
    test('binds hints with aria-describedby', async () => {
      const wrapper = await renderFormField({
        props: { label: 'Label', hint: 'somehint' },
        inputComponent
      })

      const attr = wrapper.find('[aria-describedby=v-0-0-hint]')
      expect(attr.exists()).toBe(true)
      expect(wrapper.find('[id=v-0-0-hint]').text()).toBe('somehint')
    })

    // Sound as written, unlike the hint above: the description block renders
    // outside the label row, so it exists whether or not there is a label.
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
