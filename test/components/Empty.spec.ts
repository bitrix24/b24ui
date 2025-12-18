import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Empty from '../../src/runtime/components/Empty.vue'
import type { EmptyProps, EmptySlots } from '../../src/runtime/components/Empty.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/empty'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Empty', () => {
  const colors = Object.keys(theme.variants.color) as any
  const sizes = Object.keys(theme.variants.size) as any

  const props = {
    icon: SignIcon,
    title: 'Title',
    description: 'Description',
    actions: [{ icon: Cross30Icon, label: 'Add' }]
  }

  it.each([
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with title', { props: { icon: SignIcon, title: 'Title' } }],
    ['with description', { props: { icon: SignIcon, title: 'Title', description: 'Description' } }],
    ['with actions', { props: { icon: SignIcon, title: 'Title', description: 'Description', actions: [{ icon: Cross30Icon, label: 'Add' }] } }],
    ...colors.map((color: string) => [`with primary color ${color}`, { props: { ...props, color } }]),
    ...colors.map((color: string) => [`with inverted primary color ${color}`, { props: { ...props, inverted: true, color } }]),
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ['with class', { props: { ...props, class: 'gap-6' } }],
    ['with b24ui', { props: { ...props, b24ui: {} } }],
    // Slots
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with actions slot', { props, slots: { actions: () => 'Actions slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: EmptyProps, slots?: Partial<EmptySlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Empty)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Empty, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
