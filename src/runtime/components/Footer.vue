<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../types/tv'
import theme from '#build/b24ui/footer'

type Footer = ComponentConfig<typeof theme, AppConfig, 'footer'>

export interface FooterProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'footer'
   */
  as?: any
  class?: any
  b24ui?: Footer['slots']
}

export interface FooterSlots {
  left?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  right?(props?: {}): VNode[]
  top?(props?: {}): VNode[]
  bottom?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'
import B24Container from './Container.vue'

const _props = withDefaults(defineProps<FooterProps>(), {
  as: 'footer'
})
const slots = defineSlots<FooterSlots>()

const props = useComponentProps('footer', _props)

const appConfig = useAppConfig() as Footer['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.footer || {}) })())
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="!!slots.top" data-slot="top" :class="b24ui.top({ class: props.b24ui?.top })">
      <slot name="top" />
    </div>

    <B24Container data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div data-slot="right" :class="b24ui.right({ class: props.b24ui?.right })">
        <slot name="right" />
      </div>

      <div data-slot="center" :class="b24ui.center({ class: props.b24ui?.center })">
        <slot />
      </div>

      <div data-slot="left" :class="b24ui.left({ class: props.b24ui?.left })">
        <slot name="left" />
      </div>
    </B24Container>

    <div v-if="!!slots.bottom" data-slot="bottom" :class="b24ui.bottom({ class: props.b24ui?.bottom })">
      <slot name="bottom" />
    </div>
  </Primitive>
</template>
