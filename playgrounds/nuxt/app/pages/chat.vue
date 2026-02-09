<script setup lang="ts">
import type { UIMessage } from 'ai'
import { Chat } from '@ai-sdk/vue'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'

const toast = useToast()

const messages: UIMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'Hello, how are you?' }]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [{ type: 'text', text: 'I\'m good, thank you! How can I help you today?' }]
  }
]
const input = ref('')

const chat = new Chat({
  messages,
  onError(error) {
    const { message: description } = typeof error.message === 'string' && error.message[0] === '{' ? JSON.parse(error.message) : error

    toast.add({
      description,
      icon: AlertIcon,
      color: 'air-primary-alert',
      duration: 0
    })
  }
})

function onSubmit() {
  chat.sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <B24Card
    class="mt-[12px] edge-dark"
    :b24ui="{
      body: [
        'sm:pr-[6px]',
        'relative',
        'flex-1',
        'flex flex-col',
        'min-w-0',
        'h-[calc(100vh-var(--topbar-height)-26px)]',
        'bg-[url(/bg/pattern-1.png)]',
        'bg-cover bg-center bg-fixed bg-no-repeat',
        'bg-[#799fe1]/90'
      ].join(' ')
    }"
  >
    <div class="flex-1 overflow-y-auto p-1 flex flex-col justify-center items-center scrollbar-thin scrollbar-transparent">
      <div class="flex-1 flex flex-col gap-4 sm:gap-6 w-full mx-auto min-h-0">
        <B24ChatMessages
          :messages="chat.messages"
          :status="chat.status"
          :user="{ avatar: { src: '/avatar/assistant.png' } }"
          :assistant="{ icon: RobotIcon }"
        >
          <template #content="{ message }">
            <template
              v-for="(part, index) in message.parts"
              :key="`${message.id}-${part.type}-${index}${'state' in part ? `-${part.state}` : ''}`"
            >
              <MDC
                v-if="part.type === 'text' && message.role === 'assistant'"
                :value="part.text"
                :cache-key="`${message.id}-${index}`"
                class="*:first:mt-0 *:last:mb-0"
              />
              <p v-else-if="part.type === 'text' && message.role === 'user'" class="whitespace-pre-wrap">
                {{ part.text }}
              </p>
              <p
                v-else-if="part.type === 'reasoning'"
                class="text-sm text-(--b24ui-typography-description-color) my-5"
              >
                {{ part.state === 'done' ? 'Thoughts' : 'Thinking...' }}
              </p>
            </template>
          </template>
        </B24ChatMessages>
        <B24ChatPrompt
          v-model="input"
          :error="chat.error"
          variant="outline"
          class="sticky bottom-0 light"
          @submit="onSubmit"
        >
          <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
        </B24ChatPrompt>
      </div>
    </div>
  </B24Card>
</template>
