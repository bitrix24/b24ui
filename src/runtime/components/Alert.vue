<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/alert'
import type { AvatarProps, ButtonProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/utils'

type Alert = ComponentConfig<typeof theme, AppConfig, 'alert'>

export interface AlertProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  title?: string
  description?: string
  /**
   * Display an icon on the left side.
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  /**
   * @defaultValue 'default'
   */
  color?: Alert['variants']['color']
  /**
   * The orientation between the content and the actions.
   * @defaultValue 'vertical'
   */
  orientation?: Alert['variants']['orientation']
  /**
   * @defaultValue 'md'
   */
  size?: Alert['variants']['size']
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts"}
   */
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the alert.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts"}
   * @emits 'update:open'
   * @defaultValue false
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  class?: any
  b24ui?: Alert['slots']
}

export interface AlertEmits {
  (e: 'update:open', value: boolean): void
}

export interface AlertSlots {
  leading(props?: {}): any
  title(props?: {}): any
  description(props?: {}): any
  actions(props?: {}): any
  close(props: { b24ui: { [K in keyof Required<Alert['slots']>]: (props?: Record<string, any>) => string } }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<AlertProps>(), {
  orientation: 'vertical'
})
const emits = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as Alert['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.alert || {}) })({
  color: props.color,
  size: props.size,
  orientation: props.orientation,
  title: !!props.title || !!slots.title
}))
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot name="leading">
      <Component
        :is="icon"
        v-if="icon"
        :class="b24ui.icon({ class: props.b24ui?.icon })"
      />
      <B24Avatar v-else-if="avatar" :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
    </slot>

    <div :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <div v-if="title || !!slots.title" :class="b24ui.title({ class: props.b24ui?.title })">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div v-if="description || !!slots.description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <div v-if="orientation === 'vertical' && (actions?.length || !!slots.actions)" :class="b24ui.actions({ class: props.b24ui?.actions })">
        <slot name="actions">
          <B24Button v-for="(action, index) in actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="(orientation === 'horizontal' && (actions?.length || !!slots.actions)) || close" :class="b24ui.actions({ class: props.b24ui?.actions, orientation: 'horizontal' })">
      <template v-if="orientation === 'horizontal' && (actions?.length || !!slots.actions)">
        <slot name="actions">
          <B24Button v-for="(action, index) in actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </template>

      <slot name="close" :b24ui="b24ui">
        <B24Button
          v-if="close"
          :icon="closeIcon || icons.close"
          size="xs"
          color="link"
          :aria-label="t('alert.close')"
          v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
          :class="b24ui.close({ class: props.b24ui?.close })"
          @click="emits('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
