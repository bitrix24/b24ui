<script setup lang="ts">
import type { DefineComponent } from 'vue'
import { Chat } from '@ai-sdk/vue'
import type { UIMessage, UIToolInvocation } from 'ai'
import { DefaultChatTransport } from 'ai'
import { splitByCase, upperFirst } from 'scule'
import { useMemoize } from '@vueuse/core'
import ProseStreamPre from '../prose/PreStream.vue'
import AlertIcon from '@bitrix24/b24icons-vue/outline/AlertIcon'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Maximize2Icon from '@bitrix24/b24icons-vue/outline/Maximize2Icon'
import Minimize2Icon from '@bitrix24/b24icons-vue/outline/Minimize2Icon'

/**
 * @depricate use docs/app/components/AIChatSlideover.vue
 */
const config = useRuntimeConfig()

const components = {
  pre: ProseStreamPre as unknown as DefineComponent
}

const messages = defineModel<UIMessage[]>('messages')
const fullscreen = defineModel<boolean>('fullscreen')

const emits = defineEmits<{
  close: []
}>()

const input = ref('')

const toast = useToast()

const chat = new Chat({
  messages: messages.value,
  transport: new DefaultChatTransport({
    api: `${config.public.baseUrl}/api/search`
  }),
  onError: (error) => {
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

function onSubmit() {
  if (!input.value.trim()) {
    return
  }

  chat.sendMessage({ text: input.value })

  input.value = ''
}

function onClose(e: Event) {
  e.preventDefault()

  emits('close')
}

onMounted(() => {
  if (chat.lastMessage?.role === 'user') {
    chat.regenerate()
  }
})

function upperName(name: string) {
  return splitByCase(name).map(p => upperFirst(p)).join('')
}

type State = UIToolInvocation<any>['state']

function getToolMessage(state: State, toolName: string, input: any) {
  const searchVerb = state === 'output-available' ? 'Searched' : 'Searching'
  const readVerb = state === 'output-available' ? 'Read' : 'Reading'

  return {
    // b24/restApi
    'bitrix-search': `${searchVerb} b24/restApi`,
    'bitrix-method-details': `${readVerb} b24/restApi ${input.method || ''} method`,
    'bitrix-article-details': `${readVerb} b24/restApi ${input.title_or_hint || ''} article`,
    'bitrix-event-details': `${readVerb} b24/restApi ${input.title_or_hint || ''} event`,
    // b24/jsSdk
    'get-b24-jssdk-documentation-page': `${readVerb} b24/jsSdk ${input.path || ''} page`,
    'list-b24-jssdk-documentation-pages': `${searchVerb} b24/jsSdk documentation pages`,
    'list-b24-jssdk-getting-started-guides': `${searchVerb} b24/jsSdk documentation guides`,
    'list-b24-jssdk-examples': `${searchVerb} b24/jsSdk examples`,
    'get-b24-jssdk-example': `${readVerb} b24/jsSdk ${upperName(input.exampleName)} example`,
    // b24/ui
    'b24-ui-list-components': `${searchVerb} b24/ui components`,
    'b24-ui-list-composables': `${searchVerb} b24/ui composables`,
    'b24-ui-get-component': `${readVerb} b24/ui ${upperName(input.componentName)} component`,
    'b24-ui-get-component-metadata': `${readVerb} b24/ui metadata for component ${upperName(input.componentName)}`,
    'b24-ui-list-templates': `${searchVerb} b24/ui templates${input.category ? ` in ${input.category} category` : ''}`,
    'b24-ui-get-template': `${readVerb} b24/ui template ${upperName(input.templateName)}`,
    'b24-ui-get-documentation-page': `${readVerb} b24/ui ${input.path || ''} page`,
    'b24-ui-list-documentation-pages': `${searchVerb} b24/ui documentation pages`,
    'b24-ui-list-getting-started-guides': `${searchVerb} b24/ui documentation guides`,
    'b24-ui-get-migration-guide': `${readVerb} b24/ui migration guide${input.version ? ` for ${input.version}` : ''}`,
    'b24-ui-list-examples': `${searchVerb} b24/ui examples`,
    'b24-ui-get-example': `${readVerb} b24/ui ${upperName(input.exampleName)} example`,
    'b24-ui-search-components-by-category': `${searchVerb} b24/ui components${input.category ? ` in ${input.category} category` : ''}${input.search ? ` for "${input.search}"` : ''}`
  }[toolName] || `${searchVerb} ${toolName}` // + `[${toolName}]::${JSON.stringify(input ?? {})}`
}

const getCachedToolMessage = useMemoize((state: State, toolName: string, input: string) =>
  getToolMessage(state, toolName, JSON.parse(input))
)
</script>

<template>
  <B24ChatPalette>
    <B24ChatMessages
      should-auto-scroll
      :messages="chat.messages"
      :status="chat.status"
      :user="{ side: 'right', variant: 'message', icon: UserIcon }"
      :assistant="{ icon: RobotIcon }"
    >
      <template #content="{ message }">
        <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}${'state' in part ? `-${part.state}` : ''}`">
          <MDCCached
            v-if="part.type === 'text'"
            :value="part.text"
            :cache-key="`${message.id}-${index}`"
            :components="components"
            :parser-options="{ highlight: false }"
            class="[&_.my-5]:my-2.5 *:first:!mt-0 *:last:!mb-0 [&_.leading-7]:!leading-6"
          />

          <p v-else-if="part.type === 'dynamic-tool'" class="text-muted text-sm leading-6 my-1.5">
            {{ getCachedToolMessage(part.state, part.toolName, JSON.stringify(part.input || {})) }}
          </p>
        </template>
      </template>
    </B24ChatMessages>

    <template #prompt>
      <B24ChatPrompt
        v-model="input"
        variant="plain"
        :error="chat.error"
        :b24ui="{ trailing: 'items-center' }"
        @submit="onSubmit"
        @close="onClose"
      >
        <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
        <template #footer>
          <B24Button
            :icon="fullscreen ? Minimize2Icon : Maximize2Icon"
            color="air-tertiary"
            size="sm"
            class="group"
            :b24ui="{ leadingIcon: 'text-muted group-hover:text-description transition' }"
            @click="fullscreen = !fullscreen"
          />
        </template>
      </B24ChatPrompt>
    </template>
  </B24ChatPalette>
</template>
