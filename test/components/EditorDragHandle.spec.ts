import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import type { Editor } from '@tiptap/vue-3'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import EditorDragHandle from '../../src/runtime/components/EditorDragHandle.vue'

describe('EditorDragHandle', () => {
  // `unregisterPlugin` is the teardown half. It was missing for as long as
  // nothing unmounted the wrapper — `componentRender` now does, so tiptap's
  // `DragHandleVue` reaches its `beforeUnmount` and calls it. A mock that
  // implements only the setup half is a fixture that never sees teardown.
  const props = { editor: { registerPlugin: vi.fn(), unregisterPlugin: vi.fn() } as unknown as Editor }

  renderEach(EditorDragHandle, [
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'items-start' } }],
    ['with b24ui', { props: { ...props, b24ui: { handle: 'px-4' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(EditorDragHandle, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
