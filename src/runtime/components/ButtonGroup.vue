<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/button-group'
import type { ComponentConfig } from '../types/utils'

type ButtonGroup = ComponentConfig<typeof theme, AppConfig, 'buttonGroup'>

export interface ButtonGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'md'
   */
  size?: ButtonGroup['variants']['size']
  /**
   * The orientation the buttons are laid out.
   * @defaultValue 'horizontal'
   */
  orientation?: ButtonGroup['variants']['orientation']
  /**
   * Disable show split
   * @defaultValue false
   */
  noSplit?: boolean
  class?: any
  b24ui?: ButtonGroup['slots']
}

export interface ButtonGroupSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { buttonGroupInjectionKey } from '../composables/useButtonGroup'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  noSplit: false
})
defineSlots<ButtonGroupSlots>()

const appConfig = useAppConfig() as ButtonGroup['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.buttonGroup || {}) }))

provide(buttonGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  noSplit: Boolean(props.noSplit),
  size: props.size
})))
</script>

<template>
  <Primitive
    :as="as"
    class="group/items is-button-group"
    :class="b24ui({ orientation, class: props.class })"
  >
    <slot />
  </Primitive>
</template>
