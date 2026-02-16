<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-header'
import type { ComponentConfig } from '../types/tv'

type SidebarHeader = ComponentConfig<typeof theme, AppConfig, 'sidebarHeader'>

export interface SidebarHeaderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: SidebarHeader['slots']
}

export interface SidebarHeaderSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<SidebarHeaderProps>(), {
  as: 'div'
})
defineSlots<SidebarHeaderSlots>()

const appConfig = useAppConfig() as SidebarHeader['AppConfig']
const uiProp = useComponentUI('sidebarHeader', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarHeader || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <slot />
  </Primitive>
</template>
