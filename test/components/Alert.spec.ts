import { describe, it, expect } from 'vitest'
import Alert from '../../src/runtime/components/Alert.vue'
import type { AlertProps, AlertSlots } from '../../src/runtime/components/Alert.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Alert', () => {
  const props = { title: 'Alert' }

  it.each([
    // Props
    ['with title', { props }],
    ['with description', { props: { ...props, description: 'Description' } }],
    ['with icon', { props: { ...props, icon: SignIcon } }],
    ['with avatar', { props: { ...props, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with actions', { props: { ...props, actions: [{ label: 'Action' }] } }],
    ['with orientation vertical', { props: { ...props, icon: SignIcon, description: 'This is a description', actions: [{ label: 'Action' }], orientation: 'vertical' as const } }],
    ['with orientation horizontal', { props: { ...props, icon: SignIcon, description: 'This is a description', actions: [{ label: 'Action' }], orientation: 'horizontal' as const } }],
    ['with close', { props: { ...props, close: true } }],
    ['with closeIcon', { props: { ...props, close: true, closeIcon: Cross30Icon } }],
    [`with success`, { props: { ...props, color: 'success' as const } }],
    ['with as', { props: { ...props, as: 'article' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'font-bold' } } }],
    // Slots
    ['with leading slot', { props, slots: { title: () => 'Leading slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with close slot', { props, slots: { close: () => 'Close slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: AlertProps, slots?: Partial<AlertSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Alert)
    expect(html).toMatchSnapshot()
  })
})
