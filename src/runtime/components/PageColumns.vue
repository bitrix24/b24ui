<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-columns'
import type { ComponentConfig } from '../types/tv'

type PageColumns = ComponentConfig<typeof theme, AppConfig, 'pageColumns'>

export interface PageColumnsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: { base?: any }
}

export interface PageColumnsSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import { useComponentUI } from '../composables/useComponentUI'

const props = defineProps<PageColumnsProps>()
defineSlots<PageColumnsSlots>()

const appConfig = useAppConfig() as PageColumns['AppConfig']
const uiProp = useComponentUI('pageColumns', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageColumns || {}) }))
</script>

<template>
  <Primitive :as="as" :class="b24ui({ class: [uiProp?.base, props.class] })">
    <slot />
  </Primitive>
</template>
