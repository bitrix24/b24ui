<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/navbar-spacer'
import { tv } from '../utils/tv'

const appConfigNavbarSpacer = _appConfig as AppConfig & { b24ui: { navbarSpacer: Partial<typeof theme> } }

const navbarSpacer = tv({ extend: tv(theme), ...(appConfigNavbarSpacer.b24ui?.navbarSpacer || {}) })

export interface NavbarSpacerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof navbarSpacer.slots>
}

export interface NavbarSpacerSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<NavbarSpacerProps>(), {
  as: 'div'
})
defineSlots<NavbarSpacerSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = navbarSpacer()
</script>

<template>
  <Primitive :as="as" aria-hidden="true" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <slot />
  </Primitive>
</template>
