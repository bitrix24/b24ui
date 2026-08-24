import { describe, it, expect, test } from 'vitest'
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
    // The dynamic slot fires for an item carrying `slot: 'custom'`, and no
    // fixture here had one — this was the only item-based spec with no `slot:`
    // key at all, so the case was byte-identical to four siblings (#454).
    // Upstream's spec has the same gap.
    ['with custom slot', {
      props: { ...props, items: [[{ label: 'Custom', slot: 'custom' as const }]] },
      slots: { custom: () => 'Custom slot' }
    }]
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

    const mount = (children: any, props: Record<string, any> = {}) => mountSuspended(NavigationMenu, {
      props: {
        orientation: 'vertical',
        items: [{ label: 'Docs', defaultOpen: true, children }],
        ...props
      } as any
    })

    // `getChildren()` feeds three call sites. Two are reachable from here: the
    // vertical accordion, and the horizontal dropdown once `unmountOnHide` is
    // false so its content is force-mounted rather than portalled on open. The
    // third — the popover shown when a collapsed vertical menu has children —
    // needs a real open interaction and is not covered.
    it.each([
      ['vertical accordion', {}],
      ['horizontal dropdown', { orientation: 'horizontal', unmountOnHide: false }]
    ])('renders children flat or grouped alike — %s', async (_name, props) => {
      const flat = await mount(links, props)
      const grouped = await mount([links], props)

      for (const wrapper of [flat, grouped]) {
        expect(wrapper.html()).toContain('Link A')
        expect(wrapper.html()).toContain('Link B')
      }
    })

    it('keeps `defaultOpen` working on a grouped child', async () => {
      // `getAccordionDefaultValue` was the fourth read of `item.children` and
      // the first pass missed it: it reduced over the nested arrays, which
      // carry no `defaultOpen`, so a grouped child rendered but never opened —
      // and the values it produced no longer lined up with the flattened index
      // the rows are keyed by.
      //
      // Counted rather than matched on a substring: the parent item is itself
      // `defaultOpen`, so `data-state="open"` appears either way and asserting
      // its presence proves nothing.
      const openStates = (wrapper: { html: () => string }) => (wrapper.html().match(/data-state="open"/g) || []).length

      const child = { label: 'Link B', to: '/b', defaultOpen: true }
      const a = { label: 'Link A', to: '/a' }

      const groupedOpen = await mount([[a, child]])
      const flatOpen = await mount([a, child])
      const groupedClosed = await mount([[a, { label: 'Link B', to: '/b' }]])

      expect(openStates(groupedOpen)).toBe(openStates(flatOpen))
      expect(openStates(groupedOpen)).toBeGreaterThan(openStates(groupedClosed))
    })

    it('survives a hole in a group instead of throwing', async () => {
      // `.flat()` un-nests but keeps `null`, which then reaches
      // `pickLinkProps` -> `Object.keys(null)`. Before the flattening existed
      // the same input was merely inert, so tolerating the shape has to include
      // tolerating what is in it.
      const wrapper = await mount([[{ label: 'Link A', to: '/a' }, null, undefined]])

      expect(wrapper.html()).toContain('Link A')
    })

    // The dev warning itself is not asserted anywhere, deliberately:
    // `import.meta.dev` compiles to `undefined` in the `vue` project and
    // `false` in the `nuxt` one, so the branch is unreachable from this suite
    // and any assertion about it would pass whether it fired or not.
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
