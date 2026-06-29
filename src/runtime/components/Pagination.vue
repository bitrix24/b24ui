<script lang="ts">
import type { PaginationRootProps, PaginationRootEmits } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/pagination'
import type { IconComponent } from '../types/icons'
import type { ButtonProps } from './Button.vue'
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
  first?(props?: {}): VNode[]
  prev?(props?: {}): VNode[]
  next?(props?: {}): VNode[]
  last?(props?: {}): VNode[]
  ellipsis?(props: { b24ui: Pagination['b24ui'] }): VNode[]
  item?(props: {
    page: number
    pageCount: number
    item: {
      type: 'ellipsis'
    } | {
      type: 'page'
      value: number
    }
    index: number
  }): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { PaginationRoot, PaginationList, PaginationListItem, PaginationFirst, PaginationPrev, PaginationEllipsis, PaginationNext, PaginationLast } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const _props = withDefaults(defineProps<PaginationProps>(), {
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

const props = useComponentProps('pagination', _props)

const { dir } = useLocale()
const appConfig = useAppConfig() as Pagination['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'defaultPage', 'disabled', 'itemsPerPage', 'page', 'showEdges', 'siblingCount', 'total'), emits)

// eslint-disable-next-line vue/no-dupe-keys
const firstIcon = computed(() => props.firstIcon || (dir.value === 'rtl' ? icons.chevronDoubleRight : icons.chevronDoubleLeft))
// eslint-disable-next-line vue/no-dupe-keys
const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? icons.chevronRight : icons.chevronLeft))
// eslint-disable-next-line vue/no-dupe-keys
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? icons.chevronLeft : icons.chevronRight))
// eslint-disable-next-line vue/no-dupe-keys
const lastIcon = computed(() => props.lastIcon || (dir.value === 'rtl' ? icons.chevronDoubleLeft : icons.chevronDoubleRight))

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.pagination || {}) })())
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="(rootProps as any)" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <PaginationList v-slot="{ items }" data-slot="list" :class="b24ui.list({ class: props.b24ui?.list })">
      <PaginationFirst v-if="props.showControls || !!slots.first" as-child data-slot="first" :class="b24ui.first({ class: props.b24ui?.first })">
        <slot name="first">
          <B24Button :color="props.color" :size="props.size" :icon="firstIcon" :to="props.to?.(1)" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-if="props.showControls || !!slots.prev" as-child data-slot="prev" :class="b24ui.prev({ class: props.b24ui?.prev })">
        <slot name="prev">
          <B24Button :color="props.color" :size="props.size" :icon="prevIcon" :to="page > 1 ? props.to?.(page - 1) : undefined" />
        </slot>
      </PaginationPrev>

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem v-if="item.type === 'page'" as-child :value="item.value" data-slot="item" :class="b24ui.item({ class: props.b24ui?.item })">
          <slot name="item" v-bind="{ item, index, page, pageCount }">
            <B24Button
              :color="page === item.value ? props.activeColor : props.color"
              :size="props.size"
              :label="String(item.value)"
              :b24ui="{ label: b24ui.label() }"
              :to="props.to?.(item.value)"
              square
            />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis v-else as-child data-slot="ellipsis" :class="b24ui.ellipsis({ class: props.b24ui?.ellipsis })">
          <slot name="ellipsis" :b24ui="b24ui">
            <B24Button as="div" :color="props.color" :size="props.size" :icon="props.ellipsisIcon || icons.ellipsis" />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="props.showControls || !!slots.next" as-child data-slot="next" :class="b24ui.next({ class: props.b24ui?.next })">
        <slot name="next">
          <B24Button :color="props.color" :size="props.size" :icon="nextIcon" :to="page < pageCount ? props.to?.(page + 1) : undefined" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="props.showControls || !!slots.last" as-child data-slot="last" :class="b24ui.last({ class: props.b24ui?.last })">
        <slot name="last">
          <B24Button :color="props.color" :size="props.size" :icon="lastIcon" :to="props.to?.(pageCount)" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
