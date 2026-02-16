<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/badge'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type Badge = ComponentConfig<typeof theme, AppConfig, 'badge'>

export interface BadgeProps extends Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  label?: string | number
  /**
   * @defaultValue 'air-primary'
   */
  color?: Badge['variants']['color']
  /**
   * If set to `true` the color is inverted.
   * Used for 'air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot' and 'air-primary-warning' colors.
   * @defaultValue false
   */
  inverted?: boolean
  /**
   * @defaultValue 'md'
   */
  size?: Badge['variants']['size']
  /** Render the badge with equal padding on all sides. */
  square?: boolean
  /**
   * Shows 'underline' on hover
   * @defaultValue false
   */
  useLink?: boolean
  /**
   * Shows icons.close on the right side
   * @defaultValue false
   */
  useClose?: boolean
  onCloseClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>
  class?: any
  b24ui?: Badge['slots']
}

export interface BadgeSlots {
  leading(props: { b24ui: Badge['b24ui'] }): any
  default(props: { b24ui: Badge['b24ui'] }): any
  trailing(props: { b24ui: Badge['b24ui'] }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
  inverted: false
})

const slots = defineSlots<BadgeSlots>()

const appConfig = useAppConfig() as Badge['AppConfig']
const uiProp = useComponentUI('badge', props)

async function onCloseClickWrapper(event: MouseEvent) {
  const callbacks = Array.isArray(props.onCloseClick) ? props.onCloseClick : [props.onCloseClick]
  try {
    await Promise.all(callbacks.map(fn => fn?.(event)))
  } finally { /* empty */ }
}

const { orientation, size: fieldGroupSize } = useFieldGroup<BadgeProps>(props)
const { isLeading, leadingIconName } = useComponentIcons(props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.badge || {}) })({
  color: props.color,
  inverted: Boolean(props.inverted),
  size: fieldGroupSize.value || props.size,
  square: props.square || (!slots.default && !props.label),
  fieldGroup: orientation.value,
  useLink: Boolean(props.useLink),
  useClose: Boolean(props.useClose),
  leading: Boolean(isLeading.value)
}))
</script>

<template>
  <Primitive
    :as="as"
    data-slot="base"
    :class="b24ui.base({ class: [uiProp?.base, props.class] })"
  >
    <Primitive
      :as="as"
      data-slot="wrapper"
      :class="b24ui.wrapper({ class: uiProp?.wrapper })"
    >
      <slot name="leading" :b24ui="b24ui">
        <Component
          :is="leadingIconName"
          v-if="isLeading && leadingIconName"
          data-slot="leadingIcon"
          :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })"
        />
        <B24Avatar
          v-else-if="!!avatar"
          :size="((uiProp?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="avatar"
          data-slot="leadingAvatar"
          :class="b24ui.leadingAvatar({ class: uiProp?.leadingAvatar })"
        />
      </slot>

      <slot :b24ui="b24ui">
        <span v-if="label !== undefined && label !== null" data-slot="label" :class="b24ui.label({ class: uiProp?.label })">
          {{ label }}
        </span>
      </slot>
    </Primitive>
    <slot name="trailing" :b24ui="b24ui">
      <Cross20Icon
        v-if="useClose"
        data-slot="trailingIcon"
        :class="b24ui.trailingIcon({ class: uiProp?.trailingIcon })"
        aria-hidden="true"
        @click.stop.prevent="onCloseClickWrapper"
      />
    </slot>
  </Primitive>
</template>
