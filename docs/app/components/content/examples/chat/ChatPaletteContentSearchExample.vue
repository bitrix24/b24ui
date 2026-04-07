<script setup lang="ts">
import type { UIMessage } from 'ai'
import { isTextUIPart, DefaultChatTransport } from 'ai'
import { Chat } from '@ai-sdk/vue'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const config = useRuntimeConfig()

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

function onClose(e: Event) {
  e.preventDefault()

  ai.value = false
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
  <B24ContentSearch v-model:search-term="searchTerm" open :groups="groups">
    <template v-if="ai" #content>
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
                <MDC
                  v-if="isTextUIPart(part)"
                  :value="part.text"
                  :cache-key="`${message.id}-${index}`"
                  class="*:first:mt-0 *:last:mb-0"
                />
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
              @close="onClose"
            >
              <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
            </B24ChatPrompt>
          </template>
        </B24ChatPalette>
      </B24Theme>
    </template>
  </B24ContentSearch>
</template>
