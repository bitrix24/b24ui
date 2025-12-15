<script setup lang="ts">
import { upperFirst } from 'scule'
import type { EditorToolbarItem, EditorMentionMenuItem, EditorEmojiMenuItem, DropdownMenuItem, EditorSuggestionMenuItem, EditorCustomHandlers } from '@bitrix24/b24ui-nuxt'
import type { JSONContent } from '@tiptap/vue-3'
import { mapEditorItems } from '@bitrix24/b24ui-nuxt/utils/editor'
import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji'
import { TextAlign } from '@tiptap/extension-text-align'
import { ImageUpload } from '../../../../../docs/app/components/content/examples/editor/EditorImageUpload'
// import { useEditorCompletion } from '../../../../../docs/app/components/content/examples/editor/EditorUseCompletion'
import EditorLinkPopover from '../../../../../docs/app/components/content/examples/editor/EditorLinkPopover.vue'
import UndoIcon from '@bitrix24/b24icons-vue/outline/UndoIcon'
import RedoIcon from '@bitrix24/b24icons-vue/outline/RedoIcon'
import MentionIcon from '@bitrix24/b24icons-vue/outline/MentionIcon'
import SmileIcon from '@bitrix24/b24icons-vue/outline/SmileIcon'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import HrIcon from '@bitrix24/b24icons-vue/editor/HrIcon'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/outline/StrikethroughIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import AlignCenterIcon from '@bitrix24/b24icons-vue/outline/AlignCenterIcon'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import AlignJustifyIcon from '@bitrix24/b24icons-vue/outline/AlignJustifyIcon'
import DownloadIcon from '@bitrix24/b24icons-vue/outline/DownloadIcon'
import RefreshIcon from '@bitrix24/b24icons-vue/outline/RefreshIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import ResumeIcon from '@bitrix24/b24icons-vue/outline/ResumeIcon'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CopyFileIcon from '@bitrix24/b24icons-vue/crm/CopyFileIcon'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'
import ArrowDownLIcon from '@bitrix24/b24icons-vue/outline/ArrowDownLIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'
import ActionRequiredIcon from '@bitrix24/b24icons-vue/outline/ActionRequiredIcon'
import CopilotIcon from '@bitrix24/b24icons-vue/solid/CopilotIcon'
import CheckGrammarIcon from '@bitrix24/b24icons-vue/editor/CheckGrammarIcon'
import MakeLongerIcon from '@bitrix24/b24icons-vue/editor/MakeLongerIcon'
import MakeShorterIcon from '@bitrix24/b24icons-vue/editor/MakeShorterIcon'
import IdeaLampIcon from '@bitrix24/b24icons-vue/outline/IdeaLampIcon'
import PenIcon from '@bitrix24/b24icons-vue/actions/PenIcon'
import TranslationIcon from '@bitrix24/b24icons-vue/outline/TranslationIcon'

const editorRef = useTemplateRef('editorRef')

const content = ref(`# Bitrix24 UI: A Modern UI Library

Welcome to **Bitrix24 UI**, a comprehensive UI library for *Bitrix24* applications.
Built with [Tailwind CSS](https://tailwindcss.com) and [Reka UI](https://reka-ui.com), it provides a complete set of components for building beautiful interfaces.

![Placeholder](https://bitrix24.github.io/b24ui/assets/demo/b24rich_new.png)

## Key Features

Bitrix24 UI combines the best of modern web development

- **Fully typed** with TypeScript support
- *Customizable* theme system with semantic colors
- <u>Accessible</u> components following ARIA guidelines
- Built on top of \`Reka UI\` primitives
- Support for ~~legacy browsers~~ modern standards

### Getting Started

Install Bitrix24 UI in your project with the following command:

\`\`\`
npx nuxi@latest module add @bitrix24/b24ui-nuxt
\`\`\`

> *Bitrix24 UI is designed to be intuitive and easy to use, whether you're building a simple landing page or a complex application.*

### Component Categories

1. Layout components (Container, Card, Accordion)
2. Form components (Input, Select, Checkbox)
3. Navigation (Navbar, Sidebar, Breadcrumb)
4. Feedback (Alert, Toast, Modal)

#### Code Example

Here's a simple example using the \`Button\` component:

\`\`\`
<template>
  <B24Button color="air-primary-alert">
    Click me
  </B24Button>
</template>
\`\`\`

---

## Advanced Features

Powerful capabilities for modern applications

- Dark mode support out of the box
- Keyboard shortcuts for improved accessibility
- Nested lists support:
  - With multiple levels
  - And proper spacing

Whether you're working on a personal project or building an enterprise application, Bitrix24 UI provides all the tools you need to create stunning user interfaces quickly and efficiently. The library is constantly evolving with new components and improvements based on community feedback.

Visit our [documentation](https://bitrix24.github.io/b24ui/) to learn more and explore all available components.
`)

// const { extension: completionExtension, handlers: aiHandlers, isLoading: aiLoading } = useEditorCompletion(editorRef)

const customHandlers = {
  imageUpload: {
    canExecute: (editor: any) => editor.can().insertContent({ type: 'imageUpload' }),
    execute: (editor: any) => editor.chain().focus().insertContent({ type: 'imageUpload' }),
    isActive: (editor: any) => editor.isActive('imageUpload'),
    isDisabled: undefined
  }
  // ...aiHandlers
} satisfies EditorCustomHandlers

const toolbarItems = computed(() => [
  [
    {
      kind: 'undo',
      icon: UndoIcon,
      tooltip: { text: 'Undo' }
    },
    {
      kind: 'redo',
      icon: RedoIcon,
      tooltip: { text: 'Redo' }
    }
  ],
  [
    {
      icon: CopilotIcon,
      // loading: aiLoading.value,
      disabled: true,
      content: { align: 'start' },
      b24ui: { leadingIcon: 'text-(--ui-color-copilot-accent-less-1)' },
      items: [
        {
          kind: 'aiFix',
          icon: CheckGrammarIcon,
          label: 'Fix spelling & grammar'
        },
        {
          kind: 'aiExtend',
          icon: MakeLongerIcon,
          label: 'Extend text'
        },
        {
          kind: 'aiReduce',
          icon: MakeShorterIcon,
          label: 'Reduce text'
        },
        {
          kind: 'aiSimplify',
          icon: IdeaLampIcon,
          label: 'Simplify text'
        },
        {
          kind: 'aiContinue',
          icon: PenIcon,
          label: 'Continue sentence'
        },
        {
          kind: 'aiSummarize',
          icon: QuoteIcon,
          label: 'Summarize'
        },
        {
          icon: TranslationIcon,
          label: 'Translate',
          children: [
            {
              kind: 'aiTranslate',
              language: 'English',
              label: 'English'
            },
            {
              kind: 'aiTranslate',
              language: 'French',
              label: 'French'
            },
            {
              kind: 'aiTranslate',
              language: 'German',
              label: 'German'
            },
            {
              kind: 'aiTranslate',
              language: 'Russian',
              label: 'Russian'
            },
            {
              kind: 'aiTranslate',
              language: 'Spanish',
              label: 'Spanish'
            }
          ]
        }
      ]
    }
  ],
  [
    {
      kind: 'suggestion',
      icon: ActionRequiredIcon
    },
    {
      kind: 'mention',
      icon: MentionIcon
    },
    {
      kind: 'emoji',
      icon: SmileIcon
    }
  ],
  [
    {
      icon: HeaderIcon,
      tooltip: { text: 'Headings' },
      items: [
        {
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
        }
      ]
    },
    {
      icon: BulletedListIcon,
      tooltip: { text: 'Lists' },
      items: [
        {
          kind: 'bulletList',
          icon: BulletedListIcon,
          label: 'Bullet List'
        }, {
          kind: 'orderedList',
          icon: NumberedListIcon,
          label: 'Ordered List'
        }
      ]
    },
    {
      kind: 'blockquote',
      icon: QuoteIcon,
      tooltip: { text: 'Blockquote' }
    },
    {
      kind: 'codeBlock',
      icon: CodeIcon,
      tooltip: { text: 'Code Block' }
    },
    {
      kind: 'horizontalRule',
      icon: HrIcon,
      tooltip: { text: 'Horizontal Rule' }
    },
    {
      kind: 'paragraph',
      icon: TextIcon,
      tooltip: { text: 'Paragraph' }
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: BoldIcon,
      tooltip: { text: 'Bold' }
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: ItalicIcon,
      tooltip: { text: 'Italic' }
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: UnderlineIcon,
      tooltip: { text: 'Underline' }
    },
    {
      kind: 'mark',
      mark: 'strike',
      icon: StrikethroughIcon,
      tooltip: { text: 'Strikethrough' }
    },
    {
      kind: 'mark',
      mark: 'code',
      icon: DeveloperResourcesIcon,
      tooltip: { text: 'Code' }
    }
  ],
  [
    {
      slot: 'link' as const,
      icon: LinkIcon
    },
    {
      kind: 'imageUpload',
      icon: ImageIcon,
      tooltip: { text: 'Image' }
    }
  ],
  [
    {
      icon: AlignJustifyIcon,
      tooltip: { text: 'Text Align' },
      content: { align: 'end' },
      items: [
        {
          kind: 'textAlign',
          align: 'left',
          icon: AlignLeftIcon,
          label: 'Align Left'
        },
        {
          kind: 'textAlign',
          align: 'center',
          icon: AlignCenterIcon,
          label: 'Align Center'
        },
        {
          kind: 'textAlign',
          align: 'right',
          icon: AlignRightIcon,
          label: 'Align Right'
        },
        {
          kind: 'textAlign',
          align: 'justify',
          icon: AlignJustifyIcon,
          label: 'Align Justify'
        }
      ]
    }
  ]
] satisfies EditorToolbarItem<typeof customHandlers>[][])

const imageToolbarItems = (editor: any): EditorToolbarItem<typeof customHandlers>[][] => {
  const node = editor.state.doc.nodeAt(editor.state.selection.from)

  return [[{
    icon: DownloadIcon,
    to: node?.attrs?.src,
    download: true,
    tooltip: { text: 'Download' }
  }, {
    icon: RefreshIcon,
    tooltip: { text: 'Replace' },
    onClick: () => {
      const { state } = editor
      const { selection } = state

      const pos = selection.from
      const node = state.doc.nodeAt(pos)

      if (node && node.type.name === 'image') {
        editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).insertContentAt(pos, { type: 'imageUpload' }).run()
      }
    }
  }], [{
    icon: TrashcanIcon,
    tooltip: { text: 'Delete' },
    onClick: () => {
      const { state } = editor
      const { selection } = state

      const pos = selection.from
      const node = state.doc.nodeAt(pos)

      if (node && node.type.name === 'image') {
        editor.chain().focus().deleteRange({ from: pos, to: pos + node.nodeSize }).run()
      }
    }
  }]]
}

const selectedNode = ref<{ node: JSONContent, pos: number }>()

const handleItems = (editor: any): DropdownMenuItem[][] => {
  if (!selectedNode.value?.node?.type) {
    return []
  }

  return mapEditorItems(editor, [[
    {
      type: 'label',
      label: upperFirst(selectedNode.value.node.type)
    },
    {
      label: 'Turn into',
      icon: RepeatIcon,
      children: [
        { kind: 'paragraph', label: 'Paragraph', icon: TextIcon },
        { kind: 'heading', level: 1, label: 'Heading 1' },
        { kind: 'heading', level: 2, label: 'Heading 2' },
        { kind: 'heading', level: 3, label: 'Heading 3' },
        { kind: 'heading', level: 4, label: 'Heading 4' },
        { kind: 'bulletList', label: 'Bullet List', icon: BulletedListIcon },
        { kind: 'orderedList', label: 'Ordered List', icon: NumberedListIcon },
        { kind: 'blockquote', label: 'Blockquote', icon: QuoteIcon },
        { kind: 'codeBlock', label: 'Code Block', icon: CodeIcon }
      ]
    },
    {
      kind: 'clearFormatting',
      pos: selectedNode.value?.pos,
      label: 'Reset formatting',
      icon: ResumeIcon
    }
  ], [
    {
      kind: 'duplicate',
      pos: selectedNode.value?.pos,
      label: 'Duplicate',
      icon: CopyIcon
    },
    {
      label: 'Copy to clipboard',
      icon: CopyFileIcon,
      onSelect: async () => {
        if (!selectedNode.value) return

        const pos = selectedNode.value.pos
        const node = editor.state.doc.nodeAt(pos)
        if (node) {
          await navigator.clipboard.writeText(node.textContent)
        }
      }
    }
  ], [
    {
      kind: 'moveUp',
      pos: selectedNode.value?.pos,
      label: 'Move up',
      icon: ArrowTopLIcon
    },
    {
      kind: 'moveDown',
      pos: selectedNode.value?.pos,
      label: 'Move down',
      icon: ArrowDownLIcon
    }
  ], [
    {
      kind: 'delete',
      pos: selectedNode.value?.pos,
      label: 'Delete',
      icon: TrashcanIcon
    }
  ]], customHandlers) as DropdownMenuItem[][]
}

const suggestionItems = [
  // [
  //   {
  //     type: 'label',
  //     label: 'AI'
  //   },
  //   {
  //     kind: 'aiContinue',
  //     label: 'Continue writing',
  //     icon: PenIcon
  //   }
  // ],
  [
    {
      type: 'label',
      label: 'Style'
    },
    {
      kind: 'paragraph',
      label: 'Paragraph',
      icon: TextIcon
    },
    {
      kind: 'heading',
      level: 1,
      label: 'Heading 1'
    },
    {
      kind: 'heading',
      level: 2,
      label: 'Heading 2'
    },
    {
      kind: 'heading',
      level: 3,
      label: 'Heading 3'
    },
    {
      kind: 'bulletList',
      label: 'Bullet List',
      icon: BulletedListIcon
    },
    {
      kind: 'orderedList',
      label: 'Numbered List',
      icon: NumberedListIcon
    },
    {
      kind: 'blockquote',
      label: 'Blockquote',
      icon: QuoteIcon
    },
    {
      kind: 'codeBlock',
      label: 'Code Block',
      icon: CodeIcon
    }
  ],
  [
    {
      type: 'label',
      label: 'Insert'
    },
    {
      kind: 'mention',
      label: 'Mention',
      icon: MentionIcon
    }, {
      kind: 'emoji',
      label: 'Emoji',
      icon: SmileIcon
    }, {
      kind: 'imageUpload',
      label: 'Image',
      icon: ImageIcon
    }, {
      kind: 'horizontalRule',
      label: 'Horizontal Rule',
      icon: HrIcon
    }
  ]
] satisfies EditorSuggestionMenuItem<typeof customHandlers>[][]

const mentionItems: EditorMentionMenuItem[] = [
  {
    label: 'bitrix24',
    avatar: { src: 'https://github.com/bitrix24.png' }
  },
  {
    label: 'Employee',
    avatar: { src: '/b24ui/demo/avatar/employee.png' }
  },
  {
    label: 'Assistant',
    avatar: { src: '/b24ui/demo/avatar/assistant.png' }
  }
]

const emojiItems: EditorEmojiMenuItem[] = gitHubEmojis.filter(emoji => !emoji.name.startsWith('regional_indicator_'))
</script>

<template>
  <div
    class="isolate mt-[24px] relative h-[calc(100vh-var(--topbar-height)-56px)] !p-0 rounded-md bg-(--ui-color-design-outline-a1-bg) border-(--ui-color-design-outline-stroke) border-(length:--ui-design-outline-stroke-weight)"
  >
    <B24Editor
      ref="editorRef"
      v-slot="{ editor, handlers }"
      v-model="content"
      :extensions="[
        Emoji,
        ImageUpload,
        // completionExtension,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        })
      ]"
      :handlers="customHandlers"
      content-type="markdown"
      autofocus
      placeholder="Write, type '/' for commands..."
      :b24ui="{ base: 'p-8 sm:px-16 py-24' }"
      class="w-full h-[calc(100vh-var(--topbar-height)-56px)] overflow-y-auto scrollbar-thin scrollbar-transparent"
    >
      <B24EditorToolbar
        :editor="editor"
        :items="toolbarItems"
        class="border-b border-(--ui-color-design-tinted-na-stroke) backdrop-blur-3xl bg-(--ui-color-bg-content-primary) absolute top-0 inset-x-0 px-8 mr-2 sm:px-16 py-2 z-20 overflow-x-auto rounded-t-md"
      >
        <template #link>
          <EditorLinkPopover :editor="editor" auto-open />
        </template>
      </B24EditorToolbar>

      <B24EditorToolbar
        :editor="editor"
        :items="toolbarItems"
        layout="bubble"
        :should-show="({ editor, view, state }) => {
          if (editor.isActive('imageUpload') || editor.isActive('image')) {
            return false
          }
          const { selection } = state
          return view.hasFocus() && !selection.empty
        }"
      >
        <template #link>
          <EditorLinkPopover :editor="editor" />
        </template>
      </B24EditorToolbar>

      <B24EditorToolbar
        :editor="editor"
        :items="imageToolbarItems(editor)"
        layout="bubble"
        :should-show="({ editor, view }) => {
          return editor.isActive('image') && view.hasFocus()
        }"
      />

      <B24EditorDragHandle v-slot="{ b24ui, onClick }" :editor="editor" @node-change="selectedNode = $event">
        <B24Button
          :icon="PlusLIcon"
          color="air-tertiary"
          variant="ghost"
          size="sm"
          :class="b24ui.handle()"
          @click="(e) => {
            e.stopPropagation()

            const selected = onClick()
            handlers.suggestion?.execute(editor, { pos: selected?.pos }).run()
          }"
        />

        <B24DropdownMenu
          v-slot="{ open }"
          :modal="false"
          :items="handleItems(editor)"
          :content="{ side: 'left' }"
          :b24ui="{ content: 'w-48', label: 'text-xs' }"
          @update:open="editor.chain().setMeta('lockDragHandle', $event).run()"
        >
          <B24Button
            color="air-tertiary"
            size="sm"
            :icon="DragLIcon"
            :active="open"
            :class="b24ui.handle()"
          />
        </B24DropdownMenu>
      </B24EditorDragHandle>

      <B24EditorSuggestionMenu :editor="editor" :items="suggestionItems" />
      <B24EditorMentionMenu :editor="editor" :items="mentionItems" />
      <B24EditorEmojiMenu :editor="editor" :items="emojiItems" />
    </B24Editor>
  </div>
</template>
