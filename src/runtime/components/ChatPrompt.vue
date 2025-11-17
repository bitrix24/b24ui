<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/chat-prompt'
import type { TextareaProps, TextareaSlots } from '../types'
import type { ComponentConfig } from '../types/tv'

type ChatPrompt = ComponentConfig<typeof theme, AppConfig, 'chatPrompt'>

export interface ChatPromptProps extends Pick<TextareaProps, 'rows' | 'autofocus' | 'autofocusDelay' | 'autoresize' | 'autoresizeDelay' | 'maxrows' | 'icon' | 'avatar' | 'loading' | 'disabled'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'form'
   */
  as?: any
  /**
   * The placeholder text for the textarea.
   * @defaultValue t('chatPrompt.placeholder')
   */
  placeholder?: string
  /**
   * @defaultValue 'outline'
   */
  variant?: ChatPrompt['variants']['variant']
  error?: Error
  class?: any
  b24ui?: ChatPrompt['slots'] & TextareaProps['b24ui']
}

export interface ChatPromptEmits {
  submit: [event: Event]
  close: [event: Event]
}

export interface ChatPromptSlots extends TextareaSlots {
  header(props?: {}): any
  footer(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed, toRef, useTemplateRef } from 'vue'
import { Primitive, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { omit, transformUI } from '../utils'
import { tv } from '../utils/tv'
import B24Textarea from './Textarea.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChatPromptProps>(), {
  as: 'form',
  autofocus: true,
  autoresize: true,
  rows: 1
})
const emits = defineEmits<ChatPromptEmits>()
const slots = defineSlots<ChatPromptSlots>()

const model = defineModel<string>({ default: '' })

const { t } = useLocale()
const appConfig = useAppConfig() as ChatPrompt['AppConfig']

const textareaProps = useForwardProps(reactivePick(props, 'rows', 'autofocus', 'autofocusDelay', 'autoresize', 'autoresizeDelay', 'maxrows', 'icon', 'avatar', 'loading'))

const getProxySlots = () => omit(slots, ['header', 'footer', 'default'])

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.chatPrompt || {}) })({
  variant: props.variant
}))

const textareaRef = useTemplateRef('textareaRef')

function submit(e: Event) {
  if (model.value.trim() === '') {
    return
  }

  emits('submit', e)
}

function blur(e: Event) {
  textareaRef.value?.textareaRef?.blur()

  emits('close', e)
}

defineExpose({
  textareaRef: toRef(() => textareaRef.value?.textareaRef)
})
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })" @submit.prevent="submit">
    <div v-if="!!slots.header" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
      <slot name="header" />
    </div>

    <B24Textarea
      ref="textareaRef"
      v-model="model"
      :placeholder="placeholder || t('chatPrompt.placeholder')"
      :disabled="Boolean(error) || disabled"
      no-border
      v-bind="{ ...textareaProps, ...$attrs }"
      :b24ui="transformUI(omit(b24ui, ['root', 'body', 'header', 'footer']), props.b24ui)"
      data-slot="body"
      :class="b24ui.body({ class: props.b24ui?.body })"
      @keydown.enter.exact.prevent="submit"
      @keydown.esc="blur"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </B24Textarea>

    <div data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
      <slot name="footer" />
      <slot name="default" :b24ui="transformUI(omit(b24ui, ['root', 'body', 'header', 'footer']), props.b24ui)" />
    </div>
  </Primitive>
</template>
