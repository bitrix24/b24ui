<script lang="ts">
import type { ToastRootProps, ToastRootEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/toast'
import type { AvatarProps, ButtonProps, ProgressProps, IconComponent, LinkPropsKeys } from '../types'
import type { StringOrVNode } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Toast = ComponentConfig<typeof theme, AppConfig, 'toast'>

export interface ToastProps extends Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'li'
   */
  as?: any
  title?: StringOrVNode
  description?: StringOrVNode
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  /**
   * @defaultValue 'air-secondary-no-accent'
   */
  color?: Toast['variants']['color']
  /**
   * The orientation between the content and the actions
   * @defaultValue 'vertical'
   */
  orientation?: Toast['variants']['orientation']
  /**
   * Display a close button to dismiss the toast.
   * `{ size: 'sm', color: 'air-tertiary' }`{lang="ts"}
   * @defaultValue true
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'sm' }`{lang="ts"}
   */
  actions?: ButtonProps[]
  /**
   * The time in milliseconds before the toast automatically closes. Overrides the global `toaster.duration`.
   *
   * Set to `0` to keep the toast open until it's manually closed.
   * @defaultValue 5000
   */
  duration?: number
  /**
   * Display a progress bar showing the toast's remaining duration.
   * `{ size: 'sm' }`{lang="ts"}
   * @defaultValue true
   */
  progress?: boolean | Pick<ProgressProps, 'color' | 'b24ui'>
  class?: any
  b24ui?: Toast['slots']
}

export interface ToastEmits extends ToastRootEmits {}

export interface ToastSlots {
  leading?(props: { b24ui: Toast['b24ui'] }): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  actions?(props?: {}): VNode[]
  close?(props: { b24ui: Toast['b24ui'] }): VNode[]
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, useTemplateRef } from 'vue'
import { ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'
import B24Progress from './Progress.vue'

const _props = withDefaults(defineProps<ToastProps>(), {
  orientation: 'vertical',
  close: true,
  progress: true
})
const emits = defineEmits<ToastEmits>()
const slots = defineSlots<ToastSlots>()

const props = useComponentProps('toast', _props)

const { t } = useLocale()
const appConfig = useAppConfig() as Toast['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emits)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.toast || {}) })({
  color: props.color,
  orientation: props.orientation,
  title: !!props.title || !!slots.title
}))

const rootRef = useTemplateRef('rootRef')
const height = ref(0)

onMounted(() => {
  if (!rootRef.value?.$el?.getBoundingClientRect) {
    return
  }

  height.value = rootRef.value.$el.getBoundingClientRect().height
})

defineExpose({
  height
})
</script>

<template>
  <ToastRoot
    ref="rootRef"
    v-slot="{ remaining, duration: totalDuration, open }"
    v-bind="rootProps"
    :data-orientation="props.orientation"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    :style="{ '--height': height }"
  >
    <slot name="leading" :b24ui="b24ui">
      <Component
        :is="props.icon"
        v-if="props.icon"
        data-slot="icon"
        :class="b24ui.icon({ class: props.b24ui?.icon })"
      />
      <B24Avatar v-else-if="props.avatar" :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="props.avatar" data-slot="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
    </slot>

    <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <ToastTitle v-if="props.title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
        <slot name="title">
          <component :is="props.title()" v-if="typeof props.title === 'function'" />
          <component :is="props.title" v-else-if="typeof props.title === 'object'" />
          <template v-else>
            {{ props.title }}
          </template>
        </slot>
      </ToastTitle>
      <ToastDescription v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description">
          <component :is="props.description()" v-if="typeof props.description === 'function'" />
          <component :is="props.description" v-else-if="typeof props.description === 'object'" />
          <template v-else>
            {{ props.description }}
          </template>
        </slot>
      </ToastDescription>

      <div v-if="props.orientation === 'vertical' && (props.actions?.length || !!slots.actions)" data-slot="actions" :class="b24ui.actions({ class: props.b24ui?.actions })">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <B24Button size="sm" :color="props.color as ButtonProps['color']" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div v-if="(props.orientation === 'horizontal' && (props.actions?.length || !!slots.actions)) || props.close !== null" data-slot="actions" :class="b24ui.actions({ class: props.b24ui?.actions, orientation: 'horizontal' })">
      <template v-if="props.orientation === 'horizontal' && (props.actions?.length || !!slots.actions)">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <B24Button size="sm" :color="props.color as ButtonProps['color']" v-bind="action" />
          </ToastAction>
        </slot>
      </template>

      <ToastClose v-if="props.close || !!slots.close" as-child>
        <slot name="close" :b24ui="b24ui">
          <B24Button
            v-if="props.close"
            :icon="props.closeIcon || icons.close"
            size="sm"
            color="air-tertiary"
            :aria-label="t('toast.close')"
            v-bind="(typeof props.close === 'object' ? props.close : {})"
            data-slot="close"
            :class="b24ui.close({ class: props.b24ui?.close })"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <B24Progress
      v-if="props.progress && open && remaining > 0 && totalDuration"
      :model-value="remaining / totalDuration * 100"
      :color="props.color"
      v-bind="(typeof props.progress === 'object' ? props.progress as Partial<ProgressProps> : {})"
      size="sm"
      data-slot="progress"
      :class="b24ui.progress({ class: props.b24ui?.progress })"
    />
  </ToastRoot>
</template>
