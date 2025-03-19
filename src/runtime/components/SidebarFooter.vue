<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar-footer'
import { tv } from '../utils/tv'

const appConfigSidebarFooter = _appConfig as AppConfig & { b24ui: { sidebarFooter: Partial<typeof theme> } }

const sidebarFooter = tv({ extend: tv(theme), ...(appConfigSidebarFooter.b24ui?.sidebarFooter || {}) })

export interface SidebarFooterProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof sidebarFooter.slots>
}

export interface SidebarFooterSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarFooterProps>(), {
  as: 'div'
})
defineSlots<SidebarFooterSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = sidebarFooter()
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
