<script lang="ts">
// import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/stacked-layout'
import { tv } from '../utils/tv'

const appConfigStackedLayout = _appConfig as AppConfig & { b24ui: { stackedLayout: Partial<typeof theme> } }

const stackedLayout = tv({ extend: tv(theme), ...(appConfigStackedLayout.b24ui?.stackedLayout || {}) })

// type StackedLayoutVariants = VariantProps<typeof stackedLayout>

export interface StackedLayoutProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Partial<typeof stackedLayout.slots>
}

export interface StackedLayoutSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<StackedLayoutProps>(), {
  as: 'div'
})
const slots = defineSlots<StackedLayoutSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = stackedLayout()
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <template v-if="!!slots.default">
      <div :class="b24ui.container({ class: props.b24ui?.container })">
        <slot />
      </div>
    </template>
  </Primitive>
</template>
