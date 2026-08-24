import type { ChatMessagesSlots } from '../../src/runtime/components/ChatMessages.vue'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, nextTick, ref, shallowRef, triggerRef } from 'vue'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import ChatMessages from '../../src/runtime/components/ChatMessages.vue'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('ChatMessages', () => {
  const statuses = ['ready', 'submitted', 'streaming', 'error'] as any

  const props = {
    messages: [{
      id: '6045235a-a435-46b8-989d-2df38ca2eb47',
      role: 'user' as const,
      parts: [{ type: 'text' as const, text: 'Hello, how are you?' }]
    }, {
      // Distinct from the first: `id` keys both the `v-for` and the
      // `messagesRefs` map, so a shared one models a thread that cannot exist
      // and quietly collapses two messages into one entry.
      id: '31d5f0a4-1cd6-4f0e-9d2a-6b8f1c0e77b2',
      role: 'assistant' as const,
      parts: [{ type: 'text' as const, text: 'I am fine, thank you!' }]
    }]
  }

  renderEach(ChatMessages, [
    // Props
    ['with messages', { props }],
    ['with user', { props: { ...props, user: { avatar: { src: 'https://github.com/bitrix24.png' }, variant: 'soft', side: 'right' } } }],
    ['with assistant', { props: { ...props, assistant: { avatar: { icon: Search2Icon } } } }],
    ...statuses.map((status: string) => [`with status ${status}`, { props: { ...props, status } }]),
    ['with compact', { props: { ...props, compact: true } }],
    ['with class', { props: { ...props, class: 'max-w-3xl' } }],
    ['with b24ui', { props: { ...props, b24ui: { autoScroll: 'bottom-0' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with indicator slot', { props: { ...props, status: 'submitted' }, slots: { indicator: () => 'Indicator slot' } }],
    // No `with viewport slot` case here. The slot lives inside
    // `<Presence :present="showAutoScroll">`, and `showAutoScroll` is set by a
    // `scroll` handler reading the container's geometry — nothing a declarative
    // props-and-slots matrix can arrange, so the case that used to sit here
    // rendered the closed state and was byte-identical to `with messages`
    // (#454). It is covered by a test of its own below, which stubs the
    // geometry and dispatches the event.
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    // `files` renders only when a message carries a part of `type: 'file'`;
    // every fixture here has text parts only, so the slot never appeared.
    ['with files slot', {
      props: {
        ...props,
        messages: [{
          id: 'with-file',
          role: 'user' as const,
          parts: [
            { type: 'text' as const, text: 'see attached' },
            { type: 'file' as const, mediaType: 'image/png', url: 'https://example.com/a.png', filename: 'a.png' }
          ]
        }]
      },
      slots: { files: () => 'Files slot' }
    }]
  ])

  /**
   * The `viewport` slot is the auto-scroll button, shown only once the user has
   * scrolled more than 100px from the bottom. happy-dom reports every scroll
   * measurement as 0, so `checkScrollPosition` always concluded the user was at
   * the bottom and the slot never rendered — which is why the `renderEach` case
   * for it recorded the closed state and proved nothing (#454).
   *
   * Stubbing `scrollHeight` and dispatching a real `scroll` event runs the
   * component's own handler rather than setting `showAutoScroll` directly, so
   * the threshold arithmetic is under test too.
   */
  it('renders the viewport slot once the user has scrolled away from the bottom', async () => {
    const wrapper = await mountSuspended(ChatMessages, {
      props,
      slots: { viewport: () => 'Viewport slot' }
    })

    // `getScrollParent` walks up looking for an `overflow-y` of `auto` or
    // `scroll`, finds none in the test harness, and falls back to this.
    const scrollParent = document.documentElement

    expect(wrapper.text(), 'the button must stay hidden while the user is at the bottom').not.toContain('Viewport slot')

    try {
      Object.defineProperty(scrollParent, 'scrollHeight', { configurable: true, value: 1000 })
      scrollParent.dispatchEvent(new Event('scroll'))
      await nextTick()

      expect(wrapper.text()).toContain('Viewport slot')
    } finally {
      // An own property shadowing the prototype getter; deleting it restores
      // the real one for every test after this.
      delete (scrollParent as any).scrollHeight
    }
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatMessages, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('drops a message ref when that message is removed', async () => {
    // Vue calls the ref callback with `null` on unmount, and that branch used
    // to do nothing — so a removed message left its detached element in the map
    // for the component's lifetime. The only other cleanup is a bulk `.clear()`
    // that fires when `messages` empties entirely, which is why resetting a
    // thread looked fine and trimming one message did not.
    const messages = [
      { id: 'first', role: 'user' as const, parts: [{ type: 'text' as const, text: 'one' }] },
      { id: 'second', role: 'assistant' as const, parts: [{ type: 'text' as const, text: 'two' }] }
    ]

    const wrapper = await mountSuspended(ChatMessages, { props: { messages } })
    // Read straight off the instance: the map is internal (only
    // `registerMessageRef` is exposed) and has no public projection, and a
    // stale entry is invisible from the rendered output by definition.
    const refs = () => (wrapper.vm as any).messagesRefs as Map<string, HTMLElement>

    expect([...refs().keys()].sort()).toEqual(['first', 'second'])

    await wrapper.setProps({ messages: [messages[0]!] })
    await nextTick()

    expect([...refs().keys()]).toEqual(['first'])
  })

  describe('last message height', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    // `updateLastMessageHeight()` used to call `useElementBounding(parent)` on
    // every invocation. It runs from the `status` watcher and from a window
    // `resize` handler — both outside an active effect scope — so each call
    // constructed a ResizeObserver that nothing could ever dispose, and a long
    // chat session piled them up one per status change.
    //
    // Counts constructions rather than asserting a height: happy-dom lays
    // nothing out, so the measured value is 0 either way and only the
    // observer bookkeeping distinguishes the two implementations.
    it('does not construct a ResizeObserver per status change', async () => {
      let constructed = 0
      vi.stubGlobal('ResizeObserver', class {
        constructor() {
          constructed++
        }

        observe() {}
        unobserve() {}
        disconnect() {}
      })

      // The watcher only proceeds when the *last* message is the user's.
      const submittedProps = {
        messages: [props.messages[1]!, { ...props.messages[0]!, id: 'last-user-message' }]
      }

      const wrapper = await mountSuspended(ChatMessages, {
        props: { ...submittedProps, status: 'ready' as const }
      })

      const settle = async () => {
        await nextTick()
        await nextTick()
        await nextTick()
      }

      await wrapper.setProps({ status: 'submitted' })
      await settle()

      // Whatever the first pass legitimately builds is the baseline; the
      // defect is growth, and that is what has to stay flat.
      const baseline = constructed

      for (let i = 0; i < 5; i++) {
        await wrapper.setProps({ status: 'ready' })
        await settle()
        await wrapper.setProps({ status: 'submitted' })
        await settle()
      }

      expect(constructed).toBe(baseline)
    })
  })

  it('forwards content slot props together with `message`', async () => {
    const messages = [
      { id: 'm-1', role: 'user' as const, parts: [{ type: 'text' as const, text: 'a' }], metadata: { foo: 'bar' } },
      { id: 'm-2', role: 'assistant' as const, parts: [{ type: 'text' as const, text: 'b' }] }
    ]
    const captured: Parameters<Exclude<ChatMessagesSlots['content'], undefined>>[0][] = []
    await mountSuspended(ChatMessages, {
      props: { messages },
      slots: {
        content: (slotProps) => {
          captured.push(slotProps)
          return 'x'
        }
      }
    })

    expect(captured).toHaveLength(2)
    expect(captured[0]).toMatchObject({
      id: 'm-1',
      role: 'user',
      parts: messages[0]!.parts,
      metadata: { foo: 'bar' },
      message: messages[0]
    })
    expect(captured[1]).toMatchObject({
      id: 'm-2',
      role: 'assistant',
      parts: messages[1]!.parts,
      message: messages[1]
    })
  })

  it('hides the streaming indicator once the assistant message produces parts', async () => {
    // Reproduces the `@ai-sdk/vue` reactivity model: messages live in a `shallowRef`
    // and grow via in-place mutation + `triggerRef`, so neither the array nor the
    // message objects ever change identity. When the server assigns the assistant
    // message id, an empty assistant message is flushed before any content, so the
    // indicator must appear then disappear as soon as parts stream in.
    const messages = shallowRef<any[]>([
      { id: 'u1', role: 'user', parts: [{ type: 'text', text: 'hi' }] },
      { id: 'a1', role: 'assistant', parts: [] }
    ])
    // A separate reactive value bound to a prop, used only to force ChatMessages to
    // re-render on each tick, mimicking how streamed content forces re-renders in a
    // real app (dynamic slots / non-static prop references).
    const tick = ref(0)

    const Parent = defineComponent({
      setup() {
        return () => h(ChatMessages, { messages: messages.value, status: 'streaming', spacingOffset: tick.value })
      }
    })

    const wrapper = await mountSuspended(Parent)

    // Empty assistant message -> indicator visible.
    expect(wrapper.find('[data-slot="indicator"]').exists()).toBe(true)

    // Stream the first part in place + triggerRef, and force a re-render.
    messages.value[1]!.parts.push({ type: 'text', text: 'Hello' })
    triggerRef(messages)
    tick.value++
    await nextTick()

    // A cached `computed` would stay stuck on its first `streaming` result here;
    // the indicator must now be gone.
    expect(wrapper.find('[data-slot="indicator"]').exists()).toBe(false)
  })

  it('forwards `message` to the actions slot', async () => {
    const captured: Parameters<Exclude<ChatMessagesSlots['actions'], undefined>>[0][] = []
    await mountSuspended(ChatMessages, {
      props: {
        ...props,
        user: { actions: [{ icon: Search2Icon, label: 'Copy' }] },
        assistant: { actions: [{ icon: Cross30Icon, label: 'Copy' }] }
      },
      slots: {
        actions: (slotProps) => {
          captured.push(slotProps)
          return 'x'
        }
      }
    })

    expect(captured.length).toBeGreaterThan(0)
    for (const p of captured) {
      expect(p).toHaveProperty('message')
      expect(p).toHaveProperty('actions')
    }
  })
})
