import { describe, it, expect } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import ContentToc from '../../../src/runtime/components/content/ContentToc.vue'
import type { ContentTocProps, ContentTocSlots } from '../../../src/runtime/components/content/ContentToc.vue'
import ComponentRender from '../../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('ContentToc', () => {
  mockNuxtImport('useScrollspy', () => {
    return () => {
      return {
        activeHeadings: ['installation'],
        updateHeadings: () => {}
      }
    }
  })

  const links = [
    {
      id: 'installation',
      depth: 2,
      text: 'Installation'
    },
    {
      id: 'components',
      depth: 2,
      text: 'Components'
    },
    {
      id: 'typography',
      depth: 2,
      text: 'Typography'
    },
    {
      id: 'utils',
      depth: 2,
      text: 'Utils',
      children: [
        {
          id: 'mapcontentnavigation',
          depth: 3,
          text: 'mapContentNavigation'
        },
        {
          id: 'findpageheadline',
          depth: 3,
          text: 'findPageHeadline'
        },
        {
          id: 'findpagebreadcrumb',
          depth: 3,
          text: 'findPageBreadcrumb'
        }
      ]
    }]

  const props = { links }

  it.each([
    // Props
    ['with links', { props }],
    ['with title', { props: { ...props, title: 'On this page' } }],
    ['with as', { props: { ...props, as: 'div' } }],
    ['with air-primary color', { props: { ...props, color: 'air-primary' as const } }],
    ['with highlight', { props: { ...props, highlight: true } }],
    ['with air-tertiary highlightColor', { props: { ...props, highlightColor: 'air-tertiary' as const } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: SignIcon } }],
    ['with class', { props: { ...props, class: 'lg:px-8' } }],
    ['with b24ui', { props: { ...props, b24ui: { trailingIcon: 'size-6' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with top slot', { props, slots: { top: () => 'Top slot' } }],
    ['with bottom slot', { props, slots: { bottom: () => 'Bottom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ContentTocProps, slots?: Partial<ContentTocSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, ContentToc)
    expect(html).toMatchSnapshot()
  })
})
