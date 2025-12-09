<script setup lang="ts">
import type { EditorEmojiMenuItem } from '@bitrix24/b24ui-nuxt'
import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji'

const value = ref(`# Emoji Menu

Type : to insert emojis and select from the list of available emojis.`)

const items: EditorEmojiMenuItem[] = gitHubEmojis.filter(emoji => !emoji.name.startsWith('regional_indicator_'))

// SSR-safe function to append menus to body (avoids z-index issues in docs)
const appendToBody = import.meta.client ? () => document.body : undefined
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    :extensions="[Emoji]"
    content-type="markdown"
    placeholder="Type : to add emojis..."
    class="w-full min-h-21"
  >
    <B24EditorEmojiMenu :editor="editor" :items="items" :append-to="appendToBody" />
  </B24Editor>
</template>
