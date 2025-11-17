<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-section'
import type { ComponentConfig } from '../types/tv'

type SidebarSection = ComponentConfig<typeof theme, AppConfig, 'sidebarSection'>

export interface SidebarSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: SidebarSection['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface SidebarSectionSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<SidebarSectionProps>(), {
  as: 'div'
})
defineSlots<SidebarSectionSlots>()

const appConfig = useAppConfig() as SidebarSection['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarSection || {}) })())
</script>

<template>
  <Primitive
    :as="as"
    data-component="section"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <slot />
  </Primitive>
</template>
