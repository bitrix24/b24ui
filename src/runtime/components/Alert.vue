<script lang="ts">
import type { DefineComponent } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/alert'
import { tv } from '../utils/tv'
import type { AvatarProps, ButtonProps } from '../types'

const appConfig = _appConfig as AppConfig & { b24ui: { alert: Partial<typeof theme> } }

const alert = tv({ extend: tv(theme), ...(appConfig.b24ui?.alert || {}) })

type AlertVariants = VariantProps<typeof alert>

export interface AlertProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  title?: string
  description?: string
  icon?: DefineComponent
  avatar?: AvatarProps
  color?: AlertVariants['color']
  size?: AlertVariants['size']
  /**
   * Display a list of actions:
   * - under the title and description if multiline
   * - next to the close button if not multiline
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: ButtonProps[]
  /**
   * Display a close button to dismiss the alert.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue false
   */
  close?: ButtonProps | boolean
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   */
  closeIcon?: DefineComponent
  class?: any
  b24ui?: Partial<typeof alert.slots>
}

export interface AlertEmits {
  (e: 'update:open', value: boolean): void
}

export interface AlertSlots {
  leading(props?: {}): any
  title(props?: {}): any
  description(props?: {}): any
  actions(props?: {}): any
  close(props: { b24ui: any }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'

const props = defineProps<AlertProps>()
const emits = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()

const { t } = useLocale()
const appConfig = useAppConfig()

const multiline = computed(() => !!props.title && !!props.description)

const b24ui = computed(() => alert({
  color: props.color,
  size: props.size
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root], multiline })">
    <slot name="leading">
      <B24Avatar v-if="avatar" :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
      <Component
        :is="icon"
        v-if="icon"
        :class="b24ui.icon({ class: props.b24ui?.icon })"
      />
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

      <div v-if="multiline && actions?.length" :class="b24ui.actions({ class: props.b24ui?.actions, multiline: true })">
        <slot name="actions">
          <B24Button v-for="(action, index) in actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="(!multiline && actions?.length) || close" :class="b24ui.actions({ class: props.b24ui?.actions, multiline: false })">
      <template v-if="!multiline">
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
          v-bind="typeof close === 'object' ? close : undefined"
          :class="b24ui.close({ class: props.b24ui?.close })"
          @click="emits('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
