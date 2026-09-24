<script setup lang="ts">
import type { ChatMessageProps } from '@bitrix24/b24ui-nuxt'
import { isPartStreaming } from '@bitrix24/b24ui-nuxt/utils/ai'
import { Markdown } from '@comark/vue'
import shiki from '@comark/vue/plugins/shiki'
import OpenChatIcon from '@bitrix24/b24icons-vue/outline/OpenChatIcon'

const open = ref(true)
const input = ref('')

const messages = ref<ChatMessageProps[]>([
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'What is Bitrix24 UI?' }]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [{ type: 'text', text: 'Bitrix24 UI is a Vue component library built on Reka UI, Tailwind CSS, and Tailwind Variants. It provides 130+ accessible components for building modern web apps.' }]
  }
])

// A static demo: nothing is sent anywhere. Replace this with a call to your own endpoint.
function onSubmit() {
  const text = input.value.trim()
  if (!text) return

  messages.value.push(
    { id: `${Date.now()}-user`, role: 'user', parts: [{ type: 'text', text }] },
    { id: `${Date.now()}-assistant`, role: 'assistant', parts: [{ type: 'text', text: 'This demo is static, so nothing leaves the page. To get real answers, connect the prompt to your own endpoint — the Chat page shows how.' }] }
  )

  input.value = ''
}

const b24ui = {
  prose: {
    p: { base: 'my-2 text-sm/6' },
    li: { base: 'my-0.5 text-sm/6' },
    ul: { base: 'my-2' },
    ol: { base: 'my-2' },
    h1: { base: 'text-xl mb-4' },
    h2: { base: 'text-lg mt-6 mb-3' },
    h3: { base: 'text-base mt-4 mb-2' },
    h4: { base: 'text-sm mt-3 mb-1.5' },
    code: { base: 'text-xs' },
    pre: { root: 'my-2', base: 'text-xs/5' },
    table: { root: 'my-2' },
    hr: { base: 'my-4' }
  }
}
</script>

<template>
  <div class="flex flex-1">
    <div class="flex-1 flex flex-col">
      <div class="h-(--b24ui-header-height) shrink-0 flex items-center justify-end px-4 border-b border-default">
        <B24Button
          :icon="OpenChatIcon"
          color="air-tertiary"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>

      <div class="flex-1 p-4">
        <Placeholder class="size-full" />
      </div>
    </div>

    <B24Sidebar
      v-model:open="open"
      side="right"
      title="AI Chat"
      close
      :style="{ '--sidebar-width': '20rem' }"
      :b24ui="{ container: 'h-full' }"
    >
      <B24Theme :b24ui="b24ui">
        <B24ChatMessages
          :messages="messages"
          status="ready"
          compact
          class="px-0"
        >
          <template #content="{ message }">
            <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}`">
              <template v-if="part.type === 'text'">
                <Markdown
                  v-if="message.role === 'assistant'"
                  :value="part.text"
                  :streaming="isPartStreaming(part)"
                  :plugins="[shiki()]"
                  class="*:first:mt-0 *:last:mb-0"
                />
                <p v-else-if="message.role === 'user'" class="whitespace-pre-wrap text-sm/6">
                  {{ part.text }}
                </p>
              </template>
            </template>
          </template>
        </B24ChatMessages>
      </B24Theme>

      <template #footer>
        <B24ChatPrompt
          v-model="input"
          :autofocus="false"
          variant="outline"
          size="sm"
          :b24ui="{ base: 'px-0' }"
          @submit="onSubmit"
        >
          <B24ChatPromptSubmit size="sm" status="ready" />
        </B24ChatPrompt>
      </template>
    </B24Sidebar>
  </div>
</template>
