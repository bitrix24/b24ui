<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/navbar-section'
import type { ComponentConfig } from '../types/tv'

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
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<NavbarSectionProps>(), {
  as: 'div'
})
defineSlots<NavbarSectionSlots>()

const appConfig = useAppConfig() as NavSection['AppConfig']
const uiProp = useComponentUI('navSection', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.navbarSection || {}) })())
</script>

<template>
  <Primitive
    :as="as"
    data-component="section"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
  >
    <slot />
  </Primitive>
</template>
