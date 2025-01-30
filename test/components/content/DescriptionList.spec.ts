import { describe, it, expect } from 'vitest'
import DescriptionList, { type DescriptionListProps, type DescriptionListSlots } from '../../../src/runtime/components/content/DescriptionList.vue'
import ComponentRender from '../../component-render'

describe('DescriptionList', () => {
  const items = [
    {
      label: 'Item 1',
      // @todo fix this ////
      // avatar: { src: 'https://github.com/benjamincanac.png' },
      content: 'This is the content shown for Item 1'
    },
    {
      label: 'Item 2',
      // @todo fix this ////
      // icon: 'i-lucide-user',
      content: 'And, this is the content for Item 2'
    },
    {
      label: 'Item 3',
      // @todo fix this ////
      // icon: 'i-lucide-bell',
      content: 'Finally, this is the content for Item3',
      slot: 'custom'
    }
  ]

  const props = { items }

  it.each([
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with items', { props }],
    ['with class', { props: { ...props, class: '' } }],
    ['with b24ui', { props: { ...props, b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DescriptionListProps<typeof items[number]>, slots?: Partial<DescriptionListSlots<typeof items[number]>> }) => {
    const html = await ComponentRender(nameOrHtml, options, DescriptionList)
    expect(html).toMatchSnapshot()
  })
})
