<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/table-wrapper'
import type { ComponentConfig } from '../types/tv'

type TableWrapper = ComponentConfig<typeof theme, AppConfig, 'tableWrapper', 'b24ui'>

export interface TableWrapperProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'md'
   */
  size?: TableWrapper['variants']['size']
  /**
   * @defaultValue false
   */
  rounded?: boolean
  /**
   * @defaultValue false
   */
  zebra?: boolean
  /**
   * @defaultValue false
   */
  pinRows?: boolean
  /**
   * @defaultValue false
   */
  pinCols?: boolean
  /**
   * @defaultValue false
   */
  rowHover?: boolean
  /**
   * @defaultValue false
   */
  bordered?: boolean
  /**
   * @defaultValue true
   */
  scrollbarThin?: boolean
  class?: any
  b24ui?: TableWrapper['slots']
}

export interface TableWrapperSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableWrapperProps>(), {
  as: 'div',
  scrollbarThin: true
})

const appConfig = useAppConfig() as TableWrapper['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.tableWrapper || {}) })({
  size: props.size,
  rounded: Boolean(props.rounded),
  zebra: Boolean(props.zebra),
  pinRows: Boolean(props.pinRows),
  pinCols: Boolean(props.pinCols),
  rowHover: Boolean(props.rowHover),
  bordered: Boolean(props.bordered),
  scrollbarThin: Boolean(props.scrollbarThin)
}))
</script>

<template>
  <Primitive
    :as="as"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
