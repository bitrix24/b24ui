<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar-body'
import { tv } from '../utils/tv'

const appConfigSidebarBody = _appConfig as AppConfig & { b24ui: { sidebarBody: Partial<typeof theme> } }

const sidebarBody = tv({ extend: tv(theme), ...(appConfigSidebarBody.b24ui?.sidebarBody || {}) })

export interface SidebarBodyProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue true
   */
  scrollbarThin?: boolean
  class?: any
  b24ui?: Partial<typeof sidebarBody.slots>
}

export interface SidebarBodySlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarBodyProps>(), {
  as: 'div',
  scrollbarThin: true
})
defineSlots<SidebarBodySlots>()

const b24ui = computed(() => sidebarBody({
  scrollbarThin: Boolean(props.scrollbarThin)
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
