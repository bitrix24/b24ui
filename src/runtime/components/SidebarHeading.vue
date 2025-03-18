<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/sidebar-heading'
import { tv } from '../utils/tv'

const appConfigSidebarHeading = _appConfig as AppConfig & { b24ui: { sidebarHeading: Partial<typeof theme> } }

const sidebarHeading = tv({ extend: tv(theme), ...(appConfigSidebarHeading.b24ui?.sidebarHeading || {}) })

export interface SidebarHeadingProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'h6'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof sidebarHeading.slots>
}

export interface SidebarHeadingSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarHeadingProps>(), {
  as: 'h6'
})
defineSlots<SidebarHeadingSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => sidebarHeading({}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
