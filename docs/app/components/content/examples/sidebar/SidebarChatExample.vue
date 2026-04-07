<script setup lang="ts">
import type { UIMessage } from 'ai'
import { DefaultChatTransport, isTextUIPart } from 'ai'
import { Chat } from '@ai-sdk/vue'
import CloseChatIcon from '@bitrix24/b24icons-vue/outline/CloseChatIcon'

const config = useRuntimeConfig()
const open = ref(true)
const input = ref('')

const messages: UIMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'What is Bitrix24 UI?' }]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [{ type: 'text', text: 'Bitrix24 UI is a Vue component library built on Reka UI, Tailwind CSS, and Tailwind Variants. It provides 125+ accessible components for building modern web apps.' }]
  }
]

const chat = new Chat({
  messages,
  transport: new DefaultChatTransport({
    api: `${config.public.baseUrl}/api/chat`
  })
})

function onSubmit() {
  if (!input.value.trim()) return

  chat.sendMessage({ text: input.value })

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
        <!-- @todo i-lucide-panel-right -->
        <B24Button
          :icon="CloseChatIcon"
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
          :messages="chat.messages"
          :status="chat.status"
          compact
          class="px-0"
        >
          <template #content="{ message }">
            <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}`">
              <template v-if="isTextUIPart(part)">
                <MDC
                  v-if="message.role === 'assistant'"
                  :value="part.text"
                  :cache-key="`${message.id}-${index}`"
                  class="*:first:mt-0 *:last:mb-0"
                />
                <p v-else-if="message.role === 'user'" class="whitespace-pre-wrap">
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
          :error="chat.error"
          :autofocus="false"
          variant="outline"
          size="sm"
          :b24ui="{ base: 'px-0' }"
          @submit="onSubmit"
        >
          <B24ChatPromptSubmit
            size="sm"
            :status="chat.status"
            @stop="chat.stop()"
            @reload="chat.regenerate()"
          />
        </B24ChatPrompt>
      </template>
    </B24Sidebar>
  </div>
</template>
