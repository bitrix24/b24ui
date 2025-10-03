import { describe, it, expect } from 'vitest'
import Breadcrumb from '../../src/runtime/components/Breadcrumb.vue'
import type { BreadcrumbProps, BreadcrumbSlots } from '../../src/runtime/components/Breadcrumb.vue'
import ComponentRender from '../component-render'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('Breadcrumb', () => {
  const items = [{
    label: 'Home',
    avatar: {
      src: 'https://github.com/bitrix24.png'
    },
    to: '/'
  }, {
    label: 'Components',
    icon: Search2Icon,
    disabled: true
  }, {
    label: 'Breadcrumb',
    to: '/components/breadcrumb',
    icon: Search2Icon,
    slot: 'custom'
  }]

  const props = { items }

  it.each([
    // Props
    ['with items', { props }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with separatorIcon', { props: { ...props, separatorIcon: Search2Icon } }],
    ['with as', { props: { ...props, as: 'div' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with b24ui', { props: { ...props, b24ui: { link: 'font-bold' } } }],
    // Slots
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }],
    ['with separator slot', { props, slots: { separator: () => '/' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: BreadcrumbProps, slots?: Partial<BreadcrumbSlots & { custom: () => 'Custom slot' }> }) => {
    const html = await ComponentRender(nameOrHtml, options, Breadcrumb)
    expect(html).toMatchSnapshot()
  })
})
