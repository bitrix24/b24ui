<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import type { UIMessage } from 'ai'
import { DefaultChatTransport } from 'ai'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const config = useRuntimeConfig()

const messages: UIMessage[] = []
const input = ref('')

const chat = new Chat({
  messages,
  transport: new DefaultChatTransport({
    api: `${config.public.baseUrl}/api/search`
  })
})

function onSubmit() {
  chat.sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <B24Modal open :b24ui="{ content: 'p-0 pt-0 sm:max-w-[786px] sm:h-[448px]' }">
    <template #content>
      <B24ChatPalette>
        <B24ChatMessages
          :messages="chat.messages"
          :status="chat.status"
          :user="{ side: 'left', variant: 'message', avatar: { src: '/b24ui/avatar/employee.png' } }"
          :assistant="{ icon: RobotIcon }"
        >
          <template #content="{ message }">
            <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}`">
              <MDC
                v-if="part.type === 'text' && message.role === 'assistant'"
                :value="part.text"
                :cache-key="`${message.id}-${index}`"
                class="[&_.my-5]:my-2.5 *:first:!mt-0 *:last:!mb-0 [&_.leading-7]:!leading-6"
              />
              <p v-else-if="part.type === 'text' && message.role === 'user'" class="whitespace-pre-wrap">
                {{ part.text }}
              </p>
            </template>
          </template>
        </B24ChatMessages>

        <template #prompt>
          <B24ChatPrompt
            v-model="input"
            variant="plain"
            :icon="SearchIcon"
            :error="chat.error"
            @submit="onSubmit"
          >
            <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
          </B24ChatPrompt>
        </template>
      </B24ChatPalette>
    </template>
  </B24Modal>
</template>
