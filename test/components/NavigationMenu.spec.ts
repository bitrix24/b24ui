import { describe, it, expect, test } from 'vitest'
import NavigationMenu, { type NavigationMenuProps, type NavigationMenuSlots } from '../../src/runtime/components/NavigationMenu.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/navigation-menu'
import { expectSlotProps } from '../utils/types'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('NavigationMenu', () => {
  const variants = Object.keys(theme.variants.variant) as any

  const items = [
    [{
      label: 'Links',
      type: 'label'
    }, {
      label: 'Documentation',
      icon: SignIcon,
      badge: 10,
      children: [{
        label: 'Introduction',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: SignIcon
      }, {
        label: 'Installation',
        description: 'Learn how to install and configure Nuxt UI in your application.',
        icon: SignIcon
      }, {
        label: 'Theming',
        description: 'Learn how to customize the look and feel of the components.',
        icon: SignIcon
      }, {
        label: 'Shortcuts',
        description: 'Learn how to display and define keyboard shortcuts in your app.',
        icon: SignIcon
      }]
    }, {
      label: 'Components',
      icon: Cross30Icon,
      active: true,
      children: [{
        label: 'Link',
        icon: Cross30Icon,
        description: 'Use NuxtLink with superpowers.',
        to: '/components/link'
      }, {
        label: 'Modal',
        icon: Cross30Icon,
        description: 'Display a modal within your application.',
        to: '/components/modal'
      }, {
        label: 'NavigationMenu',
        icon: Cross30Icon,
        description: 'Display a list of links.',
        to: '/components/navigation-menu'
      }, {
        label: 'Pagination',
        icon: Cross30Icon,
        description: 'Display a list of pages.',
        to: '/components/pagination'
      }, {
        label: 'Popover',
        icon: Cross30Icon,
        description: 'Display a non-modal dialog that floats around a trigger element.',
        to: '/components/popover'
      }, {
        label: 'Progress',
        icon: Cross30Icon,
        description: 'Show a horizontal bar to indicate task progression.',
        to: '/components/progress'
      }]
    }], [{
      label: 'GitHub',
      icon: SignIcon,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }, {
      label: 'Help',
      icon: Cross30Icon,
      disabled: true
    }]
  ]

  const props = { items }

  it.each([
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: '0' } }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with arrow', { props: { ...props, arrow: true, modelValue: '0' } }],
    ['with orientation vertical', { props: { ...props, orientation: 'vertical' as const, modelValue: '0' } }],
    ['with orientation vertical and collapsed', { props: { ...props, orientation: 'vertical' as const, modelValue: '0', collapsed: true } }],
    ['with content orientation vertical', { props: { ...props, contentOrientation: 'vertical' as const, modelValue: '0' } }],
    ...variants.map((variant: string) => [`with primary variant ${variant}`, { props: { ...props, variant } }]),
    ...variants.map((variant: string) => [`with success variant ${variant}`, { props: { ...props, variant, color: 'success' } }]),
    ...variants.map((variant: string) => [`with primary variant ${variant} highlight`, { props: { ...props, variant, highlight: true } }]),
    ...variants.map((variant: string) => [`with success variant ${variant} highlight`, { props: { ...props, variant, color: 'success', highlight: true } }]),
    ...variants.map((variant: string) => [`with success variant ${variant} highlight success`, { props: { ...props, variant, color: 'success', highlight: true, highlightColor: 'success' } }]),
    ['with trailingIcon', { props: { ...props, trailingIcon: SignIcon } }],
    ['with externalIcon', { props: { ...props, externalIcon: Cross30Icon } }],
    ['without externalIcon', { props: { ...props, externalIcon: false } }],
    ['with unmountOnHide', { props: { ...props, unmountOnHide: false } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with b24ui', { props: { ...props, b24ui: { itemLeadingIcon: 'size-4' } } }],
    // Slots
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: NavigationMenuProps, slots?: Partial<NavigationMenuSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, NavigationMenu)
    expect(html).toMatchSnapshot()
  })

  test('should have the correct types', () => {
    // normal
    expectSlotProps('item', () => NavigationMenu({
      items: [{ label: 'foo', value: 'bar' }]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active?: boolean }>()

    // groups
    expectSlotProps('item', () => NavigationMenu({
      items: [[{ label: 'foo', value: 'bar' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active?: boolean }>()

    // custom
    expectSlotProps('item', () => NavigationMenu({
      items: [{ label: 'foo', value: 'bar', custom: 'nice' }]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active?: boolean }>()

    // custom + groups
    expectSlotProps('item', () => NavigationMenu({
      items: [[{ label: 'foo', value: 'bar', custom: 'nice' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active?: boolean }>()
  })
})
