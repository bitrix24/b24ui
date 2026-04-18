<script setup lang="ts">
import { isReasoningUIPart, isTextUIPart, isToolUIPart, getToolName } from 'ai'
import type { UIMessage } from 'ai'
import { Chat } from '@ai-sdk/vue'
import { isPartStreaming, isToolStreaming } from '@bitrix24/b24ui-nuxt/utils/ai'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'

type MayHasQuery = {
  query?: string
}

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

function clearMessages() {
  if (chat.status === 'streaming') {
    chat.stop()
  }
  chat.messages = []
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function getFaviconUrl(url: string): string {
  return `https://www.google.com/s2/favicons?sz=32&domain=${getDomain(url)}`
}
</script>

<template>
  <B24DashboardNavbar class="h-(--b24ui-header-height) shrink-0 flex items-center justify-between ps-2 pe-4 lg:ps-4 lg:pe-4 gap-1.5 absolute top-0 inset-x-0 z-5">
    <template #right>
      <B24Button
        :icon="TrashcanIcon"
        size="sm"
        color="air-tertiary"
        :b24ui="{ baseLine: '[--ui-btn-icon-size:19px]' }"
        @click="clearMessages"
      />
    </template>
  </B24DashboardNavbar>

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
            :streaming="isPartStreaming(part)"
            chevron="leading"
            :b24ui="{ body: 'scrollbar-thin scrollbar-transparent' }"
          >
            <MDC
              :value="part.text"
              :cache-key="`reasoning-${message.id}-${index}`"
              class="*:first:mt-0 *:last:mb-0"
            />
          </B24ChatReasoning>
          <template v-else-if="isTextUIPart(part)">
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

          <B24ChatTool
            v-else-if="isToolUIPart(part) && getToolName(part) === 'web_search'"
            :text="isToolStreaming(part) ? 'Searching the web...' : 'Searched the web'"
            :suffix="(part.input as MayHasQuery)?.query"
            :streaming="isToolStreaming(part)"
            chevron="leading"
          >
            <div v-if="part.output && (part.output as any[]).length" class="p-1 border border-default rounded-md max-h-40 overflow-y-auto">
              <a
                v-for="source in (part.output as any[])"
                :key="source.url"
                :href="source.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-2 py-1 text-sm text-muted hover:text-default hover:bg-elevated/50 transition-colors min-w-0 rounded-md"
              >
                <img
                  :src="getFaviconUrl(source.url)"
                  :alt="getDomain(source.url)"
                  class="size-4 shrink-0 rounded-sm"
                  loading="lazy"
                  @error="($event.target as HTMLImageElement).style.display = 'none'"
                >
                <span class="truncate">{{ source.title || source.url }}</span>
                <span class="text-xs text-dimmed ms-auto shrink-0">{{ getDomain(source.url) }}</span>
              </a>
            </div>
          </B24ChatTool>
        </template>
      </template>
    </B24ChatMessages>

    <B24ChatPrompt
      v-model="input"
      :error="chat.error"
      variant="outline"
      class="sticky bottom-0"
      @submit="onSubmit"
    >
      <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
    </B24ChatPrompt>
  </div>
</template>
