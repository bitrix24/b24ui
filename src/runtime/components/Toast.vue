<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { ToastRootProps, ToastRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/toast'
import { tv } from '../utils/tv'
import type { AvatarProps, ButtonProps } from '../types'

const appConfig = _appConfig as AppConfig & { b24ui: { toast: Partial<typeof theme> } }

const toast = tv({ extend: tv(theme), ...(appConfig.b24ui?.toast || {}) })

type ToastVariants = VariantProps<typeof toast>

export interface ToastProps extends Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'li'
   */
  as?: any
  title?: string
  description?: string
  icon?: string
  avatar?: AvatarProps
  color?: ToastVariants['color']
  /**
   * Display a list of actions:
   * - under the title and description if multiline
   * - next to the close button if not multiline
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the toast.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @defaultValue true
   */
  close?: ButtonProps | boolean
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   */
  closeIcon?: string
  class?: any
  b24ui?: Partial<typeof toast.slots>
}

export interface ToastEmits extends ToastRootEmits {}

export interface ToastSlots {
  leading(props?: {}): any
  title(props?: {}): any
  description(props?: {}): any
  actions(props?: {}): any
  close(props: { b24ui: any }): any
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<ToastProps>(), {
  close: true
})
const emits = defineEmits<ToastEmits>()
const slots = defineSlots<ToastSlots>()

const { t } = useLocale()
const appConfig = useAppConfig()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emits)

const multiline = computed(() => !!props.title && !!props.description)

const b24ui = computed(() => toast({
  color: props.color
}))

const el = ref()
const height = ref(0)

onMounted(() => {
  if (!el.value) {
    return
  }

  setTimeout(() => {
    height.value = el.value.$el.getBoundingClientRect()?.height
  }, 0)
})

defineExpose({
  height
})
</script>

<template>
  <ToastRoot
    ref="el"
    v-slot="{ remaining, duration }"
    v-bind="rootProps"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root], multiline })"
    :style="{ '--height': height }"
  >
    <slot name="leading">
      <B24Avatar v-if="avatar" :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
      <Component
        :is="icon"
        v-if="icon"
        :class="b24ui.icon({ class: props.b24ui?.icon })"
      />
    </slot>

    <div :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <ToastTitle v-if="title || !!slots.title" :class="b24ui.title({ class: props.b24ui?.title })">
        <slot name="title">
          {{ title }}
        </slot>
      </ToastTitle>
      <ToastDescription v-if="description || !!slots.description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description">
          {{ description }}
        </slot>
      </ToastDescription>

      <div v-if="multiline && actions?.length" :class="b24ui.actions({ class: props.b24ui?.actions, multiline: true })">
        <slot name="actions">
          <ToastAction v-for="(action, index) in actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <B24Button size="xs" :color="color" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div v-if="(!multiline && actions?.length) || close !== null" :class="b24ui.actions({ class: props.b24ui?.actions, multiline: false })">
      <template v-if="!multiline">
        <slot name="actions">
          <ToastAction v-for="(action, index) in actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <B24Button size="xs" :color="color" v-bind="action" />
          </ToastAction>
        </slot>
      </template>

      <ToastClose as-child>
        <slot name="close" :b24ui="b24ui">
          <B24Button
            v-if="close"
            :icon="closeIcon || icons.close"
            size="sm"
            color="link"
            :aria-label="t('toast.close')"
            v-bind="typeof close === 'object' ? close : undefined"
            :class="b24ui.close({ class: props.b24ui?.close })"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <div v-if="remaining > 0 && duration" :class="b24ui.progress({ class: props.b24ui?.progress })" :style="{ width: `${remaining / duration * 100}%` }" />
  </ToastRoot>
</template>
