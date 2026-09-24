<script setup lang="ts">
import type { ChatMessageProps } from '@bitrix24/b24ui-nuxt'
import { isPartStreaming } from '@bitrix24/b24ui-nuxt/utils/ai'
import { Markdown } from '@comark/vue'
import shiki from '@comark/vue/plugins/shiki'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const messages = ref<ChatMessageProps[]>([{
  id: '1',
  role: 'user',
  parts: [{ type: 'text', text: 'What is Bitrix24 UI?' }]
}, {
  id: '2',
  role: 'assistant',
  parts: [{ type: 'text', text: 'Bitrix24 UI is a Vue component library built on Reka UI, Tailwind CSS, and Tailwind Variants. It provides 130+ accessible components for building modern web apps.' }]
}])
const input = ref('')

// A static demo: nothing is sent anywhere. Replace this with a call to your own endpoint.
function reply(text: string) {
  messages.value.push(
    { id: `${Date.now()}-user`, role: 'user', parts: [{ type: 'text', text }] },
    { id: `${Date.now()}-assistant`, role: 'assistant', parts: [{ type: 'text', text: 'This demo is static, so nothing leaves the page. To get real answers, connect the prompt to your own endpoint — the Chat page shows how.' }] }
  )
}

function onSubmit() {
  if (!input.value.trim()) return

  reply(input.value)

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
            :messages="messages"
            status="ready"
            :user="{ side: 'left', variant: 'message', avatar: { src: '/b24ui/avatar/employee.png', loading: 'lazy' as const } }"
            :assistant="{ icon: RobotIcon }"
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
                  <p v-else-if="message.role === 'user'" class="whitespace-pre-wrap leading-6">
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
                            @submit="onSubmit"
            >
              <B24ChatPromptSubmit status="ready" />
            </B24ChatPrompt>
          </template>
        </B24ChatPalette>
      </B24Theme>
    </template>
  </B24Modal>
</template>
