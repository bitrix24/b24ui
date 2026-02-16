<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-footer'
import type { ComponentConfig } from '../types/tv'

type SidebarFooter = ComponentConfig<typeof theme, AppConfig, 'sidebarFooter'>

export interface SidebarFooterProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: SidebarFooter['slots']
}

export interface SidebarFooterSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<SidebarFooterProps>(), {
  as: 'div'
})
defineSlots<SidebarFooterSlots>()

const appConfig = useAppConfig() as SidebarFooter['AppConfig']
const uiProp = useComponentUI('sidebarFooter', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarFooter || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <slot />
  </Primitive>
</template>
