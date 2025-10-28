<script lang="ts">
import type { ChatStatus } from 'ai'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/chat-prompt-submit'
import type { ButtonProps, ButtonSlots, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type ChatPromptSubmit = ComponentConfig<typeof theme, AppConfig, 'chatPromptSubmit'>

export interface ChatPromptSubmitProps extends /** @vue-ignore */ Pick<ButtonProps, 'size' | 'label'> {
  status?: ChatStatus
  /**
   * The icon displayed in the button when the status is `ready`.
   * @defaultValue icons.arrowUp
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * The color of the button when the status is `ready`.
   * @defaultValue 'air-primary'
   */
  color?: ButtonProps['color']
  /**
   * The icon displayed in the button when the status is `streaming`.
   * @defaultValue icons.stop
   * @IconComponent
   */
  streamingIcon?: IconComponent
  /**
   * The color of the button when the status is `streaming`.
   * @defaultValue 'air-secondary-no-accent'
   */
  streamingColor?: ButtonProps['color']
  /**
   * The icon displayed in the button when the status is `submitted`.
   * @defaultValue icons.stop
   * @IconComponent
   */
  submittedIcon?: IconComponent
  /**
   * The color of the button when the status is `submitted`.
   * @defaultValue 'air-secondary-no-accent'
   */
  submittedColor?: ButtonProps['color']
  /**
   * The icon displayed in the button when the status is `error`.
   * @defaultValue icons.reload
   * @IconComponent
   */
  errorIcon?: IconComponent
  /**
   * The color of the button when the status is `error`.
   * @defaultValue 'air-primary-alert'
   */
  errorColor?: ButtonProps['color']
  b24ui?: ChatPromptSubmit['slots'] & ButtonProps['b24ui']
  class?: any
}

export interface ChatPromptSubmitEmits {
  stop: []
  reload: []
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { transformUI } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<ChatPromptSubmitProps>(), {
  status: 'ready',
  streamingColor: 'air-secondary-no-accent',
  submittedColor: 'air-secondary-no-accent',
  errorColor: 'air-primary-alert'
})
const emits = defineEmits<ChatPromptSubmitEmits>()
const slots = defineSlots<ButtonSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as ChatPromptSubmit['AppConfig']

const buttonProps = computed(() => ({
  ready: {
    icon: props.icon || icons.arrowUp,
    color: props.color,
    type: 'submit' as const
  },
  submitted: {
    icon: props.submittedIcon || icons.stop,
    color: props.submittedColor,
    onClick() {
      emits('stop')
    }
  },
  streaming: {
    icon: props.streamingIcon || icons.stop,
    color: props.streamingColor,
    onClick() {
      emits('stop')
    }
  },
  error: {
    icon: props.errorIcon || icons.reload,
    color: props.errorColor,
    onClick() {
      emits('reload')
    }
  }
})[props.status])

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.chatPromptSubmit || {}) })())
</script>

<template>
  <B24Button
    :aria-label="t('chatPromptSubmit.label')"
    v-bind="buttonProps"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
    :b24ui="transformUI(b24ui, props.b24ui)"
  >
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </B24Button>
</template>
