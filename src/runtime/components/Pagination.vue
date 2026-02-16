<script lang="ts">
import type { PaginationRootProps, PaginationRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/pagination'
import type { ButtonProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type Pagination = ComponentConfig<typeof theme, AppConfig, 'pagination'>

export interface PaginationProps extends Partial<Pick<PaginationRootProps, 'defaultPage' | 'disabled' | 'itemsPerPage' | 'page' | 'showEdges' | 'siblingCount' | 'total'>> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon to use for the first page control.
   * @defaultValue icons.chevronDoubleLeft
   * @IconComponent
   */
  firstIcon?: IconComponent
  /**
   * The icon to use for the previous page control.
   * @defaultValue icons.chevronLeft
   * @IconComponent
   */
  prevIcon?: IconComponent
  /**
   * The icon to use for the next page control.
   * @defaultValue icons.chevronRight
   * @IconComponent
   */
  nextIcon?: IconComponent
  /**
   * The icon to use for the last page control.
   * @defaultValue icons.chevronDoubleRight
   * @IconComponent
   */
  lastIcon?: IconComponent
  /**
   * The icon to use for the ellipsis control.
   * @defaultValue icons.ellipsis
   * @IconComponent
   */
  ellipsisIcon?: IconComponent
  /**
   * The color of the pagination controls.
   * @defaultValue 'air-secondary-no-accent'
   */
  color?: ButtonProps['color']
  /**
   * The color of the active pagination control.
   * @defaultValue 'air-primary'
   */
  activeColor?: ButtonProps['color']
  /**
   * Whether to show the first, previous, next, and last controls.
   * @defaultValue true
   */
  showControls?: boolean
  size?: ButtonProps['size']
  /**
   * A function to render page controls as links.
   * @param page The page number to navigate to.
   */
  to?: (page: number) => ButtonProps['to']
  class?: any
  b24ui?: Pagination['slots']
}

export interface PaginationEmits extends PaginationRootEmits {}

export interface PaginationSlots {
  first(props?: {}): any
  prev(props?: {}): any
  next(props?: {}): any
  last(props?: {}): any
  ellipsis(props: { b24ui: Pagination['b24ui'] }): any
  item(props: {
    page: number
    pageCount: number
    item: {
      type: 'ellipsis'
    } | {
      type: 'page'
      value: number
    }
    index: number
  }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { PaginationRoot, PaginationList, PaginationListItem, PaginationFirst, PaginationPrev, PaginationEllipsis, PaginationNext, PaginationLast, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<PaginationProps>(), {
  color: 'air-secondary-no-accent',
  activeColor: 'air-primary',
  showControls: true,
  showEdges: false,
  itemsPerPage: 10,
  siblingCount: 2,
  total: 0
})
const emits = defineEmits<PaginationEmits>()
const slots = defineSlots<PaginationSlots>()

const { dir } = useLocale()
const appConfig = useAppConfig() as Pagination['AppConfig']
const uiProp = useComponentUI('pagination', props)

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultPage', 'disabled', 'itemsPerPage', 'page', 'showEdges', 'siblingCount', 'total'), emits)

const firstIcon = computed(() => props.firstIcon || (dir.value === 'rtl' ? icons.chevronDoubleRight : icons.chevronDoubleLeft))
const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? icons.chevronRight : icons.chevronLeft))
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? icons.chevronLeft : icons.chevronRight))
const lastIcon = computed(() => props.lastIcon || (dir.value === 'rtl' ? icons.chevronDoubleLeft : icons.chevronDoubleRight))

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pagination || {}) })())
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="rootProps" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <PaginationList v-slot="{ items }" data-slot="list" :class="b24ui.list({ class: uiProp?.list })">
      <PaginationFirst v-if="showControls || !!slots.first" as-child data-slot="first" :class="b24ui.first({ class: uiProp?.first })">
        <slot name="first">
          <B24Button :color="color" :size="size" :icon="firstIcon" :to="to?.(1)" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-if="showControls || !!slots.prev" as-child data-slot="prev" :class="b24ui.prev({ class: uiProp?.prev })">
        <slot name="prev">
          <B24Button :color="color" :size="size" :icon="prevIcon" :to="page > 1 ? to?.(page - 1) : undefined" />
        </slot>
      </PaginationPrev>

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem v-if="item.type === 'page'" as-child :value="item.value" data-slot="item" :class="b24ui.item({ class: uiProp?.item })">
          <slot name="item" v-bind="{ item, index, page, pageCount }">
            <B24Button
              :color="page === item.value ? activeColor : color"
              :size="size"
              :label="String(item.value)"
              :b24ui="{ label: b24ui.label() }"
              :to="to?.(item.value)"
              square
            />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis v-else as-child data-slot="ellipsis" :class="b24ui.ellipsis({ class: uiProp?.ellipsis })">
          <slot name="ellipsis" :b24ui="b24ui">
            <B24Button as="div" :color="color" :size="size" :icon="ellipsisIcon || icons.ellipsis" />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="showControls || !!slots.next" as-child data-slot="next" :class="b24ui.next({ class: uiProp?.next })">
        <slot name="next">
          <B24Button :color="color" :size="size" :icon="nextIcon" :to="page < pageCount ? to?.(page + 1) : undefined" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="showControls || !!slots.last" as-child data-slot="last" :class="b24ui.last({ class: uiProp?.last })">
        <slot name="last">
          <B24Button :color="color" :size="size" :icon="lastIcon" :to="to?.(pageCount)" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
