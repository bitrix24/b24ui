import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Avatar from '../../src/runtime/components/Avatar.vue'
import type { AvatarProps, AvatarSlots } from '../../src/runtime/components/Avatar.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/avatar'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('Avatar', () => {
  const sizes = Object.keys(theme.variants.size) as any

  it.each([
    // Props
    ['with src', { props: { src: 'https://github.com/bitrix24.png' } }],
    ['with alt', { props: { alt: 'bitrix24' } }],
    ['with text', { props: { text: '+1' } }],
    ['with icon', { props: { icon: Search2Icon } }],
    ['with chip', { props: { chip: { text: '1' } } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { src: 'https://github.com/bitrix24.png', size } }]),
    ['with as', { props: { as: 'section' } }],
    ['with as (object)', { props: { src: 'https://github.com/bitrix24.png', as: { root: 'section', img: 'p' } } }],
    ['with as (partial object)', { props: { src: 'https://github.com/bitrix24.png', as: { img: 'p' } } }],
    ['with class', { props: { class: 'bg-white' } }],
    ['with b24ui', { props: { b24ui: { fallback: 'font-bold' } } }],
    // Slots
    ['with default slot', { slots: { default: '🚀' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: AvatarProps, slots?: AvatarSlots }) => {
    const html = await ComponentRender(nameOrHtml, options, Avatar)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        src: 'https://github.com/bitrix24.png',
        alt: 'Some user'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
