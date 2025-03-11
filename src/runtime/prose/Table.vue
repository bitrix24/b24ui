<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/table'
import { tv } from '../utils/tv'

const appConfigProseTable = _appConfig as AppConfig & { b24ui: { prose: { table: Partial<typeof theme> } } }

const proseTable = tv({ extend: tv(theme), ...(appConfigProseTable.b24ui?.prose?.table || {}) })

export interface proseTableProps {
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
  b24ui?: Partial<typeof proseTable.slots>
}

export interface proseTableSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import B24TableWrapper from './../components/content/TableWrapper.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<proseTableProps>(), {
  as: 'div',
  rounded: true,
  zebra: true,
  rowHover: true,
  bordered: true
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseTable({})
</script>

<template>
  <B24TableWrapper
    :as="as"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
    :zebra="props.zebra"
    :row-hover="props.rowHover"
    :rounded="props.rounded"
    :bordered="props.bordered"
  >
    <table
      :class="b24ui.base({ class: props.b24ui?.base })"
    >
      <slot />
    </table>
  </B24TableWrapper>
</template>
