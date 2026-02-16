<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-heading'
import type { ComponentConfig } from '../types/tv'

type SidebarHeading = ComponentConfig<typeof theme, AppConfig, 'sidebarHeading'>

export interface SidebarHeadingProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'h6'
   */
  as?: any
  class?: any
  b24ui?: SidebarHeading['slots']
}

export interface SidebarHeadingSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<SidebarHeadingProps>(), {
  as: 'h6'
})
defineSlots<SidebarHeadingSlots>()

const appConfig = useAppConfig() as SidebarHeading['AppConfig']
const uiProp = useComponentUI('sidebarHeading', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarHeading || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <slot />
  </Primitive>
</template>
