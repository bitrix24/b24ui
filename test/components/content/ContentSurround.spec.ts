import { describe, it, expect } from 'vitest'
import ContentSurround from '../../../src/runtime/components/content/ContentSurround.vue'
import type { ContentSurroundProps, ContentSurroundSlots } from '../../../src/runtime/components/content/ContentSurround.vue'
import ComponentRender from '../../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('ContentSurround', () => {
  const surround = [{
    path: '/getting-started',
    title: 'Introduction',
    description: 'Bitrix24 UI harnesses the combined strengths of Reka UI, Tailwind CSS, and Tailwind Variants to offer developers an unparalleled set of tools for creating sophisticated, accessible, and highly performant user interfaces.'
  }, {
    path: '/getting-started/theme',
    title: 'Theme',
    description: 'Learn how to customize Bitrix24 UI components using Tailwind CSS, CSS variables and the Tailwind Variants API for powerful and flexible theming.'
  }]

  const props = { surround }

  it.each([
    // Props
    ['with surround', { props }],
    ['with prevIcon', { props: { ...props, prevIcon: SignIcon } }],
    ['with nextIcon', { props: { ...props, nextIcon: Cross30Icon } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'gap-12' } }],
    ['with b24ui', { props: { ...props, b24ui: { linkTitle: 'text-xl' } } }],
    // Slots
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-title slot', { props, slots: { 'link-title': () => 'Link title slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ContentSurroundProps, slots?: Partial<ContentSurroundSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, ContentSurround)
    expect(html).toMatchSnapshot()
  })
})
