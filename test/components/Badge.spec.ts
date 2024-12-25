import { describe, it, expect } from 'vitest'
import Badge, { type BadgeProps, type BadgeSlots } from '../../src/runtime/components/Badge.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/badge'

describe('Badge', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const depths = Object.keys(theme.variants.depth) as any

  it.each([
    // Props
    ['with label', { props: { label: 'Badge' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Badge', size } }]),
    ...depths.map((depth: string) => [`with primary depth ${depth}`, { props: { label: 'Badge', depth } }]),
    ...depths.map((depth: string) => [`with success depth ${depth}`, { props: { label: 'Badge', depth, color: 'success' } }]),
    // @todo fix this ////
    ['with icon', { props: { icon: 'i-lucide-rocket' } }],
    // @todo fix this ////
    ['with leading and icon', { props: { leading: true, icon: 'i-lucide-arrow-left' } }],
    // @todo fix this ////
    ['with leadingIcon', { props: { leadingIcon: 'i-lucide-arrow-left' } }],
    // @todo fix this ////
    ['with trailing and icon', { props: { trailing: true, icon: 'i-lucide-arrow-right' } }],
    // @todo fix this ////
    ['with trailingIcon', { props: { trailingIcon: 'i-lucide-arrow-right' } }],
    // @todo fix this ////
    ['with avatar', { props: { avatar: { src: 'https://github.com/benjamincanac.png' } } }],
    // @todo fix this ////
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/benjamincanac.png' }, leadingIcon: 'i-lucide-arrow-left' } }],
    // @todo fix this ////
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/benjamincanac.png' }, trailingIcon: 'i-lucide-arrow-right' } }],
    ['with as', { props: { label: 'Badge', as: 'div' } }],
    ['with class', { props: { label: 'Badge', class: 'rounded-full font-bold' } }],
    ['with b24ui', { props: { label: 'Badge', b24ui: { label: 'font-bold' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: BadgeProps, slots?: Partial<BadgeSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Badge)
    expect(html).toMatchSnapshot()
  })
})
