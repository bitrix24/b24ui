<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar-section'
import { tv } from '../utils/tv'

const appConfigSidebarSection = _appConfig as AppConfig & { b24ui: { sidebarSection: Partial<typeof theme> } }

const sidebarSection = tv({ extend: tv(theme), ...(appConfigSidebarSection.b24ui?.sidebarSection || {}) })

export interface SidebarSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof sidebarSection.slots>
}

export interface SidebarSectionSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarSectionProps>(), {
  as: 'div'
})
defineSlots<SidebarSectionSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = sidebarSection()
</script>

<template>
  <Primitive
    :as="as"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
    data-slot="section"
  >
    <slot />
  </Primitive>
</template>
