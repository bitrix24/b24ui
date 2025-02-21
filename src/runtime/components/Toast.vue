<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { ToastRootProps, ToastRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/toast'
import { tv } from '../utils/tv'
import type { AvatarProps, ButtonProps, IconComponent } from '../types'
import type { StringOrVNode } from '../types/utils'

const appConfigToast = _appConfig as AppConfig & { b24ui: { toast: Partial<typeof theme> } }

const toast = tv({ extend: tv(theme), ...(appConfigToast.b24ui?.toast || {}) })

type ToastVariants = VariantProps<typeof toast>

export interface ToastProps extends Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'li'
   */
  as?: any
  title?: StringOrVNode
  description?: StringOrVNode
  icon?: IconComponent
  avatar?: AvatarProps
  color?: ToastVariants['color']
  orientation?: ToastVariants['orientation']
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the toast.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @defaultValue true
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   */
  closeIcon?: IconComponent
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
import { useLocale } from '../composables/useLocale'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<ToastProps>(), {
  close: true,
  orientation: 'vertical'
})
const emits = defineEmits<ToastEmits>()
const slots = defineSlots<ToastSlots>()

const { t } = useLocale()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emits)

const b24ui = computed(() => toast({
  color: props.color,
  orientation: props.orientation,
  title: !!props.title || !!slots.title
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
    :data-orientation="orientation"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
    :style="{ '--height': height }"
  >
    <slot name="leading">
      <Component
        :is="icon"
        v-if="icon"
        :class="b24ui.icon({ class: props.b24ui?.icon })"
      />
      <B24Avatar v-else-if="avatar" :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
    </slot>

    <div :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <ToastTitle v-if="title || !!slots.title" :class="b24ui.title({ class: props.b24ui?.title })">
        <slot name="title">
          <component :is="title()" v-if="typeof title === 'function'" />
          <component :is="title" v-else-if="typeof title === 'object'" />
          <template v-else>
            {{ title }}
          </template>
        </slot>
      </ToastTitle>
      <ToastDescription v-if="description || !!slots.description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description">
          <component :is="description()" v-if="typeof description === 'function'" />
          <component :is="description" v-else-if="typeof description === 'object'" />
          <template v-else>
            {{ description }}
          </template>
        </slot>
      </ToastDescription>

      <div v-if="orientation === 'vertical' && actions?.length" :class="b24ui.actions({ class: props.b24ui?.actions })">
        <slot name="actions">
          <ToastAction v-for="(action, index) in actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <B24Button size="xs" :color="color" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div v-if="(orientation === 'horizontal' && actions?.length) || close !== null" :class="b24ui.actions({ class: props.b24ui?.actions, orientation: 'horizontal' })">
      <template v-if="orientation === 'horizontal' && actions?.length">
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
            size="xs"
            color="link"
            :aria-label="t('toast.close')"
            v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
            :class="b24ui.close({ class: props.b24ui?.close })"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <div v-if="remaining > 0 && duration" :class="b24ui.progress({ class: props.b24ui?.progress })" :style="{ width: `${remaining / duration * 100}%` }" />
  </ToastRoot>
</template>
