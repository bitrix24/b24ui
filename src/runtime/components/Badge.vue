<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/badge'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import type { AvatarProps } from '../types'

const appConfigBadge = _appConfig as AppConfig & { b24ui: { badge: Partial<typeof theme> } }

const badge = tv({ extend: tv(theme), ...(appConfigBadge.b24ui?.badge || {}) })

type BadgeVariants = VariantProps<typeof badge>

export interface BadgeProps extends Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  label?: string | number
  color?: BadgeVariants['color']
  depth?: BadgeVariants['depth']
  size?: BadgeVariants['size']
  /** Shows 'underline' on hover */
  useLink?: boolean
  /** Shows `Cross20Icon` icon on the right side */
  useClose?: boolean
  onCloseClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>
  /** Fills the background */
  useFill?: boolean
  class?: any
  b24ui?: Partial<typeof badge.slots>
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
import { useComponentIcons } from '../composables/useComponentIcons'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span'
})

defineSlots<BadgeSlots>()

async function onCloseClickWrapper(event: MouseEvent) {
  const callbacks = Array.isArray(props.onCloseClick) ? props.onCloseClick : [props.onCloseClick]
  try {
    await Promise.all(callbacks.map(fn => fn?.(event)))
  } finally { /* empty */ }
}

const { isLeading, leadingIconName } = useComponentIcons(props)

const b24ui = computed(() => badge({
  color: props.color,
  depth: props.depth,
  size: props.size,
  useLink: Boolean(props.useLink),
  useClose: Boolean(props.useClose),
  useFill: Boolean(props.useFill),
  leading: Boolean(isLeading.value)
}))
</script>

<template>
  <Primitive
    :as="as"
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
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

      <slot>
        <span v-if="label" :class="b24ui.label({ class: props.b24ui?.label })">
          {{ label }}
        </span>
      </slot>
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
