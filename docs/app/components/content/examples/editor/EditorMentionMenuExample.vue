<script setup lang="ts">
import type { EditorMentionMenuItem } from '@bitrix24/b24ui-nuxt'

const value = ref(`# Mention Menu

Type @ to mention someone and select from the list of available users.`)

const items: EditorMentionMenuItem[] = [
  {
    label: 'bitrix24',
    avatar: { src: 'https://github.com/bitrix24.png' }
  },
  {
    label: 'Employee',
    avatar: { src: '/b24ui/avatar/employee.png' }
  },
  {
    label: 'Assistant',
    avatar: { src: '/b24ui/avatar/assistant.png' }
  }
]

// SSR-safe function to append menus to body (avoids z-index issues in docs)
const appendToBody = import.meta.client ? () => document.body : undefined
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Type @ to mention someone..."
    class="w-full min-h-21"
  >
    <B24EditorMentionMenu :editor="editor" :items="items" :append-to="appendToBody" />
  </B24Editor>
</template>
