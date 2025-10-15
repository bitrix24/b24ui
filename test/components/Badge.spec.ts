import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Badge from '../../src/runtime/components/Badge.vue'
import type { BadgeProps, BadgeSlots } from '../../src/runtime/components/Badge.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/badge'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('Badge', () => {
  const sizes = Object.keys(theme.variants.size) as any

  it.each([
    // Props
    ['with label', { props: { label: 'Badge' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { label: 'Badge', size } }]),
    ['with icon', { props: { icon: SignIcon } }],
    ['with leading and icon', { props: { leading: true, icon: SignIcon } }],
    ['with leadingIcon', { props: { leadingIcon: SignIcon } }],
    ['with trailingIcon', { props: { trailingIcon: SignIcon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with avatar and leadingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, leadingIcon: SignIcon } }],
    ['with avatar and trailingIcon', { props: { avatar: { src: 'https://github.com/bitrix24.png' }, trailingIcon: SignIcon } }],
    ['with square', { props: { label: 'Badge', square: true } }],
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

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Badge, {
      props: {
        label: 'Badge',
        icon: SignIcon,
        leadingIcon: SignIcon,
        trailingIcon: SignIcon,
        avatar: { src: 'https://github.com/bitrix24.png' }
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
