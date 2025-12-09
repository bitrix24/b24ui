<script setup lang="ts">
import { upperFirst } from 'scule'
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import { mapEditorItems } from '@bitrix24/b24ui-nuxt/utils/editor'
import type { Editor, JSONContent } from '@tiptap/vue-3'
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import ResumeIcon from '@bitrix24/b24icons-vue/outline/ResumeIcon'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CopyFileIcon from '@bitrix24/b24icons-vue/crm/CopyFileIcon'
import ArrowTopLIcon from '@bitrix24/b24icons-vue/outline/ArrowTopLIcon'
import ArrowDownLIcon from '@bitrix24/b24icons-vue/outline/ArrowDownLIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const value = ref(`Hover over the left side to see both drag handle and menu button.

Click the menu to see block actions. Try duplicating or deleting a block.`)

const selectedNode = ref<{ node: JSONContent, pos: number }>()

const items = (editor: Editor): DropdownMenuItem[][] => {
  if (!selectedNode.value?.node?.type) {
    return []
  }

  return mapEditorItems(editor, [
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
      {
        kind: 'delete',
        pos: selectedNode.value?.pos,
        label: 'Delete',
        icon: TrashcanIcon
      }
    ]
  ]) as DropdownMenuItem[][]
}
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    class="w-full min-h-19"
  >
    <B24EditorDragHandle v-slot="{ b24ui }" :editor="editor" @node-change="selectedNode = $event">
      <B24DropdownMenu
        v-slot="{ open }"
        :modal="false"
        :items="items(editor)"
        :content="{ side: 'left' }"
        :b24ui="{ content: 'w-48', label: 'text-xs' }"
        @update:open="editor.chain().setMeta('lockDragHandle', $event).run()"
      >
        <B24Button
          :icon="DragLIcon"
          color="air-tertiary"
          active-color="air-secondary"
          size="sm"
          :active="open"
          :class="b24ui.handle()"
        />
      </B24DropdownMenu>
    </B24EditorDragHandle>
  </B24Editor>
</template>
