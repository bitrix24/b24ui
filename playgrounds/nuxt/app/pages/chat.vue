<script setup lang="ts">
import type { UIMessage } from 'ai'
import { isReasoningUIPart, isTextUIPart } from 'ai'
import { Chat } from '@ai-sdk/vue'
import { isStreamingPart } from '@bitrix24/b24ui-nuxt/utils/ai'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'

const toast = useToast()

const messages: UIMessage[] = []
const input = ref('')

const chat = new Chat({
  messages,
  onError(error) {
    let message = error.message
    try {
      if (typeof message === 'string' && message[0] === '{') {
        message = JSON.parse(message).message || message
      }
    } catch { /* keep original */ }

    toast.add({
      description: message,
      icon: AlertIcon,
      color: 'air-primary-alert',
      duration: 0
    })
  }
})

function onSubmit() {
  if (!input.value.trim()) return

  chat.sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <B24DashboardNavbar class="absolute top-0 inset-x-0 z-5 border-b-0 lg:pointer-events-none" />

  <div class="flex-1 flex flex-col gap-4 sm:gap-6 max-w-[650px] w-full mx-auto min-h-0">
    <B24ChatMessages
      :messages="chat.messages"
      :status="chat.status"
      :user="{ avatar: { src: '/avatar/assistant.png' } }"
      :assistant="{ icon: RobotIcon }"
      :spacing-offset="48"
    >
      <template #content="{ message }">
        <template
          v-for="(part, index) in message.parts"
          :key="`${message.id}-${part.type}-${index}`"
        >
          <B24ChatReasoning
            v-if="isReasoningUIPart(part)"
            :text="part.text"
            :streaming="isStreamingPart(message, index, chat)"
            chevron="leading"
            :b24ui="{ body: 'scrollbar-thin scrollbar-transparent' }"
          >
            <MDC
              :value="part.text"
              :cache-key="`${message.id}-${index}`"
              class="*:first:mt-0 *:last:mb-0"
            />
          </B24ChatReasoning>
          <MDC
            v-else-if="isTextUIPart(part)"
            :value="part.text"
            :cache-key="`${message.id}-${index}`"
            class="*:first:mt-0 *:last:mb-0"
          />
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
</template>
