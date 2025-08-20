import { describe, it, expect } from 'vitest'
import Kbd from '../../src/runtime/components/Kbd.vue'
import type { KbdProps, KbdSlots } from '../../src/runtime/components/Kbd.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/kbd'

describe('Kbd', () => {
  const sizes = Object.keys(theme.variants.size) as any
  // const depths = Object.keys(theme.variants.depth) as any

  it.each([
    // Props
    ['with value', { props: { value: 'K' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { value: 'K', size } }]),
    // ...depths.map((depth: string) => [`with depth ${depth}`, { props: { value: 'K', depth } }]),
    ['with as', { props: { value: 'K', as: 'span' } }],
    ['with class', { props: { value: 'K', class: 'font-bold' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: KbdProps, slots?: Partial<KbdSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Kbd)
    expect(html).toMatchSnapshot()
  })
})
