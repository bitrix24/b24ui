<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/pre'
import { tv } from '../utils/tv'

const appConfigProsePre = _appConfig as AppConfig & { b24ui: { prose: { pre: Partial<typeof theme> } } }

const prosePre = tv({ extend: tv(theme), ...(appConfigProsePre.b24ui?.prose?.pre || {}) })

export interface prosePreProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  style?: any
  b24ui?: Partial<typeof prosePre.slots>
}

export interface prosePreSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<prosePreProps>(), { as: 'div' })

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = prosePre({})
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })" :style="props.style">
    <pre
      :class="b24ui.base({ class: props.b24ui?.base })"
    ><slot /></pre>
  </Primitive>
</template>
