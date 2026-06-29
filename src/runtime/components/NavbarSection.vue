<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/navbar-section'
import type { ComponentConfig } from '../types/tv'

/**
 * @deprecated This component is deprecated and will be removed in version `3.0.0`
 *   - use [Header](https://bitrix24.github.io/b24ui/docs/components/header/)
 *   - use [PageHeader ](https://bitrix24.github.io/b24ui/docs/components/page-header/)
 *   - use [DashboardNavbar](https://bitrix24.github.io/b24ui/docs/components/dashboard-navbar/)
 *
 * @removed 3.0.0
 */

type NavSection = ComponentConfig<typeof theme, AppConfig, 'navbarSection'>

export interface NavbarSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: NavSection['slots']
}

export interface NavbarSectionSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<NavbarSectionProps>(), {
  as: 'div'
})

defineSlots<NavbarSectionSlots>()

const props = useComponentProps('navSection', _props)

const appConfig = useAppConfig() as NavSection['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.navbarSection || {}) })())
</script>

<template>
  <Primitive
    :as="props.as"
    data-component="section"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <slot />
  </Primitive>
</template>
