<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/button-group'

const appConfig = _appConfig as AppConfig & { b24ui: { buttonGroup: Partial<typeof theme> } }

const buttonGroup = tv({ extend: tv(theme), ...(appConfig.b24ui?.buttonGroup) })

type ButtonGroupVariants = VariantProps<typeof buttonGroup>

export interface ButtonGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  size?: ButtonGroupVariants['size']
  /**
   * The orientation the buttons are laid out.
   * @defaultValue 'horizontal'
   */
  orientation?: ButtonGroupVariants['orientation']
  /** Disable split */
  noSplit?: boolean
  class?: any
}

export interface ButtonGroupSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { Primitive } from 'reka-ui'
import { buttonGroupInjectionKey } from '../composables/useButtonGroup'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  noSplit: false
})
defineSlots<ButtonGroupSlots>()

provide(buttonGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  noSplit: props.orientation === 'vertical' || Boolean(props.noSplit),
  size: props.size
})))
</script>

<template>
  <Primitive :as="as" :class="buttonGroup({ orientation, class: props.class })">
    <slot />
  </Primitive>
</template>
