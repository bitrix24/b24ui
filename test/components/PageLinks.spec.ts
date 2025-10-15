import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PageLinks from '../../src/runtime/components/PageLinks.vue'
import type { PageLinksProps, PageLinksSlots } from '../../src/runtime/components/PageLinks.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('PageLinks', () => {
  const links = [{
    label: 'Documentation',
    icon: SignIcon,
    to: '/docs'
  }, {
    label: 'Playground',
    icon: SignIcon,
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }, {
    label: 'Roadmap',
    icon: Cross30Icon,
    active: true
  }, {
    label: 'Releases',
    icon: Cross30Icon,
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }]

  const props = { links }

  it.each([
    // Props
    ['with links', { props }],
    ['with title', { props: { ...props, title: 'Resources' } }],
    ['with as', { props: { ...props, as: 'div' } }],
    ['with class', { props: { ...props, class: 'gap-1.5' } }],
    ['with b24ui', { props: { ...props, b24ui: { list: 'gap-3' } } }],
    // Slots
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-label slot', { props, slots: { 'link-label': () => 'Link label slot' } }],
    ['with link-trailing slot', { props, slots: { 'link-trailing': () => 'Link trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PageLinksProps, slots?: Partial<PageLinksSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PageLinks)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageLinks, {
      props: {
        title: 'Resources',
        links
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
