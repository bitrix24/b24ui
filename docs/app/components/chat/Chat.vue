<script setup lang="ts">
import type { DefineComponent } from 'vue'
import type { ToolUIPart, DynamicToolUIPart } from 'ai'
import type { IconComponent } from '@bitrix24/b24ui-nuxt'
import { DefaultChatTransport, isToolUIPart, isReasoningUIPart, isTextUIPart, getToolName } from 'ai'
import { Chat } from '@ai-sdk/vue'
import { isPartStreaming, isToolStreaming } from '@bitrix24/b24ui-nuxt/utils/ai'
import { useMemoize } from '@vueuse/core'
import * as theme from '#build/b24ui'
import ProseStreamPre from '../prose/PreStream.vue'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import UndoIcon from '@bitrix24/b24icons-vue/outline/UndoIcon'
import CloseChatIcon from '@bitrix24/b24icons-vue/outline/CloseChatIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'
import FileIcon from '@bitrix24/b24icons-vue/outline/FileIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import CopilotAi2Icon from '@bitrix24/b24icons-vue/main/CopilotAi2Icon'

const components = {
  pre: ProseStreamPre as unknown as DefineComponent
}

const input = ref('')

const config = useRuntimeConfig()
const appConfig = useAppConfig()
const toast = useToast()
const { track } = useAnalytics()
const { open, messages } = useChat()
const { resetTheme, applyThemeSettings, hasCSSChanges, hasAppConfigChanges } = useTheme()

const hasThemeChanges = computed(() => hasCSSChanges.value || hasAppConfigChanges.value)

let _skipSync = false
const _themeApplied = new Set<string>()
function processThemeToolCalls() {
  for (const message of chat.messages) {
    if (message.role !== 'assistant') continue

    for (const part of message.parts || []) {
      if (!isToolUIPart(part)) continue
      if (_themeApplied.has(part.toolCallId)) continue
      if (part.state !== 'output-available' && part.state !== 'input-available') continue

      const name = getToolName(part)
      if (name === 'applyTheme' && part.input) {
        _themeApplied.add(part.toolCallId)
        applyThemeSettings(part.input)
      } else if (name === 'resetTheme') {
        _themeApplied.add(part.toolCallId)
        resetTheme()
      }
    }
  }
}

const chat = new Chat({
  messages: messages.value,
  transport: new DefaultChatTransport({
    api: `${config.public.baseUrl}/api/ai`,
    // api: '/api/ai',
    body: { theme }
  }),
  onError: (error) => {
    let message = error.message
    if (typeof message === 'string' && message[0] === '{') {
      try {
        message = JSON.parse(message).message || message
      } catch {
        // keep original message on malformed JSON
      }
    }

    toast.add({
      description: message,
      icon: AlertIcon,
      color: 'air-primary-alert',
      duration: 0
    })
  },
  onFinish: () => {
    processThemeToolCalls()
    _skipSync = true
    messages.value = chat.messages
    nextTick(() => {
      _skipSync = false
    })
  }
})

watchEffect(() => {
  if (chat.status === 'streaming' && chat.messages.length) {
    processThemeToolCalls()
  }
})

const canClear = computed(() => messages.value.length > 0)

function onSubmit() {
  if (!input.value.trim()) {
    return
  }

  track('AI Chat Message Sent')

  chat.sendMessage({ text: input.value })

  input.value = ''
}

// Sync external messages (e.g. from search→chat flow) into the chat instance.
// When the last synced message is from the user, auto-regenerate the assistant response.
// _skipSync prevents loops when onFinish writes back to the shared messages ref.
watch(messages, (newMessages) => {
  if (_skipSync) return

  chat.messages = newMessages
  if (chat.lastMessage?.role === 'user') {
    chat.regenerate()
  }
})

type ToolPart = ToolUIPart | DynamicToolUIPart
type ToolState = ToolPart['state']

function getToolMessage(state: ToolState, toolName: string, input: Record<string, string | undefined>) {
  const searchVerb = state === 'output-available' ? 'Searched' : 'Searching'
  const readVerb = state === 'output-available' ? 'Read' : 'Reading'

  return {
    'b24-ui-list-components': `${searchVerb} components`,
    'b24-ui-list-composables': `${searchVerb} composables`,
    'b24-ui-get-component': `${readVerb} ${upperName(input.componentName || '')} component`,
    'b24-ui-get-component-metadata': `${readVerb} metadata for component ${upperName(input.componentName || '')}`,
    'b24-ui-list-templates': `${searchVerb} templates${input.category ? ` in ${input.category} category` : ''}`,
    'b24-ui-get-template': `${readVerb} template ${upperName(input.templateName || '')}`,
    'b24-ui-get-documentation-page': `${readVerb} ${input.path || ''} page`,
    'b24-ui-list-documentation-pages': `${searchVerb} documentation pages`,
    'b24-ui-list-getting-started-guides': `${searchVerb} documentation guides`,
    'b24-ui-get-migration-guide': `${readVerb} migration guide${input.version ? ` for ${input.version}` : ''}`,
    'b24-ui-list-examples': `${searchVerb} examples`,
    'b24-ui-get-example': `${readVerb} ${upperName(input.exampleName || '')} example`,
    'b24-ui-search-components-by-category': `${searchVerb} components${input.category ? ` in ${input.category} category` : ''}${input.search ? ` for "${input.search}"` : ''}`
  }[toolName] || `${searchVerb} ${toolName}`
}

const getCachedToolMessage = useMemoize((state: ToolState, toolName: string, input: string) =>
  getToolMessage(state, toolName, JSON.parse(input))
)

function getToolText(part: ToolPart) {
  return getCachedToolMessage(part.state, getToolName(part), JSON.stringify(part.input || {}))
}

function getToolIcon(part: ToolPart): IconComponent {
  const toolName = getToolName(part)

  const iconMap: Record<string, IconComponent> = {
    'get-component': FileIcon,
    'get-component-metadata': FileIcon,
    'get-template': FileIcon,
    'get-documentation-page': FileIcon,
    'get-migration-guide': FileIcon,
    'get-example': FileIcon
  }

  return iconMap[toolName] || SearchIcon
}

function askQuestion(question: string) {
  input.value = question
  onSubmit()
}

const suggestions = appConfig.bxAssistant?.faqQuestions as {
  category: string
  items: string[]
}[]

function clearMessages() {
  if (chat.status === 'streaming') {
    chat.stop()
  }
  messages.value = []
  chat.messages = []
  _themeApplied.clear()
}

defineShortcuts({
  meta_i: {
    handler: () => {
      open.value = !open.value
    },
    usingInput: true
  }
})
</script>

<template>
  <B24Sidebar
    v-model:open="open"
    side="right"
    title="Ask AI"
    rail
    :style="{ '--sidebar-width': '26rem' }"
    :b24ui="{ root: 'base-mode bg-(--ui-color-gray-02) dark:bg-(--ui-color-base-black-fixed)', header: '', body: 'scrollbar-thin scrollbar-transparent custom-scrollbar-transparent', actions: 'gap-0.5' }"
  >
    <template #actions>
      <B24Tooltip v-if="hasThemeChanges" text="Reset theme">
        <B24Button
          :icon="UndoIcon"
          size="sm"
          color="air-tertiary"
          :b24ui="{ baseLine: '[--ui-btn-icon-size:20px]' }"
          @click="resetTheme"
        />
      </B24Tooltip>

      <B24Tooltip v-if="canClear" text="Clear messages">
        <B24Button
          :icon="TrashcanIcon"
          size="sm"
          color="air-tertiary"
          :b24ui="{ baseLine: '[--ui-btn-icon-size:19px]' }"
          @click="clearMessages"
        />
      </B24Tooltip>
    </template>

    <template #close>
      <B24Tooltip text="Close" :kbds="['meta', 'i']">
        <B24Button
          :icon="CloseChatIcon"
          aria-label="Close"
          size="sm"
          color="air-tertiary"
          :b24ui="{ baseLine: '[--ui-btn-icon-size:26px]' }"
          @click="open = false"
        />
      </B24Tooltip>
    </template>

    <B24Theme
      :b24ui="{
        prose: {
          p: { base: 'my-2 text-sm/6' },
          li: { base: 'my-0.5 text-sm/6' },
          ul: { base: 'my-2' },
          ol: { base: 'my-2' },
          h1: { base: 'text-xl mb-4' },
          h2: { base: 'text-lg mt-6 mb-3' },
          h3: { base: 'text-base mt-4 mb-2' },
          h4: { base: 'text-sm mt-3 mb-1.5' },
          code: { base: 'text-xs' },
          pre: { root: 'my-2', base: 'text-xs/5' },
          table: { root: 'my-2' },
          hr: { base: 'my-4' }
        }
      }"
    >
      <B24ChatMessages
        v-if="chat.messages.length"
        should-auto-scroll
        :messages="chat.messages"
        :status="chat.status"
        compact
        class="px-0 gap-2"
        :user="{ b24ui: { container: 'max-w-full' } }"
      >
        <template #indicator>
          <B24ChatTool :icon="CopilotAi2Icon" text="Thinking..." streaming />
        </template>

        <template #content="{ message }">
          <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}`">
            <B24ChatReasoning
              v-if="isReasoningUIPart(part)"
              :text="part.text"
              :streaming="isPartStreaming(part)"
              :icon="AiStarsIcon"
              chevron="leading"
            >
              <MDCCached
                :value="part.text"
                :cache-key="`reasoning-${message.id}-${index}`"
                :parser-options="{ highlight: false }"
                class="*:first:mt-0 *:last:mb-0"
              />
            </B24ChatReasoning>

            <template v-else-if="isTextUIPart(part) && part.text.length > 0">
              <MDCCached
                v-if="message.role === 'assistant'"
                :value="part.text"
                :cache-key="`${message.id}-${index}`"
                :components="components"
                :parser-options="{ highlight: false }"
                class="*:first:mt-0 *:last:mb-0"
              />
              <p v-else-if="message.role === 'user'" class="whitespace-pre-wrap">
                {{ part.text }}
              </p>
            </template>

            <B24ChatTool
              v-else-if="isToolUIPart(part)"
              :text="getToolText(part)"
              :icon="getToolIcon(part)"
              :streaming="isToolStreaming(part)"
            />
          </template>
        </template>
      </B24ChatMessages>

      <div v-else class="flex flex-col gap-6">
        <B24PageLinks
          v-for="category in suggestions"
          :key="category.category"
          :title="category.category"
          :links="category.items.map(item => ({ label: item, onClick: () => askQuestion(item) }))"
        />
      </div>
    </B24Theme>

    <template #footer>
      <B24ChatPrompt
        v-model="input"
        :error="chat.error"
        placeholder="Ask me anything..."
        variant="outline"
        size="sm"
        autofocus
        :rows="2"
        maxlength="1000"
        :b24ui="{
          root: '',
          body: '*:p-0! *:rounded-none! *:text-base!'
        }"
        @submit="onSubmit"
      >
        <template #footer>
          <div class="flex-1" />
          <B24ChatPromptSubmit
            size="sm"
            :status="chat.status"
            :disabled="!input.trim()"
            @stop="chat.stop()"
            @reload="chat.regenerate()"
          />
        </template>
      </B24ChatPrompt>
    </template>
  </B24Sidebar>
</template>
