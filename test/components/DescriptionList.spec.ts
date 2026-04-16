import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DescriptionList from '../../src/runtime/components/DescriptionList.vue'
import { renderEach } from '../component-render'
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

  renderEach(DescriptionList, [
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with items', { props }],
    ['with class', { props: { ...props, class: '' } }],
    ['with b24ui', { props: { ...props, b24ui: { text: 'font-(--ui-font-weight-bold)' } } }],
    ['with empty items', { props: { items: [] } }],
    ['with labelKey and descriptionKey', { props: { items: [{ name: 'Item 1', desc: 'Description 1' }], labelKey: 'name', descriptionKey: 'desc' } }],
    ['with icon only', { props: { items: [{ label: 'Item', icon: SignIcon }] } }],
    ['with avatar only', { props: { items: [{ label: 'Item', avatar: { src: 'https://github.com/bitrix24.png' } }] } }],
    ['with multiple actions', { props: { items: [{ label: 'Item', description: 'Desc', actions: [{ label: 'Action 1' }, { label: 'Action 2' }] }] } }],
    ['with orientation horizontal', { props: { items: [{ label: 'Item', description: 'Desc', orientation: 'horizontal' }] } }],
    ['with orientation vertical', { props: { items: [{ label: 'Item', description: 'Desc', orientation: 'vertical' }] } }],
    ['with slot property', { props: { items: [{ label: 'Item', slot: 'custom' }] }, slots: { custom: () => 'Custom slot content' } }],
    ['with item class', { props: { items: [{ label: 'Item', class: 'font-bold' }] } }],
    ['with item b24ui', { props: { items: [{ label: 'Item', b24ui: { label: 'text-red-500' } }] } }],
    ['with legend and text', { props: { legend: 'Legend', text: 'Some text', items: [] } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DescriptionList, {
      props: {
        items: [
          {
            label: 'Accessibility item',
            description: 'This is a description for accessibility test',
            icon: SignIcon,
            avatar: { src: 'https://github.com/bitrix24.png', alt: 'Avatar' },
            actions: [{ label: 'Action' }]
          }
        ]
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
