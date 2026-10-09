import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import ProsePrompt from '../../src/runtime/components/prose/Prompt.vue'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('ProsePrompt', () => {
  renderEach(ProsePrompt, [
    // Props
    ['with description', { props: { description: 'Description' } }],
    ['with icon', { props: { icon: Search2Icon } }],
    ['with iconName', { props: { iconName: 'InfoCircleIcon' } }],
    ['with actions', { props: { actions: ['copy', 'cursor', 'windsurf'] as const } }],
    ['with class', { props: { class: 'p-5' } }],
    ['with b24ui', { props: { b24ui: { icon: 'size-5' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Prompt body' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ProsePrompt, {
      props: { description: 'Description', actions: ['copy', 'cursor', 'windsurf', 'claude'] as const },
      slots: { default: () => 'Prompt body' }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('copies the `prompt` prop as written instead of the default slot', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const prompt = '  Line one\n\n- item `code`\n  '
    const wrapper = await mountSuspended(ProsePrompt, {
      props: { prompt, actions: ['cursor'] as const },
      slots: { default: () => 'Slot body' }
    })

    const buttons = wrapper.findAll('button')
    await buttons[buttons.length - 1]!.trigger('click')

    expect(open).toHaveBeenCalledWith(`cursor://anysphere.cursor-deeplink/prompt?text=${encodeURIComponent(prompt.trim())}`, '_self')
    open.mockRestore()
  })
})
