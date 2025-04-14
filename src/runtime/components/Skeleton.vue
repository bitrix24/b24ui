<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/skeleton'
import type { ComponentConfig } from '../types/utils'

type Skeleton = ComponentConfig<typeof theme, AppConfig, 'skeleton'>

export interface SkeletonProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<SkeletonProps>()

const appConfig = useAppConfig() as Skeleton['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.skeleton || {}) }))
</script>

<template>
  <Primitive :as="as" :class="b24ui({ class: props.class })">
    <slot />
  </Primitive>
</template>
