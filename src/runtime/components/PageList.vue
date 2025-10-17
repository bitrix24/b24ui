<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-list'
import type { ComponentConfig } from '../types/tv'

type PageList = ComponentConfig<typeof theme, AppConfig, 'pageList'>

export interface PageListProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  divide?: boolean
  class?: any
}

export interface PageListSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<PageListProps>(), {
  divide: false
})
defineSlots<PageListSlots>()

const appConfig = useAppConfig() as PageList['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageList || {}) }))
</script>

<template>
  <Primitive :as="as" role="list" :class="b24ui({ class: props.class, divide: props.divide })">
    <slot />
  </Primitive>
</template>
