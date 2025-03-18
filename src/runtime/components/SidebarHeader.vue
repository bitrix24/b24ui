<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar-header'
import { tv } from '../utils/tv'

const appConfigSidebarHeader = _appConfig as AppConfig & { b24ui: { sidebarHeader: Partial<typeof theme> } }

const sidebarHeader = tv({ extend: tv(theme), ...(appConfigSidebarHeader.b24ui?.sidebarHeader || {}) })

export interface SidebarHeaderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof sidebarHeader.slots>
}

export interface SidebarHeaderSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarHeaderProps>(), {
  as: 'div'
})
defineSlots<SidebarHeaderSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => sidebarHeader({}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
