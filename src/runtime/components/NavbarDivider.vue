<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/navbar-divider'
import { tv } from '../utils/tv'

const appConfigNavbarDivider = _appConfig as AppConfig & { b24ui: { navbarDivider: Partial<typeof theme> } }

const navbarDivider = tv({ extend: tv(theme), ...(appConfigNavbarDivider.b24ui?.navbarDivider || {}) })

export interface NavbarDividerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof navbarDivider.slots>
}

export interface NavbarDividerSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<NavbarDividerProps>(), {
  as: 'div'
})
defineSlots<NavbarDividerSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => navbarDivider({}))
</script>

<template>
  <Primitive :as="as" aria-hidden="true" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
