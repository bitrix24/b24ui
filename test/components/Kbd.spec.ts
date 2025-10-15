import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Kbd from '../../src/runtime/components/Kbd.vue'
import type { KbdProps, KbdSlots } from '../../src/runtime/components/Kbd.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/kbd'

describe('Kbd', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const accents = Object.keys(theme.variants.accent) as any

  it.each([
    // Props
    ['with value', { props: { value: 'K' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { value: 'K', size } }]),
    ...accents.map((accent: string) => [`with accent ${accent}`, { props: { value: 'K', accent } }]),
    ['with as', { props: { value: 'K', as: 'span' } }],
    ['with class', { props: { value: 'K', class: 'font-(--ui-font-weight-bold)' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: KbdProps, slots?: Partial<KbdSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Kbd)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Kbd, {
      props: {
        value: 'K'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
