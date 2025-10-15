import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Banner from '../../src/runtime/components/Banner.vue'
import type { BannerProps, BannerSlots } from '../../src/runtime/components/Banner.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Banner', () => {
  const props = { id: 'banner' }

  it.each([
    // Props
    ['with id', { props }],
    ['with title', { props: { ...props, title: 'Title' } }],
    ['with icon', { props: { ...props, title: 'Title', icon: SignIcon } }],
    ['with close', { props: { ...props, close: true } }],
    ['with actions', { props: { ...props, title: 'Title', icon: SignIcon, actions: [{ label: 'Learn more', trailingIcon: Cross30Icon }] } }],
    ['with to', { props: { ...props, to: '/getting-started' } }],
    ['with target', { props: { ...props, to: 'https://github.com/bitrix24/b24ui/', target: '_blank' } }],
    ['with air-tertiary color', { props: { ...props, title: 'Title', icon: SignIcon, color: 'air-tertiary' as const } }],
    ['with closeIcon', { props: { ...props, closeIcon: SignIcon } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'z-10' } }],
    ['with b24ui', { props: { ...props, b24ui: { container: 'gap-6' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with actions slot', { props, slots: { actions: () => 'Actions slot' } }],
    ['with close slot', { props, slots: { close: () => 'Close slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: BannerProps, slots?: Partial<BannerSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Banner)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Banner, {
      props: {
        id: 'banner',
        title: 'Title',
        icon: SignIcon,
        actions: [{ label: 'Learn more', icon: Cross30Icon }],
        close: true
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
