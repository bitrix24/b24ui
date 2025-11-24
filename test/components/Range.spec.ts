import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Range from '../../src/runtime/components/Range.vue'
import type { RangeProps } from '../../src/runtime/components/Range.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/range'
import { flushPromises, mount } from '@vue/test-utils'
import { renderForm } from '../utils/form'
import type { FormInputEvents } from '../../src/module'

describe('Range', () => {
  const sizes = Object.keys(theme.variants.size) as any

  it.each([
    // Props
    ['with modelValue', { props: { modelValue: 10 } }],
    ['with defaultValue', { props: { defaultValue: 10 } }],
    ['with multiple thumbs', { props: { defaultValue: [0, 10] } }],
    ['with name', { props: { name: 'custom-name' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with inverted', { props: { inverted: true } }],
    ['with orientation vertical', { props: { orientation: 'vertical' as const } }],
    ['with min max step', { props: { min: 4, max: 12, step: 2 } }],
    ['with min steps between thumbs', { props: { defaultValue: [0, 30], minStepsBetweenThumbs: 30 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with color success', { props: { color: 'air-primary-success', defaultValue: 10 } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'w-48' } }],
    ['with b24ui', { props: { b24ui: { track: 'bg-red-200' } } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: RangeProps }) => {
    const html = await ComponentRender(nameOrHtml, options, Range)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Range, {
      props: {
        modelValue: 10
      }
    })
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('emits', () => {
    test('update:modelValue event', async () => {
      const wrapper = mount(Range)

      const input = wrapper.findComponent({ name: 'SliderRoot' })
      input.vm.$emit('update:modelValue', 1)

      expect(wrapper.emitted()).toMatchObject({ 'update:modelValue': [[1], [1]] })
    })

    test('change event', async () => {
      const wrapper = mount(Range)

      const input = wrapper.findComponent({ name: 'SliderRoot' })
      input.vm.$emit('valueCommit')

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
            if (state.value < 20)
              return [{ name: 'value', message: 'Error message' }]
            return []
          }
        },
        slotTemplate: `
        <B24FormField name="value">
          <B24Range v-model="state.value" />
        </B24FormField>
        `
      })
      const input = wrapper.findComponent({ name: 'SliderRoot' })
      return {
        wrapper,
        input
      }
    }

    test('validate on change works', async () => {
      const { input, wrapper } = await createForm(['change'])

      await input.setValue(10)
      input.vm.$emit('valueCommit')
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.setValue(40)
      input.vm.$emit('valueCommit')
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })

    test('validate on input works', async () => {
      const { input, wrapper } = await createForm(['input'])
      await input.setValue(10)
      await flushPromises()
      expect(wrapper.text()).toContain('Error message')

      await input.setValue(40)
      await flushPromises()
      expect(wrapper.text()).not.toContain('Error message')
    })
  })
})
