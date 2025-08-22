import { describe, it, expect } from 'vitest'
import Countdown from '../../src/runtime/components/Countdown.vue'
import type { CountdownProps, CountdownSlots } from '../../src/runtime/components/Countdown.vue'
import ComponentRender from '../component-render'

describe('Countdown', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: CountdownProps, slots?: Partial<CountdownSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Countdown)
    expect(html).toMatchSnapshot()
  })
})
