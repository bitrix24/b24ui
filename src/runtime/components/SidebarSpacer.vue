<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-spacer'
import type { ComponentConfig } from '../types/tv'

type SidebarSpacer = ComponentConfig<typeof theme, AppConfig, 'sidebarSpacer'>

export interface SidebarSpacerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: SidebarSpacer['slots']
}
/**
 * @todo add Pick<Xxxx
 */

export interface SidebarSpacerSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<SidebarSpacerProps>(), {
  as: 'div'
})
defineSlots<SidebarSpacerSlots>()

const appConfig = useAppConfig() as SidebarSpacer['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarSpacer || {}) })())
</script>

<template>
  <Primitive :as="as" aria-hidden="true" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot />
  </Primitive>
</template>
