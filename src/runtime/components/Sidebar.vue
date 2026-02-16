<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar'
import type { ComponentConfig } from '../types/tv'

type Sidebar = ComponentConfig<typeof theme, AppConfig, 'sidebar'>

export interface SidebarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Sidebar['slots']
}

export interface SidebarSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<SidebarProps>(), {
  as: 'div'
})
defineSlots<SidebarSlots>()

const appConfig = useAppConfig() as Sidebar['AppConfig']
const uiProp = useComponentUI('sidebar', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebar || {}) })())
</script>

<template>
  <!-- Sidebar -->
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <slot />
  </Primitive>
</template>
