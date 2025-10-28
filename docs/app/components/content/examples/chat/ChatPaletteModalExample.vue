<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import type { UIMessage } from 'ai'
import { getTextFromMessage } from '@bitrix24/b24ui-nuxt/utils/ai'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const messages: UIMessage[] = []
const input = ref('')

const chat = new Chat({
  messages
})

function onSubmit() {
  chat.sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <B24Modal open :b24ui="{ content: 'sm:max-w-3xl sm:h-[28rem]' }">
    <template #content>
      <B24ChatPalette>
        <B24ChatMessages
          :messages="chat.messages"
          :status="chat.status"
          :user="{ side: 'left', variant: 'message', avatar: { src: '/b24ui/avatar/employee.png' } }"
          :assistant="{ icon: RobotIcon }"
        >
          <template #content="{ message }">
            <MDC
              :value="getTextFromMessage(message)"
              :cache-key="message.id"
              class="[&_.my-5]:my-2.5 *:first:!mt-0 *:last:!mb-0 [&_.leading-7]:!leading-6"
            />
          </template>
        </B24ChatMessages>

        <template #prompt>
          <B24ChatPrompt
            v-model="input"
            :icon="SearchIcon"
            :error="chat.error"
            @submit="onSubmit"
          />
        </template>
      </B24ChatPalette>
    </template>
  </B24Modal>
</template>
