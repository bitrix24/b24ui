import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ChatPromptSubmit from '../../src/runtime/components/ChatPromptSubmit.vue'
import type { ChatPromptSubmitProps } from '../../src/runtime/components/ChatPromptSubmit.vue'
import ComponentRender from '../component-render'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('ChatPromptSubmit', () => {
  const statuses = ['ready', 'submitted', 'streaming', 'error'] as any

  it.each([
    // Props
    ['with icon', { props: { icon: Search2Icon } }],
    ...statuses.map((status: string) => [`with status ${status}`, { props: { status } }]),
    ['with class', { props: { class: '' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ChatPromptSubmitProps }) => {
    const html = await ComponentRender(nameOrHtml, options, ChatPromptSubmit)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatPromptSubmit, {
      props: {
        status: 'ready'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
