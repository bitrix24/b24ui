<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/sidebar-header'
import type { ComponentConfig } from '../types/tv'

/**
 * @deprecated This component is deprecated and will be removed in version `3.0.0`
 *   - use [DashboardSidebar](https://bitrix24.github.io/b24ui/docs/components/dashboard-sidebar/)
 *
 * @removed 3.0.0
 */

type SidebarHeader = ComponentConfig<typeof theme, AppConfig, 'sidebarHeader'>

export interface SidebarHeaderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: SidebarHeader['slots']
}

export interface SidebarHeaderSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<SidebarHeaderProps>(), {
  as: 'div'
})

defineSlots<SidebarHeaderSlots>()

const props = useComponentProps('sidebarHeader', _props)

const appConfig = useAppConfig() as SidebarHeader['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.sidebarHeader || {}) })())
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot />
  </Primitive>
</template>
