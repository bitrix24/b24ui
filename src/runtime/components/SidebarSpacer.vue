<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar-spacer'
import { tv } from '../utils/tv'

const appConfigSidebarSpacer = _appConfig as AppConfig & { b24ui: { sidebarSpacer: Partial<typeof theme> } }

const sidebarSpacer = tv({ extend: tv(theme), ...(appConfigSidebarSpacer.b24ui?.sidebarSpacer || {}) })

export interface SidebarSpacerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof sidebarSpacer.slots>
}

export interface SidebarSpacerSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarSpacerProps>(), {
  as: 'div'
})
defineSlots<SidebarSpacerSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = sidebarSpacer()
</script>

<template>
  <Primitive :as="as" aria-hidden="true" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
