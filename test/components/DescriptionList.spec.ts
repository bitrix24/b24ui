import { describe, it, expect } from 'vitest'
import DescriptionList, { type DescriptionListProps, type DescriptionListSlots } from '../../src/runtime/components/DescriptionList.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('DescriptionList', () => {
  const items = [
    {
      label: 'Item 1',
      avatar: { src: 'https://github.com/bitrix24.png' },
      description: 'This is the content shown for Item 1'
    },
    {
      label: 'Item 2',
      icon: SignIcon,
      description: 'And, this is the content for Item 2'
    },
    {
      label: 'Action vertical',
      icon: SignIcon,
      description: 'And, this is the content for Action vertical',
      orientation: 'vertical' as const,
      actions: [{ label: 'Action' }]
    },
    {
      label: 'Action horizontal',
      icon: SignIcon,
      description: 'And, this is the content for Action horizontal',
      orientation: 'horizontal' as const,
      actions: [{ label: 'Action' }]
    },
    {
      label: 'Item 3',
      icon: SignIcon,
      description: 'Finally, this is the content for Item3',
      slot: 'custom'
    }
  ]

  const props = { items }

  it.each([
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with items', { props }],
    ['with class', { props: { ...props, class: '' } }],
    ['with b24ui', { props: { ...props, b24ui: { text: 'font-bold' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DescriptionListProps, slots?: Partial<DescriptionListSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, DescriptionList)
    expect(html).toMatchSnapshot()
  })
})
