<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/content/table-wrapper'
import { tv } from '../../utils/tv'

const appConfigTableWrapper = _appConfig as AppConfig & { b24ui: { content: { tableWrapper: Partial<typeof theme> } } }

const tableWrapper = tv({ extend: tv(theme), ...(appConfigTableWrapper.b24ui?.content?.tableWrapper || {}) })

type TableWrapperVariants = VariantProps<typeof tableWrapper>

export interface TableWrapperProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'md'
   */
  size?: TableWrapperVariants['size']
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
  b24ui?: Partial<typeof tableWrapper.slots>
}

export interface TableWrapperSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableWrapperProps>(), {
  as: 'div',
  scrollbarThin: true
})

const b24ui = computed(() => tableWrapper({
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
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </Primitive>
</template>
