<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/table'
import type { ComponentConfig } from '../../types/tv'

type ProseTable = ComponentConfig<typeof theme, AppConfig, 'table', 'b24ui.prose'>

export interface ProseTableProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue true
   */
  rounded?: boolean
  /**
   * @defaultValue true
   */
  zebra?: boolean
  /**
   * @defaultValue false
   */
  rowHover?: boolean
  /**
   * @defaultValue false
   */
  bordered?: boolean
  class?: any
  b24ui?: ProseTable['slots']
}

export interface ProseTableSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'
import B24TableWrapper from './../TableWrapper.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProseTableProps>(), {
  as: 'div',
  rounded: true,
  zebra: true,
  rowHover: true,
  bordered: true
})
defineSlots<ProseTableSlots>()

const appConfig = useAppConfig() as ProseTable['AppConfig']
const uiProp = useComponentUI('prose.table', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.table || {}) })())
</script>

<template>
  <B24TableWrapper
    :as="as"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    :zebra="props.zebra"
    :row-hover="props.rowHover"
    :rounded="props.rounded"
    :bordered="props.bordered"
    size="sm"
  >
    <table data-slot="base" :class="b24ui.base({ class: uiProp?.base })">
      <slot />
    </table>
  </B24TableWrapper>
</template>
