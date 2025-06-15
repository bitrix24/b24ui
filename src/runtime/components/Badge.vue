<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/badge'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps } from '../types'
import type { ComponentConfig } from '../types/utils'

type Badge = ComponentConfig<typeof theme, AppConfig, 'badge'>

export interface BadgeProps extends Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  label?: string | number
  /**
   * @defaultValue 'default'
   */
  color?: Badge['variants']['color']
  /**
   * @defaultValue 'normal'
   */
  depth?: Badge['variants']['depth']
  /**
   * @defaultValue 'md'
   */
  size?: Badge['variants']['size']
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
  /**
   * Fills the background
   * @defaultValue false
   */
  useFill?: boolean
  class?: any
  b24ui?: Badge['slots']
}

export interface BadgeSlots {
  leading(props?: {}): any
  default(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span'
})

defineSlots<BadgeSlots>()

const appConfig = useAppConfig() as Badge['AppConfig']

async function onCloseClickWrapper(event: MouseEvent) {
  const callbacks = Array.isArray(props.onCloseClick) ? props.onCloseClick : [props.onCloseClick]
  try {
    await Promise.all(callbacks.map(fn => fn?.(event)))
  } finally { /* empty */ }
}

const { orientation, size: buttonGroupSize } = useButtonGroup<BadgeProps>(props)
const { isLeading, leadingIconName } = useComponentIcons(props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.badge || {}) })({
  color: props.color,
  depth: props.depth,
  size: buttonGroupSize.value || props.size,
  buttonGroup: orientation.value,
  useLink: Boolean(props.useLink),
  useClose: Boolean(props.useClose),
  useFill: Boolean(props.useFill),
  leading: Boolean(isLeading.value)
}))
</script>

<template>
  <Primitive
    :as="as"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <Primitive
      :as="as"
      :class="b24ui.wrapper({ class: props.b24ui?.wrapper })"
    >
      <slot name="leading">
        <Component
          :is="leadingIconName"
          v-if="isLeading && leadingIconName"
          :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
        />
        <B24Avatar
          v-else-if="!!avatar"
          :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="avatar"
          :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
        />
      </slot>

      <span :class="b24ui.label({ class: props.b24ui?.label })">
        <slot>
          <span v-if="label">
            {{ label }}
          </span>
        </slot>
      </span>
    </Primitive>
    <slot name="trailing">
      <Cross20Icon
        v-if="useClose"
        :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
        aria-hidden="true"
        @click.stop.prevent="onCloseClickWrapper"
      />
    </slot>
  </Primitive>
</template>
