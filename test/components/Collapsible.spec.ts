import { describe, it, expect } from 'vitest'
import Collapsible from '../../src/runtime/components/Collapsible.vue'
import type { CollapsibleProps, CollapsibleSlots } from '../../src/runtime/components/Collapsible.vue'
import ComponentRender from '../component-render'

describe('Collapsible', () => {
  const props = { open: true }

  it.each([
    // Props
    ['with open', { props }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with unmountOnHide', { props: { ...props, unmountOnHide: false } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with class', { props: { ...props, class: 'flex flex-col gap-2 w-48' } }],
    ['with b24ui', { props: { ...props, b24ui: { content: 'bg-success-500' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: CollapsibleProps, slots?: Partial<CollapsibleSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Collapsible)
    expect(html).toMatchSnapshot()
  })
})
