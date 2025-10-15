import { describe, it, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DropdownMenu, { type DropdownMenuProps, type DropdownMenuSlots } from '../../src/runtime/components/DropdownMenu.vue'
import ComponentRender from '../component-render'
import { expectSlotProps } from '../utils/types'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
// import theme from '#build/b24ui/dropdown-menu'

describe('DropdownMenu', () => {
  const items = [
    [{
      label: 'My account',
      avatar: {
        src: 'https://github.com/bitrix24.png',
        alt: 'Some User'
      },
      type: 'label'
    }],
    [{
      label: 'Profile',
      icon: SignIcon,
      slot: 'custom'
    }, {
      label: 'Billing',
      icon: SignIcon,
      kbds: ['meta', 'b']
    }, {
      label: 'Settings',
      icon: SignIcon,
      kbds: ['?']
    }], [{
      label: 'Team',
      icon: SignIcon
    }, {
      label: 'Invite users',
      icon: SignIcon,
      children: [[{
        label: 'Invite by email',
        icon: SignIcon
      }, {
        label: 'Invite by link',
        icon: SignIcon,
        kbds: ['meta', 'i']
      }], [{
        label: 'More',
        icon: SignIcon,
        children: [{
          label: 'Import from Slack',
          icon: 'i-simple-icons-slack',
          to: 'https://slack.com',
          target: '_blank'
        }, {
          label: 'Import from Trello',
          icon: 'i-simple-icons-trello'
        }, {
          label: 'Import from Asana',
          icon: 'i-simple-icons-asana'
        }]
      }]]
    }, {
      label: 'New team',
      icon: SignIcon,
      kbds: ['meta', 'n']
    }], [{
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }, {
      label: 'Support',
      icon: SignIcon,
      to: '/components/dropdown-menu.html'
    }, {
      type: 'separator'
    }, {
      label: 'Keyboard Shortcuts',
      icon: SignIcon
    }, {
      label: 'API',
      icon: SignIcon,
      disabled: true
    }], [{
      label: 'Logout',
      color: 'error',
      icon: SignIcon,
      kbds: ['shift', 'meta', 'q']
    }]
  ]

  const props = { open: true, portal: false, items }

  it.each([
    // Props
    ['with items', { props }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with externalIcon', { props: { ...props, externalIcon: SignIcon } }],
    ['without externalIcon', { props: { ...props, externalIcon: false } }],
    ['with class', { props: { ...props, class: 'min-w-96' } }],
    ['with b24ui', { props: { ...props, b24ui: { itemLeadingIcon: 'size-4' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DropdownMenuProps, slots?: Partial<DropdownMenuSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, DropdownMenu)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DropdownMenu, {
      props
    })

    expect(await axe(wrapper.element, {
      rules: {
        // "Certain ARIA roles must contain particular children (aria-required-children)"
        //
        // Fix any of the following:
        //  Element has children which are not allowed: img[tabindex]
        'aria-required-children': { enabled: false }
      }
    })).toHaveNoViolations()
  })

  test('should have the correct types', () => {
    // normal
    expectSlotProps('item', () => DropdownMenu({
      items: [{ label: 'foo', value: 'bar' }]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active?: boolean }>()

    // groups
    expectSlotProps('item', () => DropdownMenu({
      items: [[{ label: 'foo', value: 'bar' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string }, index: number, active?: boolean }>()

    // custom
    expectSlotProps('item', () => DropdownMenu({
      items: [{ label: 'foo', value: 'bar', custom: 'nice' }]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active?: boolean }>()

    // custom + groups
    expectSlotProps('item', () => DropdownMenu({
      items: [[{ label: 'foo', value: 'bar', custom: 'nice' }]]
    })).toEqualTypeOf<{ item: { label: string, value: string, custom: string }, index: number, active?: boolean }>()
  })
})
