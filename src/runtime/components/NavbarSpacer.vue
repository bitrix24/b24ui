<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/navbar-spacer'
import type { ComponentConfig } from '../types/tv'

/**
 * @deprecated This component is deprecated and will be removed in version `3.0.0`
 *   - use [Header](https://bitrix24.github.io/b24ui/docs/components/header/)
 *   - use [PageHeader ](https://bitrix24.github.io/b24ui/docs/components/page-header/)
 *   - use [DashboardNavbar](https://bitrix24.github.io/b24ui/docs/components/dashboard-navbar/)
 *
 * @removed 3.0.0
 */

type NavbarSpacer = ComponentConfig<typeof theme, AppConfig, 'navbarSpacer'>

export interface NavbarSpacerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: NavbarSpacer['slots']
}

export interface NavbarSpacerSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<NavbarSpacerProps>(), {
  as: 'div'
})

defineSlots<NavbarSpacerSlots>()

const props = useComponentProps('navbarSpacer', _props)

const appConfig = useAppConfig() as NavbarSpacer['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.navbarSpacer || {}) })())
</script>

<template>
  <Primitive :as="props.as" aria-hidden="true" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot />
  </Primitive>
</template>
