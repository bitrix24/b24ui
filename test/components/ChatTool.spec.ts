import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ChatTool from '../../src/runtime/components/ChatTool.vue'
import { renderEach } from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('ChatTool', () => {
  const props = {
    text: 'Searching components'
  }

  renderEach(ChatTool, [
    // Props
    ['with text', { props }],
    ['with suffix', { props: { ...props, suffix: 'Button' } }],
    ['with streaming', { props: { ...props, streaming: true } }],
    ['with icon', { props: { ...props, icon: SignIcon } }],
    ['with loading', { props: { ...props, loading: true } }],
    ['with loading and loadingIcon', { props: { ...props, loading: true, loadingIcon: Cross30Icon } }],
    ['with variant inline', { props: { ...props, variant: 'inline' } }],
    ['with variant card', { props: { ...props, variant: 'card' } }],
    ['with defaultOpen', { props: { ...props, defaultOpen: true } }],
    ['with chevron leading', { props: { ...props, chevron: 'leading' } }],
    ['with chevron leading and icon', { props: { ...props, chevron: 'leading', icon: SignIcon } }],
    ['with chevronIcon', { props: { ...props, chevronIcon: Cross30Icon } }],
    ['with class', { props: { ...props, class: 'my-5' } }],
    ['with b24ui', { props: { ...props, b24ui: { body: 'text-muted' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Tool output content' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatTool, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
