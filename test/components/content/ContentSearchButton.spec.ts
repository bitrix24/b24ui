import { describe, it, expect } from 'vitest'
import ContentSearchButton from '../../../src/runtime/components/content/ContentSearchButton.vue'
import type { ContentSearchButtonProps } from '../../../src/runtime/components/content/ContentSearchButton.vue'
import ComponentRender from '../../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('ContentSearchButton', () => {
  it.each([
    // Props
    ['with label', { props: { label: 'Open' } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with kbds', { props: { kbds: ['alt', 'o'] } }],
    ['without collapsed', { props: { collapsed: false } }],
    ['with class', { props: { class: 'w-full' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ContentSearchButtonProps }) => {
    const html = await ComponentRender(nameOrHtml, options, ContentSearchButton)
    expect(html).toMatchSnapshot()
  })
})
