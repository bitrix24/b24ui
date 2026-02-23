<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-aside'
import type { ComponentConfig } from '../types/tv'

type PageAside = ComponentConfig<typeof theme, AppConfig, 'pageAside'>

export interface PageAsideProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'aside'
   */
  as?: any
  class?: any
  b24ui?: PageAside['slots']
}

export interface PageAsideSlots {
  top(props?: {}): any
  default(props?: {}): any
  bottom(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<PageAsideProps>(), {
  as: 'aside'
})
const slots = defineSlots<PageAsideSlots>()

const appConfig = useAppConfig() as PageAside['AppConfig']
const uiProp = useComponentUI('pageAside', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageAside || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
      <div v-if="!!slots.top" data-slot="top" :class="b24ui.top({ class: uiProp?.top })">
        <div data-slot="topHeader" :class="b24ui.topHeader({ class: uiProp?.topHeader })" />
        <div data-slot="topBody" :class="b24ui.topBody({ class: uiProp?.topBody })">
          <slot name="top" />
        </div>
        <div data-slot="topFooter" :class="b24ui.topFooter({ class: uiProp?.topFooter })" />
      </div>

      <slot />

      <slot name="bottom" />
    </div>
  </Primitive>
</template>
