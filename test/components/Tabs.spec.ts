import { describe, it, expect } from 'vitest'
import Tabs, { type TabsProps, type TabsSlots } from '../../src/runtime/components/Tabs.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/tabs'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('Tabs', () => {
  const variants = Object.keys(theme.variants.variant) as any
  const sizes = Object.keys(theme.variants.size) as any

  const items = [{
    label: 'Tab1',
    avatar: {
      src: 'https://github.com/bitrix24.png'
    },
    content: 'This is the content shown for Tab1'
  }, {
    label: 'Tab2',
    icon: SignIcon,
    content: 'And, this is the content for Tab2'
  }, {
    label: 'Tab3',
    icon: SignIcon,
    content: 'Finally, this is the content for Tab3',
    slot: 'custom'
  }]

  const props = { items }

  it.each([
    // Props
    ['with items', { props }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with modelValue', { props: { ...props, modelValue: '1' } }],
    ['with defaultValue', { props: { ...props, defaultValue: '1' } }],
    ['with orientation vertical', { props: { ...props, orientation: 'vertical' as const } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ...variants.map((variant: string) => [`with default variant ${variant}`, { props: { ...props, variant } }]),
    ...variants.map((variant: string) => [`with success variant ${variant}`, { props: { ...props, variant, color: 'success' } }]),
    ['without content', { props: { ...props, content: false } }],
    ['with unmountOnHide', { props: { ...props, unmountOnHide: false } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'w-96' } }],
    ['with b24ui', { props: { ...props, b24ui: { content: 'w-full ring ring-red-500' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TabsProps, slots?: Partial<TabsSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Tabs)
    expect(html).toMatchSnapshot()
  })
})
