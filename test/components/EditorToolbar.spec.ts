import { defineComponent } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import { TooltipProvider } from 'reka-ui'
import type { Editor } from '@tiptap/vue-3'
import EditorToolbar from '../../src/runtime/components/EditorToolbar.vue'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BoldIcon from '@bitrix24/b24icons-vue/editor/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/editor/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/editor/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/editor/StrikethroughIcon'
import EncloseTextInCodeTagIcon from '@bitrix24/b24icons-vue/editor/EncloseTextInCodeTagIcon'

// Items carrying a `tooltip` mount a `B24Tooltip`, which requires a provider (normally `B24App`).
const EditorToolbarWrapper = defineComponent({
  components: {
    TooltipProvider,
    B24EditorToolbar: EditorToolbar
  },
  inheritAttrs: false,
  template: `<TooltipProvider>
  <B24EditorToolbar v-bind="$attrs" />
</TooltipProvider>`
})

describe('EditorToolbar', () => {
  const items = [[{
    'icon': HeaderIcon,
    'aria-label': 'Headings',
    'content': {
      align: 'start'
    },
    'items': [{
      kind: 'heading',
      level: 1,
      label: 'Heading 1'
    }, {
      kind: 'heading',
      level: 2,
      label: 'Heading 2'
    }, {
      kind: 'heading',
      level: 3,
      label: 'Heading 3'
    }, {
      kind: 'heading',
      level: 4,
      label: 'Heading 4'
    }]
  }], [{
    'kind': 'mark',
    'mark': 'bold',
    'icon': BoldIcon,
    'aria-label': 'Bold'
  }, {
    'kind': 'mark',
    'mark': 'italic',
    'icon': ItalicIcon,
    'aria-label': 'Italic'
  }, {
    'kind': 'mark',
    'mark': 'underline',
    'icon': UnderlineIcon,
    'aria-label': 'Underline'
  }, {
    'kind': 'mark',
    'mark': 'strike',
    'icon': StrikethroughIcon,
    'aria-label': 'Strikethrough'
  }, {
    'kind': 'mark',
    'mark': 'code',
    'icon': EncloseTextInCodeTagIcon,
    'aria-label': 'Code'
  }]]
  // `unregisterPlugin` for the same reason as in EditorDragHandle: the wrapper
  // is unmounted now, so tiptap's BubbleMenu reaches its teardown.
  const props = { editor: { registerPlugin: vi.fn(), unregisterPlugin: vi.fn() } as unknown as Editor, items }

  renderEach(EditorToolbar, [
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with layout bubble', { props: { ...props, layout: 'bubble' as const } }],
    ['with layout floating', { props: { ...props, layout: 'floating' as const } }],
    ['with class', { props: { ...props, class: 'overflow-x-auto' } }],
    ['with b24ui', { props: { ...props, b24ui: { separator: 'bg-default' } } }],
    // Slots
    ['with item slot', { props, slots: { item: () => 'Item slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(EditorToolbar, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('accessible name', () => {
    // A tooltip is a pointer-hover affordance only: it never reaches assistive technology,
    // so an icon-only button configured the documented way must still be named.
    it('names icon-only buttons from their tooltip', async () => {
      const wrapper = await mountSuspended(EditorToolbarWrapper, {
        props: {
          editor: { registerPlugin: vi.fn() } as unknown as Editor,
          items: [[{
            kind: 'mark',
            mark: 'bold',
            icon: BoldIcon,
            tooltip: { text: 'Bold' }
          }, {
            'kind': 'mark',
            'mark': 'italic',
            'icon': ItalicIcon,
            'tooltip': { text: 'Italic' },
            'aria-label': 'Italic text'
          }, {
            kind: 'mark',
            mark: 'underline',
            icon: UnderlineIcon,
            label: 'Underline',
            tooltip: { text: 'Underline' }
          }, {
            kind: 'mark',
            mark: 'strike',
            icon: StrikethroughIcon
          }]]
        }
      })

      const buttons = wrapper.findAll('[role=toolbar] button')
      expect(buttons).toHaveLength(4)

      expect(buttons[0]!.attributes('aria-label')).toBe('Bold')
      // An author-supplied name wins over the tooltip.
      expect(buttons[1]!.attributes('aria-label')).toBe('Italic text')
      // A visible label already names the button, so it is not relabelled on top of its text.
      expect(buttons[2]!.attributes('aria-label')).toBeUndefined()
      expect(buttons[2]!.text()).toContain('Underline')
      // Nothing to derive a name from.
      expect(buttons[3]!.attributes('aria-label')).toBeUndefined()
    })

    it('names dropdown triggers from their tooltip', async () => {
      const wrapper = await mountSuspended(EditorToolbarWrapper, {
        props: {
          editor: { registerPlugin: vi.fn() } as unknown as Editor,
          items: [[{
            icon: HeaderIcon,
            tooltip: { text: 'Headings' },
            items: [{ kind: 'heading', level: 1, label: 'Heading 1' }]
          }]]
        }
      })

      expect(wrapper.find('[role=toolbar] button').attributes('aria-label')).toBe('Headings')
    })
  })
})
