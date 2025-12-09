<script setup lang="ts">
import type { EditorMentionMenuItem } from '@bitrix24/b24ui-nuxt'

const value = ref(`Type @ to mention a user.

You can customize the items with avatars, icons, and descriptions.`)

const items: EditorMentionMenuItem[] = [
  {
    label: 'bitrix24',
    avatar: { src: 'https://github.com/bitrix24.png' },
    description: 'Bitrix24 profile'
  },
  {
    label: 'Employee',
    avatar: { src: '/b24ui/avatar/employee.png' }
  },
  {
    label: 'Assistant',
    avatar: { src: '/b24ui/avatar/assistant.png' },
    disabled: true
  }
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    content-type="markdown"
    placeholder="Type @ to mention..."
    class="w-full min-h-19"
  >
    <B24EditorMentionMenu :editor="editor" :items="items" />
  </B24Editor>
</template>
