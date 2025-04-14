<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/pre'
import type { ComponentConfig } from '../types/utils'

type ProsePre = ComponentConfig<typeof theme, AppConfig, 'pre', 'b24ui.prose'>

export interface ProsePreProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  style?: any
  b24ui?: ProsePre['slots']
}

export interface ProsePreSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProsePreProps>(), {
  as: 'div'
})
defineSlots<ProsePreSlots>()

const appConfig = useAppConfig() as ProsePre['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.pre || {}) })())
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })" :style="props.style">
    <pre
      :class="b24ui.base({ class: props.b24ui?.base })"
    ><slot /></pre>
  </Primitive>
</template>
