import { describe, it, expect } from 'vitest'
import CommandPalette from '../../src/runtime/components/CommandPalette.vue'
import type { CommandPaletteProps, CommandPaletteSlots } from '../../src/runtime/components/CommandPalette.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('CommandPalette', () => {
  const groups = [
    {
      id: 'actions',
      items: [{
        label: 'Add new file',
        suffix: 'Create a new file in the current directory or workspace.',
        icon: SignIcon,
        kbds: ['meta', 'N'],
        active: true
      },
      {
        label: 'Add new folder',
        suffix: 'Create a new folder in the current directory or workspace.',
        icon: Cross30Icon,
        kbds: ['meta', 'F']
      },
      {
        label: 'Add hashtag',
        suffix: 'Add a hashtag to the current item.',
        icon: SignIcon,
        kbds: ['meta', 'H'],
        disabled: true
      },
      {
        label: 'Add label',
        suffix: 'Add a label to the current item.',
        icon: Cross30Icon,
        kbds: ['meta', 'L'],
        slot: 'custom'
      }
      ]
    },
    {
      id: 'labels',
      label: 'Labels',
      items: [
        {
          label: 'bug',
          chip: {
            color: 'air-primary-alert'
          }
        },
        {
          label: 'feature',
          chip: {
            color: 'air-primary-success'
          }
        },
        {
          label: 'enhancement',
          chip: {
            color: 'air-secondary'
          }
        }
      ]
    },
    {
      id: 'users',
      label: 'Users',
      items: [{
        label: 'bitrix24',
        avatar: {
          src: 'https://github.com/bitrix24.png'
        },
        to: 'https://github.com/bitrix24',
        target: '_blank'
      }]
    }
  ]

  const props = { groups }

  it.each([
    // Props
    ['with groups', { props }],
    ['without data', {}],
    ['with modelValue', { props: { ...props, modelValue: groups[2]?.items[0] } }],
    ['with defaultValue', { props: { ...props, defaultValue: groups[2]?.items[0] } }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with icon', { props: { ...props, icon: Cross30Icon } }],
    ['with loading', { props: { ...props, loading: true } }],
    ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: SignIcon } }],
    ['with selectedIcon', { props: { ...props, selectedIcon: Cross30Icon, modelValue: groups[2]?.items[0] } }],
    ['with close', { props: { ...props, close: true } }],
    ['with closeIcon', { props: { ...props, close: true, closeIcon: SignIcon } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'divide-(--ui-color-accent-main-success)' } }],
    ['with b24ui', { props: { ...props, b24ui: { input: '[&>input]:h-10' } } }],
    // Slots
    ['with empty slot', { props, slots: { empty: () => 'Empty slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }],
    ['with close slot', { props: { ...props, close: true }, slots: { close: () => 'Close slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: CommandPaletteProps, slots?: Partial<CommandPaletteSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, CommandPalette)
    expect(html).toMatchSnapshot()
  })
})
