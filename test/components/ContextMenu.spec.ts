import { h, defineComponent } from 'vue'
import { describe, it, expect, test } from 'vitest'
import ContextMenu from '../../src/runtime/components/ContextMenu.vue'
import type { ContextMenuProps, ContextMenuSlots } from '../../src/runtime/components/ContextMenu.vue'
import theme from '#build/b24ui/context-menu'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expectSlotProps } from '../utils/types'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

const ContextMenuWrapper = defineComponent({
  components: {
    B24ContextMenu: ContextMenu as any
  },
  inheritAttrs: false,
  template: `<B24ContextMenu v-bind="$attrs">
<span>Right Click</span>

 <template v-for="(_, name) in $slots" #[name]="slotData">
    <slot :name="name" v-bind="slotData" />
  </template>
</B24ContextMenu>`
})

describe('ContextMenu', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const items = [
    [{
      label: 'Appearance',
      children: [{
        label: 'System',
        icon: SignIcon
      }, {
        label: 'Light',
        icon: Cross30Icon
      }, {
        label: 'Dark',
        icon: SignIcon
      }]
    }], [{
      label: 'Show Sidebar',
      color: 'air-primary',
      kbds: ['meta', 'S']
    }, {
      label: 'Show Toolbar',
      kbds: ['shift', 'meta', 'D']
    }, {
      label: 'Collapse Pinned Tabs',
      disabled: true
    }], [{
      label: 'Refresh the Page'
    }, {
      label: 'Clear Cookies and Refresh'
    }, {
      label: 'Clear Cache and Refresh'
    }, {
      type: 'separator' as const
    }, {
      label: 'Developer',
      children: [[{
        label: 'View Source',
        kbds: ['option', 'meta', 'U']
      }, {
        label: 'Developer Tools',
        kbds: ['option', 'meta', 'I']
      }], [{
        label: 'Inspect Elements',
        kbds: ['option', 'meta', 'C']
      }], [{
        label: 'JavaScript Console',
        kbds: ['option', 'meta', 'J'],
        slot: 'custom'
      }]]
    }], [{
      label: 'GitHub',
      icon: Cross30Icon,
      to: 'https://github.com/bitrix24/b24ui/',
      target: '_blank'
    }]
  ]

  const props = { portal: false, items }

  it.each([
    // Props
    ['with items', { props }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ['with externalIcon', { props: { ...props, externalIcon: SignIcon } }],
    ['without externalIcon', { props: { ...props, externalIcon: false } }],
    ['with class', { props: { ...props, class: 'min-w-96' } }],
    ['with b24ui', { props: { ...props, b24ui: { itemLeadingIcon: 'size-4' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => h('span', 'Default slot') } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ContextMenuProps, slots?: Partial<ContextMenuSlots> }) => {
    const wrapper = await mountSuspended(ContextMenuWrapper, options as any)

    await wrapper.find('span').trigger('click.right')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should have the correct types', () => {
    // normal
    expectSlotProps('item', () => ContextMenu({
      items: [{ label: 'foo', value: 'bar' }]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active?: boolean }>()

    // groups
    expectSlotProps('item', () => ContextMenu({
      items: [[{ label: 'foo', value: 'bar' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active?: boolean }>()

    // custom
    expectSlotProps('item', () => ContextMenu({
      items: [{ label: 'foo', value: 'bar', custom: 'nice' }]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active?: boolean }>()

    // custom + groups
    expectSlotProps('item', () => ContextMenu({
      items: [[{ label: 'foo', value: 'bar', custom: 'nice' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active?: boolean }>()
  })
})
