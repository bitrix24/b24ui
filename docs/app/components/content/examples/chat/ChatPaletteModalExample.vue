<script setup lang="ts">
import type { UIMessage } from 'ai'
import { isTextUIPart, DefaultChatTransport } from 'ai'
import { Chat } from '@ai-sdk/vue'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const config = useRuntimeConfig()

const messages: UIMessage[] = [{
  id: '1',
  role: 'user',
  parts: [{ type: 'text', text: 'What is Bitrix24 UI?' }]
}, {
  id: '2',
  role: 'assistant',
  parts: [{ type: 'text', text: 'Bitrix24 UI is a Vue component library built on Reka UI, Tailwind CSS, and Tailwind Variants. It provides 125+ accessible components for building modern web apps.' }]
}]
const input = ref('')

const chat = new Chat({
  messages,
  transport: new DefaultChatTransport({
    api: `${config.public.baseUrl}/api/search`
  })
})

function onSubmit() {
  if (!input.value.trim()) return

  chat.sendMessage({ text: input.value })

  input.value = ''
}

const b24ui = {
  prose: {
    p: { base: 'my-2 leading-6' },
    li: { base: 'my-0.5 leading-6' },
    ul: { base: 'my-2' },
    ol: { base: 'my-2' },
    h1: { base: 'text-xl my-2' },
    h2: { base: 'text-lg my-2' },
    h3: { base: 'text-base my-2' },
    h4: { base: 'text-sm my-2' },
    pre: { root: 'my-2' },
    table: { root: 'my-2' },
    hr: { base: 'my-2' }
  }
}
</script>

<template>
  <B24Modal open :b24ui="{ content: 'p-0 pt-0 sm:max-w-[786px] sm:h-[448px]' }">
    <template #content>
      <B24Theme :b24ui="b24ui">
        <B24ChatPalette>
          <B24ChatMessages
            :messages="chat.messages"
            :status="chat.status"
            :user="{ side: 'left', variant: 'message', avatar: { src: '/b24ui/avatar/employee.png', loading: 'lazy' as const } }"
            :assistant="{ icon: RobotIcon }"
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

          <template #prompt>
            <B24ChatPrompt
              v-model="input"
              :icon="SearchIcon"
              variant="plain"
              :error="chat.error"
              @submit="onSubmit"
            >
              <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
            </B24ChatPrompt>
          </template>
        </B24ChatPalette>
      </B24Theme>
    </template>
  </B24Modal>
</template>
