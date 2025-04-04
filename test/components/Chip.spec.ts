import { describe, it, expect } from 'vitest'
import Chip, { type ChipProps, type ChipSlots } from '../../src/runtime/components/Chip.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/chip'

describe('Chip', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const positions = Object.keys(theme.variants.position) as any

  it.each([
    // Props
    ['with text', { props: { text: 'Text' } }],
    ['with inset', { props: { inset: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...positions.map((position: string) => [`with position ${position}`, { props: { position } }]),
    ['with color ai', { props: { color: 'ai' } }],
    ['without show', { props: { show: false } }],
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'mx-auto' } }],
    ['with b24ui', { props: { b24ui: { base: 'text-base-500' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with content slot', { slots: { content: () => 'Content slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ChipProps, slots?: Partial<ChipSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Chip)
    expect(html).toMatchSnapshot()
  })
})
