<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-grid'
import type { ComponentConfig } from '../types/tv'

type PageGrid = ComponentConfig<typeof theme, AppConfig, 'pageGrid'>

export interface PageGridProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: { base?: any }
}

export interface PageGridSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = defineProps<PageGridProps>()
defineSlots<PageGridSlots>()

const appConfig = useAppConfig() as PageGrid['AppConfig']
const uiProp = useComponentUI('pageGrid', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageGrid || {}) }))
</script>

<template>
  <Primitive :as="as" :class="b24ui({ class: [uiProp?.base, props.class] })">
    <slot />
  </Primitive>
</template>
