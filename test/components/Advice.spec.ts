import { describe, it, expect } from 'vitest'
import Advice from '../../src/runtime/components/Advice.vue'
import type { AdviceProps, AdviceSlots } from '../../src/runtime/components/Advice.vue'
import ComponentRender from '../component-render'

describe('Advice', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: AdviceProps, slots?: Partial<AdviceSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Advice)
    expect(html).toMatchSnapshot()
  })
})
