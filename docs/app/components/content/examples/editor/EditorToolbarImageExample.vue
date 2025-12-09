<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { EditorToolbarItem } from '@bitrix24/b24ui-nuxt'
import DownloadIcon from '@bitrix24/b24icons-vue/outline/DownloadIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

const value = ref(`Click on the image below to see the image-specific toolbar:

![Placeholder](https://bitrix24.github.io/b24ui/assets/demo/b24rich_new.png)`)

const items = (editor: Editor): EditorToolbarItem[][] => {
  const node = editor.state.doc.nodeAt(editor.state.selection.from)

  return [
    [
      {
        icon: DownloadIcon,
        to: node?.attrs?.src,
        download: true,
        tooltip: { text: 'Download' }
      }
    ],
    [
      {
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
      }
    ]
  ]
}
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    class="w-full min-h-113"
  >
    <B24EditorToolbar
      :editor="editor"
      :items="items(editor)"
      layout="bubble"
      :should-show="({ editor, view }) => {
        return editor.isActive('image') && view.hasFocus()
      }"
    />
  </B24Editor>
</template>
