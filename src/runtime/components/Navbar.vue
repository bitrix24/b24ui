<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/navbar'
import { tv } from '../utils/tv'

const appConfigNavbar = _appConfig as AppConfig & { b24ui: { navbar: Partial<typeof theme> } }

const navbar = tv({ extend: tv(theme), ...(appConfigNavbar.b24ui?.navbar || {}) })

export interface NavbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof navbar.slots>
}

export interface NavbarSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<NavbarProps>(), {
  as: 'nav'
})
defineSlots<NavbarSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => navbar({}))
</script>

<template>
  <!-- Navbar -->
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
