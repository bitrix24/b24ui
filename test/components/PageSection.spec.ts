import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PageSection from '../../src/runtime/components/PageSection.vue'
import type { PageSectionProps, PageSectionSlots } from '../../src/runtime/components/PageSection.vue'
import ComponentRender from '../component-render'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-b24/Bitrix24Icon'

describe('PageSection', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with headline', { props: { headline: 'Headline' } }],
    ['with icon', { props: { icon: Bitrix24Icon } }],
    ['with title', { props: { title: 'Title' } }],
    ['with description', { props: { description: 'Description' } }],
    ['with links', { props: { links: [{ label: 'Get started' }] } }],
    ['with features', { props: { features: [{ title: 'Title', description: 'Description', icon: Bitrix24Icon }] } }],
    ['with features and title', { props: { features: [{ title: 'Title', description: 'Description', icon: Bitrix24Icon }], title: 'Title' } }],
    ['with features and description', { props: { features: [{ title: 'Title', description: 'Description', icon: Bitrix24Icon }], description: 'Description' } }],
    ['with links and features', { props: { links: [{ label: 'Get started' }], features: [{ title: 'Title', description: 'Description', icon: Bitrix24Icon }] } }],
    ['with reverse', { props: { reverse: true } }],
    ['with orientation horizontal', { props: { orientation: 'horizontal' as const } }],
    ['with orientation horizontal links', { props: { orientation: 'horizontal' as const, links: [{ label: 'Get started' }] } }],
    ['with orientation horizontal features', { props: { orientation: 'horizontal' as const, features: [{ title: 'Title', description: 'Description', icon: Bitrix24Icon }] } }],
    ['with orientation horizontal reverse', { props: { orientation: 'horizontal' as const, reverse: true } }],
    ['with class', { props: { class: 'absolute' } }],
    ['with b24ui', { props: { b24ui: { container: 'max-w-5xl' } } }],
    // Slots
    ['with top slot', { slots: { top: () => 'Top slot' } }],
    ['with header slot', { slots: { header: () => 'Header slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with headline slot', { slots: { headline: () => 'Headline slot' } }],
    ['with title slot', { slots: { title: () => 'Title slot' } }],
    ['with description slot', { slots: { description: () => 'Description slot' } }],
    ['with body slot', { slots: { body: () => 'Body slot' } }],
    ['with features slot', { slots: { features: () => 'Features slot' } }],
    ['with footer slot', { slots: { footer: () => 'Footer slot' } }],
    ['with links slot', { slots: { links: () => 'Links slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with bottom slot', { slots: { bottom: () => 'Bottom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PageSectionProps, slots?: Partial<PageSectionSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PageSection)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageSection, {
      props: {
        headline: 'News',
        icon: Bitrix24Icon,
        title: 'Title',
        description: 'Description',
        links: [{ label: 'Read More', to: '/read' }],
        features: [{ title: 'Feature', description: 'Feature description', icon: Bitrix24Icon }]
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
