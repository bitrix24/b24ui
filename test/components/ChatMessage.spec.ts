import type { ChatMessageSlots } from '../../src/runtime/components/ChatMessage.vue'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import ChatMessage from '../../src/runtime/components/ChatMessage.vue'
import theme from '#build/b24ui/chat-message'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('ChatMessage', () => {
  const variants = Object.keys(theme.variants.variant) as any
  const props = {
    id: '6045235a-a435-46b8-989d-2df38ca2eb47',
    role: 'user' as const,
    parts: [{ type: 'text' as const, text: 'Hello, how are you?' }]
  }

  renderEach(ChatMessage, [
    // Props
    ['with parts', { props }],
    ['with content', { props: { ...props, content: 'Hello, how are you?' } }],
    ['with icon', { props: { ...props, icon: Search2Icon } }],
    ['with avatar', { props: { ...props, avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with role assistant', { props: { ...props, role: 'assistant' as const } }],
    ['with side right', { props: { ...props, side: 'right' } }],
    ['with compact', { props: { ...props, compact: true } }],
    ...variants.map((variant: string) => [`with variant ${variant}`, { props: { ...props, variant } }]),
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: '' } }],
    ['with b24ui', { props: { ...props, b24ui: {} } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with files slot', { props: { ...props, parts: [...props.parts, { type: 'file' as const, mediaType: 'text/plain', url: 'https://example.com/test.txt', filename: 'test.txt' }] }, slots: { files: () => 'Files slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with actions slot', { props, slots: { actions: () => 'Actions slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatMessage, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('forwards id, role, parts, metadata and content to the content slot', async () => {
    const captured: Parameters<Exclude<ChatMessageSlots['content'], undefined>>[0][] = []
    await mountSuspended(ChatMessage, {
      props: { ...props, metadata: { foo: 'bar' } },
      slots: {
        content: (slotProps) => {
          captured.push(slotProps)
          return 'x'
        }
      }
    })

    expect(captured).toHaveLength(1)
    expect(captured[0]).toMatchObject({
      id: props.id,
      role: 'user',
      parts: props.parts,
      metadata: { foo: 'bar' }
    })
  })

  it('does not leak ChatMessage-specific props into the content slot', async () => {
    const captured: Parameters<Exclude<ChatMessageSlots['content'], undefined>>[0][] = []
    await mountSuspended(ChatMessage, {
      props: {
        ...props,
        icon: Search2Icon,
        avatar: { src: 'https://github.com/bitrix24.png' },
        side: 'right' as const,
        actions: [{ icon: Cross30Icon, label: 'Copy' }],
        compact: true,
        class: 'foo',
        b24ui: {}
      },
      slots: {
        content: (slotProps) => {
          captured.push(slotProps)
          return 'x'
        },
        actions: () => 'actions'
      }
    })

    for (const key of ['as', 'icon', 'avatar', 'variant', 'side', 'actions', 'compact', 'class', 'b24ui']) {
      expect(captured[0]).not.toHaveProperty(key)
    }
  })
})
