import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Textarea, { type TextareaProps, type TextareaSlots } from '../../src/runtime/components/Textarea.vue'
import ComponentRender from '../component-render'
// import theme from '#build/b24ui/textarea'
import { renderForm } from '../utils/form'
import type { FormInputEvents } from '../../src/module'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Textarea', () => {
  it.each([
    // Props
    ['with id', { props: { id: 'id' } }],
    ['with name', { props: { name: 'name' } }],
    ['with placeholder', { props: { placeholder: 'Search...' } }],
    ['with required', { props: { required: true } }],
    ['with disabled', { props: { disabled: true } }],
    ['with rows', { props: { rows: 5 } }],
    ['with icon', { props: { icon: Cross30Icon } }],
    ['with leading and icon', { props: { leading: true, icon: Cross30Icon } }],
    /**
     * @todo fix this
     */
    // ['with leadingIcon', { props: { leadingIcon: Cross30Icon } }],
    ['with trailing and icon', { props: { trailing: true, icon: Cross30Icon } }],
    ['with trailingIcon', { props: { trailingIcon: Cross30Icon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, leadingIcon: Cross30Icon } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, trailingIcon: Cross30Icon } }],
    ['with loading', { props: { loading: true } }],
    ['with loading and avatar', { props: { loading: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with loading trailing', { props: { loading: true, trailing: true } }],
    ['with loading trailing and avatar', { props: { loading: true, trailing: true, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with loadingIcon', { props: { loading: true, loadingIcon: Cross30Icon } }],
    ['with autoresize', { props: { autoresize: true } }],
    ['with primary', { props: {} }],
    ['with success', { props: { color: 'success' as const } }],
    /**
     * @todo fix this
     */
    // ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'w-48' } }],
    // @memo wrapper not exist at theme ////
    ['with b24ui', { props: { b24ui: { root: 'ms-4' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TextareaProps, slots?: Partial<TextareaSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Textarea)
    expect(html).toMatchSnapshot()
  })

  it.each([
    ['with .trim modifier', { props: { modelModifiers: { trim: true } } }, { input: 'input  ', expected: 'input' }],
    ['with .number modifier', { props: { modelModifiers: { number: true } } }, { input: '42', expected: 42 }],
    ['with .lazy modifier', { props: { modelModifiers: { lazy: true } } }, { input: 'input', expected: 'input' }],
    ['with .nullify modifier', { props: { modelModifiers: { nullify: true } } }, { input: '', expected: null }]
  ])('%s works', async (_nameOrHtml: string, options: { props?: any, slots?: any }, spec: { input: any, expected: any }) => {
    const wrapper = mount(Textarea, {
      ...options
    })

    const input = wrapper.find('textarea')
    await input.setValue(spec.input)

    expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[spec.expected]] })
  })

  test('with .lazy modifier updates on change only', async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelModifiers: { lazy: true }
      }
    })

    const input = wrapper.find('textarea')
    await input.trigger('update')
    expect(wrapper.emitted()).toMatchObject({ })

    await input.trigger('change')
    expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['']] })
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(Textarea)

      const input = wrapper.find('textarea')
      await input.setValue('bob@dylan.com')

      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [['bob@dylan.com']] })
    })

    test('change event', async () => {
      const wrapper = mount(Textarea)

      const input = wrapper.find('textarea')
      await input.setValue('bob@dylan.com')

      expect(wrapper.emitted()).toMatchObject({ change: [[{ type: 'change' }]] })
    })

    test('blur event', async () => {
      const wrapper = mount(Textarea)
      const input = wrapper.find('textarea')
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
          <B24Textarea id="input" v-model="state.value" />
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
