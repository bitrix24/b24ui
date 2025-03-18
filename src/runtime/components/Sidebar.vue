<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar'
import { tv } from '../utils/tv'

const appConfigSidebar = _appConfig as AppConfig & { b24ui: { sidebar: Partial<typeof theme> } }

const sidebar = tv({ extend: tv(theme), ...(appConfigSidebar.b24ui?.sidebar || {}) })

export interface SidebarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof sidebar.slots>
}

export interface SidebarSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarProps>(), {
  as: 'div'
})
defineSlots<SidebarSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => sidebar({}))
</script>

<template>
  <!-- Sidebar -->
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
