import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Input, { type InputProps, type InputSlots } from '../../src/runtime/components/Input.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/input'

import { renderForm } from '../utils/form'
import type { FormInputEvents } from '~/src/module'

describe('Input', () => {
  const sizes = Object.keys(theme.variants.size) as any
  // @todo fix this
  const variants = []

  it.each([
    // Props
    ['with id', { props: { id: 'id' } }],
    ['with name', { props: { name: 'name' } }],
    ['with type', { props: { type: 'password' } }],
    ['with placeholder', { props: { placeholder: 'Search...' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with required', { props: { required: true } }],
    ['with file type', { props: { type: 'file' } }],
    // @todo fix this ////
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
    ['with avatar', { props: { avatar: { src: 'https://github.com/IgorShevchik.png' } } }],
    // @todo fix this ////
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/IgorShevchik.png' }, leadingIcon: 'i-lucide-arrow-left' } }],
    // @todo fix this ////
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/IgorShevchik.png' }, trailingIcon: 'i-lucide-arrow-right' } }],
    ['with loading', { props: { loading: true } }],
    // @todo fix this ////
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/IgorShevchik.png' } } }],
    ['with loading trailing', { props: { loading: true, trailing: true } }],
    // @todo fix this ////
    ['with loading trailing and avatar', { props: { loading: true, trailing: true, avatar: { src: 'https://github.com/IgorShevchik.png' } } }],
    // @todo fix this ////
    ['with loadingIcon', { props: { loading: true, loadingIcon: 'i-lucide-sparkles' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { variant } }]),
    ...variants.map((variant: string) => [`with neutral variant ${variant}`, { props: { variant, color: 'neutral' } }]),
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'absolute' } }],
    ['with b24ui', { props: { b24ui: { base: 'rounded-full' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: InputProps, slots?: Partial<InputSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Input)
    expect(html).toMatchSnapshot()
  })

  it.each([
    ['with .trim modifier', { props: { modelModifiers: { trim: true } } }, { input: 'input  ', expected: 'input' }],
    ['with .number modifier', { props: { modelModifiers: { number: true } } }, { input: '42', expected: 42 }],
    ['with .lazy modifier', { props: { modelModifiers: { lazy: true } } }, { input: 'input', expected: 'input' }]
  ])('%s works', async (_nameOrHtml: string, options: { props?: any, slots?: any }, spec: { input: any, expected: any }) => {
    const wrapper = mount(Input, {
      ...options
    })

    const input = wrapper.find('input')
    await input.setValue(spec.input)

    expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[spec.expected]] })
  })

  test('with .lazy modifier updates on change only', async () => {
    const wrapper = mount(Input, {
      props: {
        modelModifiers: { lazy: true }
      }
    })

    const input = wrapper.find('input')
    await input.trigger('update')
    expect(wrapper.emitted()).toMatchObject({ })

    await input.trigger('change')
    expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['']] })
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(Input)
      const input = wrapper.find('input')
      await input.setValue('bob@dylan.com')
      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['bob@dylan.com']] })
    })

    test('change event', async () => {
      const wrapper = mount(Input)
      const input = wrapper.find('input')
      await input.setValue('bob@dylan.com')
      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })

    test('blur event', async () => {
      const wrapper = mount(Input)
      const input = wrapper.find('input')
      await input.trigger('blur')
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
            if (state.value !== 'valid')
              return [{ name: 'value', message: 'Error message' }]
            return []
          }
        },
        slotTemplate: `
        <B24FormField name="value" :eager-validation="eagerValidation">
          <B24Input id="input" v-model="state.value" />
        </B24FormField>
        `,
        slotVars: {
          eagerValidation
        }
      })
      const input = wrapper.find('#input')
      return {
        wrapper,
        input
      }
    }

    test('validate on blur works', async () => {
      const { input, wrapper } = await createForm(['blur'])
      await input.trigger('blur')
      expect(wrapper.text()).toContain('Error message')

      await input.setValue('valid')
      await input.trigger('blur')
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change'])
      await input.trigger('change')
      expect(wrapper.text()).toContain('Error message')

      input.setValue('valid')
      await input.trigger('change')
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input'], true)
      await input.setValue('value')
      expect(wrapper.text()).toContain('Error message')

      await input.setValue('valid')
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on input without eager validation works', async () => {
      const { input, wrapper } = await createForm(['input'])

      await input.setValue('value')
      expect(wrapper.text()).not.toContain('Error message')

      await input.trigger('blur')

      await input.setValue('value')
      expect(wrapper.text()).toContain('Error message')

      await input.setValue('valid')
      expect(wrapper.text()).not.toContain('Error message')
    })
  })
})
