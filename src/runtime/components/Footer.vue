<script lang="ts">
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
  left(props?: {}): any
  default(props?: {}): any
  right(props?: {}): any
  top(props?: {}): any
  bottom(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'
import B24Container from './Container.vue'

const props = withDefaults(defineProps<FooterProps>(), {
  as: 'footer'
})
const slots = defineSlots<FooterSlots>()

const appConfig = useAppConfig() as Footer['AppConfig']
const uiProp = useComponentUI('footer', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.footer || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div v-if="!!slots.top" data-slot="top" :class="b24ui.top({ class: uiProp?.top })">
      <slot name="top" />
    </div>

    <B24Container data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
      <div data-slot="right" :class="b24ui.right({ class: uiProp?.right })">
        <slot name="right" />
      </div>

      <div data-slot="center" :class="b24ui.center({ class: uiProp?.center })">
        <slot />
      </div>

      <div data-slot="left" :class="b24ui.left({ class: uiProp?.left })">
        <slot name="left" />
      </div>
    </B24Container>

    <div v-if="!!slots.bottom" data-slot="bottom" :class="b24ui.bottom({ class: uiProp?.bottom })">
      <slot name="bottom" />
    </div>
  </Primitive>
</template>
