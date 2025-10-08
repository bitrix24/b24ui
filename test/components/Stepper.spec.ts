import { describe, it, expect } from 'vitest'
import Stepper from '../../src/runtime/components/Stepper.vue'
import type { StepperProps, StepperSlots } from '../../src/runtime/components/Stepper.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/stepper'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Stepper', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const items = [
    {
      title: 'Address',
      description: 'Add your address here',
      icon: SignIcon
    }, {
      title: 'Shipping',
      description: 'Set your preferred shipping method',
      icon: Cross30Icon
    }, {
      slot: 'custom',
      title: 'Checkout',
      description: 'Confirm your order'
    }
  ]

  const props = { items }

  it.each([
    // Props
    ['with items', { props }],
    ['with defaultValue', { props: { ...props, defaultValue: 1 } }],
    ['with modelValue', { props: { ...props, modelValue: 1 } }],
    ['with air-primary color', { props: { ...props, color: 'air-primary' } }],
    ...sizes.map((size: string) => [`with size ${size} horizontal`, { props: { ...props, size } }]),
    ...sizes.map((size: string) => [`with size ${size} vertical`, { props: { ...props, size, orientation: 'vertical' } }]),
    ['without linear', { props: { ...props, linear: false } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'gap-8' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'font-bold' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with indicator slot', { props, slots: { indicator: () => 'Indicator slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: StepperProps, slots?: Partial<StepperSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Stepper)
    expect(html).toMatchSnapshot()
  })
})
