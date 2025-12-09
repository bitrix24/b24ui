<script setup lang="ts">
import type { EditorSuggestionMenuItem } from '@bitrix24/b24ui-nuxt'
import TextIcon from '@bitrix24/b24icons-vue/outline/TextIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import NumberedListIcon from '@bitrix24/b24icons-vue/outline/NumberedListIcon'
import QuoteIcon from '@bitrix24/b24icons-vue/outline/QuoteIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import HrIcon from '@bitrix24/b24icons-vue/editor/HrIcon'

const value = ref(`# Suggestion Menu

Type / to open the suggestion menu and browse available formatting commands.`)

const items: EditorSuggestionMenuItem[][] = [
  [
    {
      type: 'label',
      label: 'Text'
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
    }
  ],
  [
    {
      type: 'label',
      label: 'Lists'
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
    }
  ],
  [
    {
      type: 'label',
      label: 'Insert'
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
    },
    {
      kind: 'horizontalRule',
      label: 'Divider',
      icon: HrIcon
    }
  ]
]

// SSR-safe function to append menus to body (avoids z-index issues in docs)
const appendToBody = import.meta.client ? () => document.body : undefined
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Type / for commands..."
    class="w-full min-h-21"
  >
    <B24EditorSuggestionMenu :editor="editor" :items="items" :append-to="appendToBody" />
  </B24Editor>
</template>
