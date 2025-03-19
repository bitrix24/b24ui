<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/navbar-section'
import { tv } from '../utils/tv'

const appConfigNavSection = _appConfig as AppConfig & { b24ui: { navbarSection: Partial<typeof theme> } }

const navbarSection = tv({ extend: tv(theme), ...(appConfigNavSection.b24ui?.navbarSection || {}) })

export interface NavbarSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof navbarSection.slots>
}

export interface NavbarSectionSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<NavbarSectionProps>(), {
  as: 'div'
})
defineSlots<NavbarSectionSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = navbarSection()
</script>

<template>
  <Primitive
    :as="as"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
    data-slot="section"
  >
    <slot />
  </Primitive>
</template>
