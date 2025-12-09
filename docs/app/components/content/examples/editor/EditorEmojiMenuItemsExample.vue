<script setup lang="ts">
import type { EditorEmojiMenuItem } from '@bitrix24/b24ui-nuxt'
import { Emoji } from '@tiptap/extension-emoji'

const value = ref(`Type : to see a custom emoji set.

You can also install the \`@tiptap/extension-emoji\` extension to use a comprehensive set with over 1800 emojis.`)

const items: EditorEmojiMenuItem[] = [
  {
    name: 'smile',
    emoji: '😄',
    shortcodes: ['smile'],
    tags: ['happy', 'joy', 'pleased']
  },
  {
    name: 'heart',
    emoji: '❤️',
    shortcodes: ['heart'],
    tags: ['love', 'like']
  },
  {
    name: 'thumbsup',
    emoji: '👍',
    shortcodes: ['thumbsup', '+1'],
    tags: ['approve', 'ok']
  },
  {
    name: 'fire',
    emoji: '🔥',
    shortcodes: ['fire'],
    tags: ['hot', 'burn']
  },
  {
    name: 'rocket',
    emoji: '🚀',
    shortcodes: ['rocket'],
    tags: ['ship', 'launch']
  },
  {
    name: 'eyes',
    emoji: '👀',
    shortcodes: ['eyes'],
    tags: ['look', 'watch']
  },
  {
    name: 'tada',
    emoji: '🎉',
    shortcodes: ['tada'],
    tags: ['party', 'celebration']
  },
  {
    name: 'thinking',
    emoji: '🤔',
    shortcodes: ['thinking'],
    tags: ['hmm', 'think', 'consider']
  }
]
</script>

<template>
  <B24Editor
    v-slot="{ editor }"
    v-model="value"
    :extensions="[Emoji]"
    content-type="markdown"
    placeholder="Type : to add emojis..."
    class="w-full min-h-26"
  >
    <B24EditorEmojiMenu :editor="editor" :items="items" />
  </B24Editor>
</template>
