<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/container'
import type { ComponentConfig } from '../types/tv'

type Container = ComponentConfig<typeof theme, AppConfig, 'container'>

export interface ContainerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
}

export interface ContainerSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ContainerProps>()
defineSlots<ContainerSlots>()

const appConfig = useAppConfig() as Container['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.container || {}) }))
</script>

<template>
  <Primitive :as="as" :class="b24ui({ class: props.class })">
    <slot />
  </Primitive>
</template>
