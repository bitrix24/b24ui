import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Avatar from '../../src/runtime/components/Avatar.vue'
import theme from '#build/b24ui/avatar'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('Avatar', () => {
  const sizes = Object.keys(theme.variants.size) as any

  renderEach(Avatar, [
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
    ['with class', { props: { class: 'bg-default' } }],
    ['with b24ui', { props: { b24ui: { fallback: 'font-bold' } } }],
    ['with custom size', { props: { class: 'size-100', src: 'https://github.com/bitrix24.png' } }],
    // Slots
    ['with default slot', { slots: { default: '🚀' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        alt: 'Some user',
        src: 'https://github.com/bitrix24.png'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
