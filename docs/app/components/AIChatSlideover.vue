<script setup lang="ts">
import type { DefineComponent } from 'vue'
import { Chat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { splitByCase, upperFirst } from 'scule'
import ProseStreamPre from './prose/PreStream.vue'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'
import SendIcon from '@bitrix24/b24icons-vue/main/SendIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'

/**
 * @see https://github.com/nuxt-modules/mcp-toolkit/blob/main/apps/docs/app/components/AIChatSlideover.vue
 * @see docs/app/components/search/SearchChat.vue
 */

const config = useRuntimeConfig()
const appLocale = useLocale()
const toast = useToast()
const { track } = useAnalytics()

const components = {
  pre: ProseStreamPre as unknown as DefineComponent
}

const { isOpen, messages, pendingMessage, clearPending } = useAIChat()

const input = ref('')

// region Chat ////
watch(pendingMessage, (message) => {
  if (message) {
    if (messages.value.length === 0 && chat.messages.length > 0) {
      chat.messages.length = 0
    }

    track('AI Chat Pending Message Sent')

    chat.sendMessage({
      text: message
    })
    clearPending()
  }
}, { immediate: true })

watch(messages, (newMessages) => {
  if (newMessages.length === 0 && chat.messages.length > 0) {
    chat.messages.length = 0
  }
}, { deep: true })

const faqQuestions = [
  {
    category: 'Getting Started',
    items: [
      'What is the key difference between installation for Nuxt and for Vue (with Vite/Inertia)?',
      'How can I quickly add the library to an existing Nuxt 4 project?',
      'How do I connect and use icons from @bitrix24/b24icons in a component?',
      'How do I properly set up switching between light and dark themes in an application?',
      'What is the minimum set of steps to configure internationalization (i18n) with RTL support?',
      'How do I connect and use icons from @bitrix24/b24icons in a component?'
    ]
  },
  {
    category: 'Components',
    items: [
      'Which button component (Button) should I choose for creating a link, and which for an action?',
      'How do I properly build a complex form with validation using Form, FormField, and standard inputs?',
      'What\'s the difference between Modal, Popover, and Slideover, and when should I use each?',
      'How do I create a dropdown menu (DropdownMenu) with actions for a table row?',
      'How do I implement file uploads with progress display and the ability to remove files?',
      'What methods are available for displaying data in a table (Table) if pagination and sorting are needed?',
      'How do I use the CommandPalette or DashboardSearch component for quick application-wide search?',
      'How do I create a multi-step form or display a process using the Stepper component?',
      'How do I work with Tabs and Accordion components to organize content?',
      'How do I correctly set up Toast notifications that can be triggered from different parts of the application?',
      'Which component is best for displaying system errors (Error) and empty states (Empty)?',
      'How do I create a custom Select with search and the ability to add new options?',
      'How do I connect a Calendar for date selection with an InputDate field?',
      'How do I use Skeleton to improve UX during data loading?',
      'Why is the AvatarGroup component more convenient than manually styling a group of avatars?'
    ]
  },
  {
    category: 'Composables',
    items: [
      'When and why should I use useToast instead of directly using the Toast component?',
      'How do I globally set keyboard shortcuts (hotkeys) for application functions using defineShortcuts?',
      'What scenarios is useOverlay designed for, and how do I control modal windows programmatically?',
      'How do I use useConfetti for celebratory animations after a successful user action',
      'If I\'m creating my own custom input component, how do I integrate it with the form validation system using useFormField?'
    ]
  }
]

function upperName(name: unknown) {
  if (typeof name !== 'string' || name.length < 1) {
    return ''
  }
  return splitByCase(name).map(p => upperFirst(p)).join('')
}

function getToolLabel(toolName: string, args: any) {
  const getArg = (key: string, macros?: string): string => {
    const value = args?.[key]
    let result = typeof value === 'string' ? value : ''

    if (typeof macros === 'string') {
      result = result.replaceAll('%value%', result)
    }

    return result
  }

  const labels: Record<string, string> = {
    // b24/restApi
    'bitrix-search': `Searched b24/restApi`,
    'bitrix-method-details': `Read b24/restApi ${getArg('method')} method`,
    'bitrix-article-details': `Read b24/restApi ${getArg('title_or_hint')} article`,
    'bitrix-event-details': `Read b24/restApi ${getArg('title_or_hint')} event`,
    // b24/jsSdk
    'b24-jssdk-list-documentation-pages': `Searched b24/jsSdk documentation pages`,
    'b24-jssdk-get-documentation-page': `Read b24/jsSdk ${getArg('path')} page`,
    'b24-jssdk-list-getting-started-guides': `Searched b24/jsSdk documentation guides`,
    'b24-jssdk-list-examples': `Searched b24/jsSdk examples`,
    'b24-jssdk-get-example': `Read b24/jsSdk ${upperName(getArg('exampleName'))} example`,
    // b24/ui
    'b24-ui-list-components': `Searched b24/ui components`,
    'b24-ui-get-component': `Read b24/ui ${upperName(getArg('componentName'))} component`,
    'b24-ui-get-component-metadata': `Read b24/ui metadata for component ${upperName(getArg('componentName'))}`,
    'b24-ui-search-components-by-category': `Searched b24/ui components${getArg('category', ` in %value% category`)}${getArg('search', ` for %value%`)}`,
    'b24-ui-list-composables': `Searched b24/ui composables`,
    'b24-ui-list-templates': `Searched b24/ui templates${getArg('category', ` in %value% category`)}`,
    'b24-ui-get-template': `Read b24/ui template ${upperName(getArg('templateName'))}`,
    'b24-ui-list-getting-started-guides': `Searched b24/ui documentation guides`,
    'b24-ui-list-documentation-pages': `Searched b24/ui documentation pages`,
    'b24-ui-get-documentation-page': `Read b24/ui ${getArg('path')} page`,
    'b24-ui-get-migration-guide': `Read b24/ui migration guide${getArg('version', ` for %value%`)}`,
    'b24-ui-list-examples': `Searched b24/ui examples`,
    'b24-ui-get-example': `Read b24/ui ${upperName(getArg('exampleName'))} example`
  }

  return labels[toolName] || toolName
}

const chat = new Chat({
  messages: messages.value,
  transport: new DefaultChatTransport({
    api: `${config.public.baseUrl}/api/search`
  }),
  onError: (error: Error) => {
    const { message } = typeof error.message === 'string' && error.message[0] === '{' ? JSON.parse(error.message) : error

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

function handleSubmit(event?: Event) {
  event?.preventDefault()

  if (!input.value.trim()) {
    return
  }

  track('AI Chat Message Sent')

  chat.sendMessage({
    text: input.value
  })

  input.value = ''

  stopDictation()
}

function askQuestion(question: string) {
  track('AI Chat Question Sent')

  chat.sendMessage({
    text: question
  })
}

function resetChat() {
  chat.stop()
  messages.value = []
  chat.messages.length = 0
}
// endregion ////

// region SpeechRecognition ////
const {
  isAvailable: speechIsAvailable,
  isListening: speechIsListening,
  start: startSpeech,
  stop: stopSpeech,
  setLanguage: setLanguageSpeech
} = useSpeechRecognition({
  lang: appLocale.locale.value.locale,
  continuous: true,
  interimResults: true
}, {
  onStart: () => {
    if (input.value === '') {
      return
    }

    input.value += ' '
  },
  onResult: (result) => {
    input.value += result.text
  }
})

const startDictation = async () => {
  await startSpeech()
}

const stopDictation = async () => {
  await stopSpeech()
}

defineShortcuts({
  'r-r': () => {
    toast.add({
      title: 'Speech',
      description: 'Use ru-RU for speech',
      duration: 1000,
      progress: false
    })
    setLanguageSpeech('ru-RU')
  },
  'e-e': () => {
    toast.add({
      title: 'Speech',
      description: 'Use en-US for speech',
      duration: 1000,
      progress: false
    })
    setLanguageSpeech('en-US')
  }
})
// endregion ////

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
  <B24Slideover
    v-model:open="isOpen"
    title="Ask AI"
    description="Explain with AI"
    overlay-blur="auto"
    :use-light-content="false"
    :b24ui="{
      content: 'w-full sm:max-w-2/3',
      // sidebarLayoutRoot: 'edge-dark',
      sidebarLayoutPageWrapper: 'px-0 ps-0 pe-0 pb-0 lg:px-0 lg:ps-0 lg:pe-0',
      sidebarLayoutContainer: 'gap-0 lg:gap-0 relative',
      header: 'px-[20px] py-[15px] border-b border-(--ui-color-divider-vibrant-default)',
      body: 'p-0! relative'
    }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <B24Avatar
            :icon="AiStarsIcon"
            alt="AI"
            size="xs"
            :b24ui="{
              root: 'bg-(--color-ai-150) ring-(--color-ai-550)',
              icon: 'text-(--color-ai-950)'
            }"
          />
          <ProseH3 class="mb-0">
            Ask AI
          </ProseH3>
        </div>
        <div class="flex items-center gap-1">
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
              class="inline-flex sm:hidden "
              @click="isOpen = false"
            />
          </B24Tooltip>
        </div>
      </div>
    </template>

    <template #body>
      <div class="absolute flex flex-col inset-y-0 w-full h-full bg-(--ui-color-bg-content-primary)">
        <div class="flex-1 overflow-y-auto sm:p-6 p-0! scrollbar-thin">
          <B24ChatMessages
            v-if="chat.messages.length > 0"
            should-auto-scroll
            compact
            :messages="chat.messages"
            :status="chat.status"
            :user="{ b24ui: { content: 'text-sm bg-(--ui-color-design-tinted-na-bg) border-(--ui-color-design-tinted-na-stroke) border-(length:--ui-design-tinted-na-stroke-weight) text-(--ui-color-design-tinted-na-content)' } }"
            :assistant="{ b24ui: { content: 'ring-0 border-0 bg-transparent ps-0 pe-0' } }"
            :b24ui="{ indicator: '*:bg-ai-350' }"
            class="flex-1 px-[20px] py-[20px]"
          >
            <template #content="{ message }">
              <div class="flex flex-col gap-2">
                <template
                  v-for="(part, index) in message.parts"
                  :key="`${message.id}-${part.type}-${index}${'state' in part ? `-${part.state}` : ''}`"
                >
                  <MDCCached
                    v-if="part.type === 'text'"
                    :value="part.text"
                    :cache-key="`${message.id}-${index}`"
                    :components="components"
                    :parser-options="{ highlight: false }"
                    class="*:first:mt-0 *:last:mb-0"
                  />
                  <template v-else-if="part.type === 'tool-invocation' || part.type === 'dynamic-tool'">
                    <ChatToolCall
                      :text="getToolLabel((part as any).toolName, (part as any).args || (part as any).input)"
                      :is-loading="(part as any).state !== 'output-available'"
                    />
                  </template>
                </template>
              </div>
            </template>
          </B24ChatMessages>

          <div
            v-else
            class="flex-1 overflow-y-auto px-[20px] py-[20px]"
          >
            <ProseH3 class="mb-4">
              FAQ
            </ProseH3>

            <div class="flex flex-col gap-5">
              <div
                v-for="category in faqQuestions"
                :key="category.category"
                class="flex flex-col gap-1.5"
              >
                <ProseH5 class="uppercase tracking-wide mb-0 text-muted">
                  {{ category.category }}
                </ProseH5>
                <div class="flex flex-col">
                  <button
                    v-for="question in category.items"
                    :key="question"
                    class="text-left text-sm text-description hover:text-label py-1.5 transition-colors cursor-pointer"
                    @click="askQuestion(question)"
                  >
                    {{ question }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1.5 p-0! base-mode bg-(--ui-color-bg-content-primary) border-t-1 border-t-(--ui-color-divider-less) shadow-top-md">
          <div class="p-3 w-full">
            <div class="relative flex items-end gap-2 bg-(--ui-color-bg-content-secondary) rounded-xs ring-1 ring-ai-250 hover:ring-ai-350 pr-2 pb-2">
              <B24Textarea
                v-model="input"
                :rows="1"
                autoresize
                placeholder="Ask me a question about Bitrix24 UI..."
                no-padding
                no-border
                class="flex-1 resize-none px-2.5"
                @keydown.enter.exact.prevent="handleSubmit"
              />
              <template v-if="speechIsAvailable">
                <B24Button
                  v-if="!speechIsListening"
                  :icon="MicrophoneOnIcon"
                  color="air-tertiary-no-accent"
                  size="sm"
                  class="shrink-0 hidden md:flex"
                  @click="startDictation"
                />
                <B24Button
                  v-if="speechIsListening"
                  :icon="StopLIcon"
                  color="air-secondary"
                  size="sm"
                  class="shrink-0 rounded-lg"
                  @click="stopDictation"
                />
              </template>
              <B24Button
                :icon="SendIcon"
                color="air-primary"
                size="sm"
                :disabled="!input.trim() || chat.status === 'streaming'"
                :loading="chat.status === 'streaming'"
                class="shrink-0 rounded-lg"
                @click="handleSubmit"
              />
            </div>
            <div class="flex justify-between items-center mt-2 text-xs text-dimmed">
              <span>Chat is cleared on refresh</span>
              <div class="flex items-center gap-1">
                <span>Line break</span>
                <B24Kbd value="shift" accent="less" size="sm" />
                <B24Kbd value="enter" accent="less" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </B24Slideover>
</template>
