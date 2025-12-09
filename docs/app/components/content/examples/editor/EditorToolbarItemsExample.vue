<script setup lang="ts">
import type { EditorToolbarItem } from '@bitrix24/b24ui-nuxt'
import { TextAlign } from '@tiptap/extension-text-align'
import UndoIcon from '@bitrix24/b24icons-vue/outline/UndoIcon'
import RedoIcon from '@bitrix24/b24icons-vue/outline/RedoIcon'
import HeaderIcon from '@bitrix24/b24icons-vue/editor/HeaderIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import HrIcon from '@bitrix24/b24icons-vue/editor/HrIcon'
import BoldIcon from '@bitrix24/b24icons-vue/outline/BoldIcon'
import ItalicIcon from '@bitrix24/b24icons-vue/outline/ItalicIcon'
import UnderlineIcon from '@bitrix24/b24icons-vue/outline/UnderlineIcon'
import StrikethroughIcon from '@bitrix24/b24icons-vue/outline/StrikethroughIcon'
import DeveloperResourcesIcon from '@bitrix24/b24icons-vue/outline/DeveloperResourcesIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import AlignLeftIcon from '@bitrix24/b24icons-vue/outline/AlignLeftIcon'
import AlignCenterIcon from '@bitrix24/b24icons-vue/outline/AlignCenterIcon'
import AlignRightIcon from '@bitrix24/b24icons-vue/outline/AlignRightIcon'
import AlignJustifyIcon from '@bitrix24/b24icons-vue/outline/AlignJustifyIcon'

const value = ref(`This toolbar showcases **all available formatting options** using built-in handlers. Try the different controls to see them in action!

You can apply **bold**, *italic*, <u>underline</u>, ~~strikethrough~~, and \`inline code\` formatting to your text.
`)

const items: EditorToolbarItem[][] = [
  // History controls
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
  // Block types
  [
    {
      icon: HeaderIcon,
      tooltip: { text: 'Headings' },
      content: { align: 'start' },
      items: [
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
          kind: 'heading',
          level: 4,
          label: 'Heading 4'
        }
      ]
    },
    {
      icon: BulletedListIcon,
      tooltip: { text: 'Lists' },
      content: {
        align: 'start'
      },
      items: [
        {
          kind: 'bulletList',
          icon: BulletedListIcon,
          label: 'Bullet List'
        },
        {
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
    }
  ],
  // Text formatting
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
  // Link
  [
    {
      kind: 'link',
      icon: LinkIcon,
      tooltip: { text: 'Link' }
    }
  ],
  // Text alignment
  [
    {
      icon: AlignJustifyIcon,
      tooltip: { text: 'Text Align' },
      content: {
        align: 'end'
      },
      items: [
        {
          kind: 'textAlign',
          align: 'left',
          icon: AlignLeftIcon,
          label: 'Align Left'
        }, {
          kind: 'textAlign',
          align: 'center',
          icon: AlignCenterIcon,
          label: 'Align Center'
        }, {
          kind: 'textAlign',
          align: 'right',
          icon: AlignRightIcon,
          label: 'Align Right'
        }, {
          kind: 'textAlign',
          align: 'justify',
          icon: AlignJustifyIcon,
          label: 'Align Justify'
        }
      ]
    }
  ]
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    :extensions="[TextAlign.configure({ types: ['heading', 'paragraph'] })]"
    class="w-full min-h-37 flex flex-col gap-4"
  >
    <B24EditorToolbar :editor="editor" :items="items" class="sm:px-8 overflow-x-auto bg-(--ui-color-bg-content-primary)" />
  </B24Editor>
</template>
