<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-body'
import type { ComponentConfig } from '../types/tv'

type SidebarBody = ComponentConfig<typeof theme, AppConfig, 'sidebarBody'>

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
  b24ui?: SidebarBody['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface SidebarBodySlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<SidebarBodyProps>(), {
  as: 'div',
  scrollbarThin: true
})
defineSlots<SidebarBodySlots>()

const appConfig = useAppConfig() as SidebarBody['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarBody || {}) })({
  scrollbarThin: Boolean(props.scrollbarThin)
}))
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot />
  </Primitive>
</template>
