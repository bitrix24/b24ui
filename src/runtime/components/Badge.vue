<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/badge'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import type { AvatarProps } from '../types'

const appConfig = _appConfig as AppConfig & { b24ui: { badge: Partial<typeof theme> } }

const badge = tv({ extend: tv(theme), ...(appConfig.b24ui?.badge || {}) })

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

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span'
})
defineSlots<BadgeSlots>()

const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const b24ui = computed(() => badge({
  color: props.color,
  depth: props.depth,
  size: props.size
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.base({ class: [props.class, props.b24ui?.base] })">
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

    <slot name="trailing">
      <Component
        :is="trailingIconName"
        v-if="isTrailing && trailingIconName"
        :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
      />
    </slot>
  </Primitive>
</template>
