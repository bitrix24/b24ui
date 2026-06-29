<script lang="ts">
import type { VNode } from 'vue'
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
  top?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  bottom?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<PageAsideProps>(), {
  as: 'aside'
})
const slots = defineSlots<PageAsideSlots>()

const props = useComponentProps('pageAside', _props)

const appConfig = useAppConfig() as PageAside['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.pageAside || {}) })())
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div v-if="!!slots.top" data-slot="top" :class="b24ui.top({ class: props.b24ui?.top })">
        <div data-slot="topHeader" :class="b24ui.topHeader({ class: props.b24ui?.topHeader })" />
        <div data-slot="topBody" :class="b24ui.topBody({ class: props.b24ui?.topBody })">
          <slot name="top" />
        </div>
        <div data-slot="topFooter" :class="b24ui.topFooter({ class: props.b24ui?.topFooter })" />
      </div>

      <slot />

      <slot name="bottom" />
    </div>
  </Primitive>
</template>
