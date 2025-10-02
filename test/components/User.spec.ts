import { describe, it, expect } from 'vitest'
import User from '../../src/runtime/components/User.vue'
import type { UserProps, UserSlots } from '../../src/runtime/components/User.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/user'

describe('User', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const orientations = Object.keys(theme.variants.orientation) as any

  const props = {
    name: 'User name',
    description: 'User description',
    avatar: { src: 'https://github.com/bitrix24.png', alt: 'User alt' }
  }

  it.each([
    // Props
    ['with name', { props: { name: props.name } }],
    ['with description', { props: { name: props.name, description: props.description } }],
    ['with to', { props: { ...props, to: 'https://github.com/bitrix24' } }],
    ['with avatar', { props }],
    ['with chip', { props: { ...props, chip: { color: 'success' } } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { ...props, orientation } }]),
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'absolute' } }],
    ['with b24ui', { props: { ...props, b24ui: { name: 'font-bold' } } }],
    // Slots
    ['with avatar slot', { props, slots: { avatar: () => 'Avatar slot' } }],
    ['with name slot', { props, slots: { name: () => 'Name slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: UserProps, slots?: Partial<UserSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, User)
    expect(html).toMatchSnapshot()
  })
})
