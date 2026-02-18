<script setup lang="ts">
import type { UIMessage } from 'ai'
import { defineAsyncComponent } from 'vue'
import { Chat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { createReusableTemplate } from '@vueuse/core'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'
// import SendIcon from '@bitrix24/b24icons-vue/main/SendIcon'
// import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
// import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'
import ExpandLIcon from '@bitrix24/b24icons-vue/outline/ExpandLIcon'
import CollapseLIcon from '@bitrix24/b24icons-vue/outline/CollapseLIcon'

const components: Record<string, any> = {
  pre: defineAsyncComponent(() => import('./AssistantPreStream.vue'))
}

const [DefineChatContent, ReuseChatContent] = createReusableTemplate<{ showExpandButton?: boolean }>()

const { isOpen, isExpanded, isMobile, panelWidth, toggleExpanded, messages, pendingMessage, clearPending, faqQuestions } = useAssistant()
const config = useRuntimeConfig()
const toast = useToast()
const input = ref('')

const displayTitle = computed(() => 'Ask AI')
const displayPlaceholder = computed(() => 'Ask a question...')

const chat = new Chat({
  messages: messages.value,
  transport: new DefaultChatTransport({
    api: config.public.bxAssistant.apiPath
  }),
  onError: (error: Error) => {
    const message = (() => {
      try {
        const parsed = JSON.parse(error.message)
        return parsed?.message || error.message
      } catch {
        return error.message
      }
    })()

    toast.add({
      description: message,
      icon: AlertIcon,
      color: 'air-primary-alert',
      duration: 0
    })
  },
  onFinish: () => {
    messages.value = chat.messages
  }
})

watch(pendingMessage, (message: string | undefined) => {
  if (message) {
    if (messages.value.length === 0 && chat.messages.length > 0) {
      chat.messages.length = 0
    }
    chat.sendMessage({
      text: message
    })
    clearPending()
  }
}, { immediate: true })

watch(messages, (newMessages: UIMessage[]) => {
  if (newMessages.length === 0 && chat.messages.length > 0) {
    chat.messages.length = 0
  }
}, { deep: true })

const lastMessage = computed(() => chat.messages.at(-1))
const showThinking = computed(() =>
  chat.status === 'streaming'
  && lastMessage.value?.role === 'assistant'
  && !lastMessage.value?.parts?.some((p: { type: string }) => p.type === 'text')
)

function getMessageToolCalls(message: any) {
  if (!message?.parts) return []
  return message.parts

    .filter((p: any) => p.type === 'data-tool-calls')

    .flatMap((p: any) => p.data?.tools || [])
}

function handleSubmit(event?: Event) {
  event?.preventDefault()

  if (!input.value.trim()) {
    return
  }

  chat.sendMessage({
    text: input.value
  })

  input.value = ''
}

function askQuestion(question: string) {
  chat.sendMessage({
    text: question
  })
}

function resetChat() {
  chat.stop()
  messages.value = []
  chat.messages.length = 0
}

onMounted(() => {
  if (pendingMessage.value) {
    chat.sendMessage({
      text: pendingMessage.value
    })
    clearPending()
  } else if (chat.lastMessage?.role === 'user') {
    chat.regenerate()
  }
})
</script>

<template>
  <DefineChatContent v-slot="{ showExpandButton = true }">
    <div class="flex h-full flex-col">
      <div class="min-h-(--topbar-height) flex shrink-0 items-center justify-between px-4 border-(--ui-color-design-outline-content-divider) border-0 lg:border-b-1">
        <ProseH3 class="mb-0">
          {{ displayTitle }}
        </ProseH3>
        <div class="flex items-center gap-1">
          <B24Tooltip
            v-if="showExpandButton"
            :text="isExpanded ? 'Collapse' : 'Expand'"
          >
            <B24Button
              :icon="isExpanded ? CollapseLIcon : ExpandLIcon"
              color="air-tertiary"
              size="sm"
              @click="toggleExpanded"
            />
          </B24Tooltip>
          <B24Tooltip
            v-if="chat.messages.length > 0"
            text="Clear chat"
          >
            <B24Button
              :icon="TrashcanIcon"
              color="air-tertiary"
              size="sm"
              @click="resetChat"
            />
          </B24Tooltip>
          <B24Tooltip text="Close">
            <B24Button
              :icon="CrossMIcon"
              color="air-tertiary"
              size="sm"
              @click="isOpen = false"
            />
          </B24Tooltip>
        </div>
      </div>

      <div class="bg-gray-40 min-h-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-transparent">
        <B24ChatMessages
          v-if="chat.messages.length > 0"
          :messages="chat.messages"
          compact
          :status="chat.status"
          :user="{ b24ui: { content: 'text-sm' } }"
          :b24ui="{ indicator: '*:bg-accented', root: 'h-auto!' }"
          class="px-4 py-4"
        >
          <template #content="{ message }">
            <div class="flex flex-col gap-2">
              <AssistantLoading
                v-if="message.role === 'assistant' && (getMessageToolCalls(message).length > 0 || (showThinking && message.id === lastMessage?.id))"
                :tool-calls="getMessageToolCalls(message)"
                :is-loading="showThinking && message.id === lastMessage?.id"
              />
              <template
                v-for="(part, index) in message.parts"
                :key="`${message.id}-${part.type}-${index}${'state' in part ? `-${part.state}` : ''}`"
              >
                <MDCCached
                  v-if="part.type === 'text' && part.text"
                  :value="part.text"
                  :cache-key="`${message.id}-${index}`"
                  :components="components"
                  :parser-options="{ highlight: false }"
                  class="*:first:mt-0 *:last:mb-0"
                />
              </template>
            </div>
          </template>
        </B24ChatMessages>

        <div
          v-else
          class="p-4"
        >
          <div
            v-if="!faqQuestions?.length"
            class="flex h-full flex-col items-center justify-center py-12 text-center"
          >
            <B24Avatar
              :icon="AiStarsIcon"
              alt="AI"
              size="xs"
              :b24ui="{
                root: 'bg-(--color-ai-150) ring-(--color-ai-550)',
                icon: 'text-(--color-ai-950)'
              }"
            />
            <h3 class="mb-0">
              Ask anything
            </h3>
            <p class="max-w-xs text-sm text-muted">
              Get help navigating the documentation, understanding concepts, and finding answers.
            </p>
          </div>

          <template v-else>
            <ProseH3 class="mb-4">
              FAQ
            </ProseH3>

            <div class="flex flex-col gap-5">
              <div
                v-for="category in faqQuestions"
                :key="category.category"
                class="flex flex-col gap-1.5"
              >
                <h4 class="text-xs font-medium uppercase tracking-wide text-dimmed">
                  {{ category.category }}
                </h4>
                <div class="flex flex-col">
                  <button
                    v-for="question in category.items"
                    :key="question"
                    class="py-1.5 text-left text-sm text-muted transition-colors hover:text-highlighted"
                    @click="askQuestion(question)"
                  >
                    {{ question }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="bg-gray-40 w-full shrink-0 p-3">
        <B24ChatPrompt
          v-model="input"
          :rows="2"
          :placeholder="displayPlaceholder"
          maxlength="1000"
          :ui="{
            root: 'shadow-none!',
            body: '*:p-0! *:rounded-none! *:text-base!'
          }"
          @submit="handleSubmit"
        >
          <template #footer>
            <div class="flex items-center gap-1 text-xs text-muted">
              <span>Line break</span>
              <B24Kbd
                size="sm"
                value="shift"
              />
              <B24Kbd
                size="sm"
                value="enter"
              />
            </div>
            <B24ChatPromptSubmit
              class="ml-auto"
              size="xs"
              :status="chat.status"
              @stop="chat.stop()"
              @reload="chat.regenerate()"
            />
          </template>
        </B24ChatPrompt>
        <div class="mt-1 flex items-center justify-between">
          <ProseP accent="less" small>Chat is cleared on refresh</ProseP>
          <ProseP accent="less" small>
            {{ input.length }}/1000
          </ProseP>
        </div>
      </div>
    </div>
  </DefineChatContent>

  <aside
    v-if="!isMobile"
    class="base-mode left-auto! fixed top-0 z-50 h-dvh overflow-hidden border-l border-(--ui-color-design-outline-content-divider) bg-(--ui-color-bg-content-primary) transition-[right,width] duration-200 ease-linear will-change-[right,width]"
    :style="{
      width: `${panelWidth}px`,
      right: isOpen ? '0' : `-${panelWidth}px`
    }"
  >
    <div
      class="h-full transition-[width] duration-200 ease-linear"
      :style="{ width: `${panelWidth}px` }"
    >
      <ReuseChatContent :show-expand-button="true" />
    </div>
  </aside>

  <B24Slideover
    v-else
    v-model:open="isOpen"
    side="right"
    :b24ui="{ content: 'ring-0 base-mode bg-(--ui-color-bg-content-primary)' }"
  >
    <template #content>
      <ReuseChatContent :show-expand-button="false" />
    </template>
  </B24Slideover>
</template>
