import { describe, it, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import type { AppConfig } from '@nuxt/schema'
import NavigationMenu from '../../src/runtime/components/NavigationMenu.vue'
import type { ComponentConfig } from '../../src/runtime/types/tv'
import { expectSlotProps } from '../utils/types'
import theme from '#build/b24ui/navigation-menu'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

type NavigationMenu = ComponentConfig<typeof theme, AppConfig, 'navigationMenu'>

describe('NavigationMenu', () => {
  const orientations = Object.keys(theme.variants.orientation) as any

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

  renderEach(NavigationMenu, [
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: 'item-0' } }],
    ['with defaultValue', { props: { ...props, defaultValue: 'item-0' } }],
    ['with valueKey', { props: { ...props, valueKey: 'label', defaultValue: 'Documentation' } }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with arrow', { props: { ...props, arrow: true, modelValue: 'item-0' } }],
    ['with orientation vertical', { props: { ...props, orientation: 'vertical', modelValue: 'item-0' } }],
    ['with orientation vertical and collapsed', { props: { ...props, orientation: 'vertical', modelValue: 'item-0', collapsed: true } }],
    ['with content orientation vertical', { props: { ...props, contentOrientation: 'vertical', modelValue: 'item-0' } }],
    ...orientations.map((orientation: string) => [`with content orientation ${orientation}`, { props: { ...props, orientation } }]),
    [`with def`, { props: { ...props } }],
    ['with chip', { props: { items: [[{ label: 'Guide', icon: Cross30Icon, chip: true }, { label: 'Components', icon: SignIcon, chip: { color: 'air-primary' } }]] } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: SignIcon } }],
    ['with externalIcon', { props: { ...props, externalIcon: Cross30Icon } }],
    ['without externalIcon', { props: { ...props, externalIcon: false } }],
    ['with unmountOnHide', { props: { ...props, unmountOnHide: false } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with b24ui', { props: { ...props, b24ui: { linkTrailingIcon: 'size-4' } } }],
    // // Slots
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(NavigationMenu, {
      props: {
        items,
        modelValue: 'item-0'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('grouped children (#51)', () => {
    // `items` accepts a flat array or an array of arrays, so reaching for the
    // same shape on `children` is the natural guess — and it used to fail in
    // total silence: every child `v-for` handed an array to a template
    // expecting an object, so the vertical accordion opened onto nothing. The
    // links are what the author wanted; render them, and warn that the
    // grouping itself is dropped.
    const links = [{ label: 'Link A', to: '/a' }, { label: 'Link B', to: '/b' }]

    const mountVertical = (children: any) => mountSuspended(NavigationMenu, {
      props: {
        orientation: 'vertical',
        items: [{ label: 'Docs', defaultOpen: true, children }]
      } as any
    })

    it('renders the same children flat or grouped', async () => {
      const flat = await mountVertical(links)
      const grouped = await mountVertical([links])

      for (const wrapper of [flat, grouped]) {
        expect(wrapper.html()).toContain('Link A')
        expect(wrapper.html()).toContain('Link B')
      }
    })

    it('warns that the grouping was dropped, once per item', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

      try {
        await mountVertical([links])

        // Only asserted where `import.meta.dev` is actually true — in the plain
        // Vue project it is undefined, and a warning nobody sees is not worth
        // failing the build over.
        if (import.meta.dev) {
          const messages = warn.mock.calls.map(([first]) => String(first)).filter(m => m.includes('B24NavigationMenu'))
          expect(messages).toHaveLength(1)
          expect(messages[0]).toContain('Docs')
        }
      } finally {
        warn.mockRestore()
      }
    })

    it('leaves a flat children array alone', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

      try {
        await mountVertical(links)

        expect(warn.mock.calls.map(([first]) => String(first)).filter(m => m.includes('B24NavigationMenu'))).toEqual([])
      } finally {
        warn.mockRestore()
      }
    })
  })

  test('should have the correct types', () => {
    // normal
    expectSlotProps('item', () => NavigationMenu({
      items: [{ label: 'foo', value: 'bar' }]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active: boolean, b24ui: NavigationMenu['b24ui'] }>()

    // groups
    expectSlotProps('item', () => NavigationMenu({
      items: [[{ label: 'foo', value: 'bar' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active: boolean, b24ui: NavigationMenu['b24ui'] }>()

    // custom
    expectSlotProps('item', () => NavigationMenu({
      items: [{ label: 'foo', value: 'bar', custom: 'nice' }]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active: boolean, b24ui: NavigationMenu['b24ui'] }>()

    // custom + groups
    expectSlotProps('item', () => NavigationMenu({
      items: [[{ label: 'foo', value: 'bar', custom: 'nice' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active: boolean, b24ui: NavigationMenu['b24ui'] }>()
  })
})
