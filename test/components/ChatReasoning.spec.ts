import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ChatReasoning from '../../src/runtime/components/ChatReasoning.vue'
import { renderEach } from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('ChatReasoning', () => {
  const props = {
    text: 'The user is asking about Vue components...'
  }

  renderEach(ChatReasoning, [
    // Props
    ['with text', { props }],
    ['with streaming', { props: { streaming: true } }],
    ['with duration', { props: { ...props, duration: 5 } }],
    ['with icon', { props: { ...props, icon: SignIcon } }],
    ['with defaultOpen', { props: { ...props, defaultOpen: true } }],
    ['with chevron leading', { props: { ...props, chevron: 'leading' } }],
    ['with chevronIcon', { props: { ...props, chevronIcon: Cross30Icon } }],
    ['with class', { props: { ...props, class: 'my-5' } }],
    ['with b24ui', { props: { ...props, b24ui: { body: 'text-muted' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Custom reasoning content' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatReasoning, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('auto-opens when streaming starts and auto-closes when it ends', async () => {
    const wrapper = await mountSuspended(ChatReasoning, {
      props: { text: 'Thinking...', streaming: false }
    })

    const root = wrapper.find('[data-slot="root"]')
    expect(root.attributes('data-state')).toBe('closed')

    await wrapper.setProps({ streaming: true })
    expect(root.attributes('data-state')).toBe('open')

    vi.useFakeTimers()
    await wrapper.setProps({ streaming: false })
    vi.advanceTimersByTime(500)
    vi.useRealTimers()
    await wrapper.vm.$nextTick()
    expect(root.attributes('data-state')).toBe('closed')
  })
})
