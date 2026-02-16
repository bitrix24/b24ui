<script lang="ts">
import type { ChatStatus } from 'ai'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/chat-prompt-submit'
import type { ButtonProps, ButtonSlots, IconComponent, LinkPropsKeys } from '../types'
import type { ComponentConfig } from '../types/tv'

type ChatPromptSubmit = ComponentConfig<typeof theme, AppConfig, 'chatPromptSubmit'>

export interface ChatPromptSubmitProps extends Omit<ButtonProps, LinkPropsKeys | 'icon' | 'color'> {
  status?: ChatStatus
  /**
   * The icon displayed in the button when the status is `ready`.
   * @defaultValue icons.imSend
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
   * @defaultValue 'air-secondary-accent-2'
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
  stop: [event: MouseEvent]
  reload: [event: MouseEvent]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useLocale } from '../composables/useLocale'
import { transformUI } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChatPromptSubmitProps>(), {
  status: 'ready',
  color: 'air-primary',
  streamingColor: 'air-secondary-accent-2',
  submittedColor: 'air-secondary-no-accent',
  errorColor: 'air-primary-alert'
})
const emits = defineEmits<ChatPromptSubmitEmits>()
const slots = defineSlots<ButtonSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as ChatPromptSubmit['AppConfig']
const uiProp = useComponentUI('chatPromptSubmit', props)

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'color', 'status', 'streamingIcon', 'streamingColor', 'submittedIcon', 'submittedColor', 'errorIcon', 'errorColor', 'class', 'b24ui'))

const statusButtonProps = computed(() => ({
  ready: {
    icon: props.icon || icons.imSend,
    color: props.color,
    type: 'submit' as const
  },
  submitted: {
    icon: props.submittedIcon || icons.stop,
    color: props.submittedColor,
    onClick(e) {
      emits('stop', e)
    }
  },
  streaming: {
    icon: props.streamingIcon || icons.stop,
    color: props.streamingColor,
    onClick(e) {
      emits('stop', e)
    }
  },
  error: {
    icon: props.errorIcon || icons.reload,
    color: props.errorColor,
    onClick(e) {
      emits('reload', e)
    }
  }
} satisfies { [key: string]: ButtonProps })[props.status])

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.chatPromptSubmit || {}) })())
</script>

<template>
  <B24Button
    v-bind="{
      ...buttonProps,
      ...statusButtonProps,
      'aria-label': t('chatPromptSubmit.label'),
      'rounded': true,
      ...$attrs
    }"
    :aria-label="t('chatPromptSubmit.label')"
    data-slot="base"
    :class="b24ui.base({ class: [uiProp?.base, props.class] })"
    :b24ui="transformUI(b24ui, uiProp)"
  >
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </B24Button>
</template>
