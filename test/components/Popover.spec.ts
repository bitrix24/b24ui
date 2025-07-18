import { describe, it, expect } from 'vitest'
import Popover, { type PopoverProps, type PopoverSlots } from '../../src/runtime/components/Popover.vue'
import ComponentRender from '../component-render'

describe('Popover', () => {
  const props = { open: true, portal: false }

  it.each([
    // Props
    ['with open', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with class', { props: { ...props, class: 'shadow-xl' } }],
    ['with b24ui', { props: { ...props, b24ui: { content: 'shadow-xl' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with anchor slot', { props, slots: { anchor: () => 'Anchor slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PopoverProps, slots?: Partial<PopoverSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Popover)
    expect(html).toMatchSnapshot()
  })
})
