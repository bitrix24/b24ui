import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import PageFeature from '../../src/runtime/components/PageFeature.vue'
import theme from '#build/b24ui/page-feature'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('PageFeature', () => {
  const orientations = Object.keys(theme.variants.orientation) as any

  const props = {
    title: 'Title',
    description: 'Description',
    icon: Search2Icon
  }

  renderEach(PageFeature, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with icon', { props: { icon: Search2Icon } }],
    ['with title', { props: { title: 'Title' } }],
    ['with description', { props: { description: 'Description' } }],
    ['with to', { props: { to: 'https://github.com/bitrix24' } }],
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { ...props, orientation } }]),
    ['with class', { props: { ...props, class: 'rounded-xl' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'font-bold' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageFeature, {
      props: {
        title: 'Title',
        description: 'Description',
        icon: Search2Icon,
        to: 'https://github.com/bitrix24'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
