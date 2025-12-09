import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { Editor } from '@tiptap/vue-3'
import EditorToolbar from '../../src/runtime/components/EditorToolbar.vue'
import type { EditorToolbarProps, EditorToolbarSlots } from '../../src/runtime/components/EditorToolbar.vue'
import ComponentRender from '../component-render'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BoldIcon from '@bitrix24/b24icons-vue/editor/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/editor/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/editor/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/editor/StrikethroughIcon'
import EncloseTextInCodeTagIcon from '@bitrix24/b24icons-vue/editor/EncloseTextInCodeTagIcon'

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
  const props = { editor: { registerPlugin: vi.fn() } as unknown as Editor, items }

  it.each([
    // Props
    ['with as', { props: { ...props, as: 'section' } }],
    ['with layout bubble', { props: { ...props, layout: 'bubble' as const } }],
    ['with layout floating', { props: { ...props, layout: 'floating' as const } }],
    ['with class', { props: { ...props, class: 'overflow-x-auto' } }],
    ['with b24ui', { props: { ...props, b24ui: { separator: 'bg-default' } } }],
    // Slots
    ['with item slot', { props, slots: { item: () => 'Item slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: EditorToolbarProps, slots?: Partial<EditorToolbarSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, EditorToolbar)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(EditorToolbar, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
