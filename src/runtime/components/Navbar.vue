<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/navbar'
import type { ComponentConfig } from '../types/tv'

/**
 * @deprecated This component is deprecated and will be removed in version `3.0.0`
 *   - use [Header](https://bitrix24.github.io/b24ui/docs/components/header/)
 *   - use [PageHeader ](https://bitrix24.github.io/b24ui/docs/components/page-header/)
 *   - use [DashboardNavbar](https://bitrix24.github.io/b24ui/docs/components/dashboard-navbar/)
 *
 * @removed 3.0.0
 */

type Navbar = ComponentConfig<typeof theme, AppConfig, 'navbar'>

export interface NavbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any
  class?: any
  b24ui?: Navbar['slots']
}

export interface NavbarSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<NavbarProps>(), {
  as: 'nav'
})

defineSlots<NavbarSlots>()

const props = useComponentProps('navbar', _props)

const appConfig = useAppConfig() as Navbar['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.navbar || {}) })())
</script>

<template>
  <!-- Navbar -->
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot />
  </Primitive>
</template>
