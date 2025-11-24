<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import type { UIMessage } from 'ai'
import { getTextFromMessage } from '@bitrix24/b24ui-nuxt/utils/ai'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const messages: UIMessage[] = []
const input = ref('')

const groups = computed(() => [{
  id: 'ai',
  ignoreFilter: true,
  items: [{
    label: searchTerm.value ? `Ask AI for “${searchTerm.value}”` : 'Ask AI',
    icon: RobotIcon,
    onSelect: (e: any) => {
      e.preventDefault()

      ai.value = true

      if (searchTerm.value) {
        messages.push({
          id: '1',
          role: 'user',
          parts: [{ type: 'text', text: searchTerm.value }]
        })

        chat.regenerate()
      }
    }
  }]
}])

const ai = ref(false)
const searchTerm = ref('')

const chat = new Chat({
  messages
})

function onSubmit() {
  chat.sendMessage({ text: input.value })

  input.value = ''
}

function onClose(e: Event) {
  e.preventDefault()

  ai.value = false
}
</script>

<template>
  <B24ContentSearch v-model:search-term="searchTerm" open :groups="groups">
    <template v-if="ai" #content>
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
            variant="plain"
            :icon="SearchIcon"
            :error="chat.error"
            @submit="onSubmit"
            @close="onClose"
          >
            <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
          </B24ChatPrompt>
        </template>
      </B24ChatPalette>
    </template>
  </B24ContentSearch>
</template>
