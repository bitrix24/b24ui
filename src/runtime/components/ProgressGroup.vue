<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/progress-group'
import type { IconComponent } from '../types/icons'
import type { DynamicSlots } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type ProgressGroup = ComponentConfig<typeof theme, AppConfig, 'progressGroup'>

export interface ProgressGroupItem {
  label?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  /** The part of `max` this segment takes up. */
  value?: number
  /**
   * @defaultValue 'air-primary'
   */
  color?: ProgressGroup['variants']['color']
  slot?: string
  class?: any
  b24ui?: Pick<ProgressGroup['slots'], 'segment' | 'indicator' | 'item' | 'itemLeadingIcon' | 'itemLeadingDot' | 'itemLabel' | 'itemTrailing'>
  [key: string]: any
}

export interface ProgressGroupProps<T extends ProgressGroupItem = ProgressGroupItem> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items?: T[]
  /**
   * The value all items add up to, used to compute each segment's share of the track.
   * @defaultValue 100
   */
  max?: number
  /** Display the summed progress value. */
  status?: boolean
  /**
   * @defaultValue 'md'
   */
  size?: ProgressGroup['variants']['size']
  /**
   * @defaultValue 'air-primary'
   */
  color?: ProgressGroup['variants']['color']
  /**
   * The orientation of the progress bar.
   * @defaultValue 'horizontal'
   */
  orientation?: ProgressGroup['variants']['orientation']
  class?: any
  b24ui?: ProgressGroup['slots']
}

type SlotProps<T extends ProgressGroupItem> = (props: { item: T, index: number, percent: number }) => VNode[]

export type ProgressGroupSlots<T extends ProgressGroupItem = ProgressGroupItem> = {
  'status'?: (props: { percent: number }) => VNode[]
  'item'?: SlotProps<T>
  'item-leading'?: SlotProps<T>
  'item-label'?: SlotProps<T>
  'item-trailing'?: SlotProps<T>
} & DynamicSlots<T, 'leading' | 'label' | 'trailing', { index: number, percent: number }>

</script>

<script setup lang="ts" generic="T extends ProgressGroupItem">
import { computed } from 'vue'
import { Primitive, ProgressRoot, ProgressIndicator } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<ProgressGroupProps<T>>(), {
  max: 100,
  orientation: 'horizontal'
})
const slots = defineSlots<ProgressGroupSlots<T>>()

const props = useComponentProps<ProgressGroupProps<T>>('progressGroup', _props)

const appConfig = useAppConfig() as ProgressGroup['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.progressGroup || {}) })({
  size: props.size,
  color: props.color,
  orientation: props.orientation
}))

// `ProgressRoot` logs an error and falls back to 100 for a `max` that isn't a positive
// number, so resolve it here to keep the segment widths and the console quiet.
// eslint-disable-next-line vue/no-dupe-keys
const max = computed(() => {
  const value = Number(props.max)

  return Number.isFinite(value) && value > 0 ? value : 100
})

// `ProgressRoot` turns a value below `0` or above `max` into `null`, which reads as
// indeterminate, so clamp before handing it over.
const values = computed(() => (props.items ?? []).map(item => Math.min(Math.max(Number(item.value) || 0, 0), max.value)))

const percents = computed(() => values.value.map(value => (value / max.value) * 100))

const percent = computed(() => Math.min(100, Math.round(percents.value.reduce((total, value) => total + value, 0))))

// The theme reads the size off `--percent` so `b24ui.status` can override it; an inline
// `width` would win over the class.
const statusStyle = computed(() => ({ '--percent': `${percent.value}%` }))

const itemColors = computed(() => (props.items ?? []).map(item => item.color || props.color))

const hasList = computed(() => !!props.items?.length
  && (props.items.some(item => item.label || item.icon || item.slot)
    || !!slots.item || !!slots['item-leading'] || !!slots['item-label'] || !!slots['item-trailing']))

function segmentStyle(index: number) {
  const value = `${percents.value[index] ?? 0}%`

  return props.orientation === 'vertical' ? { height: value } : { width: value }
}

// `ProgressRoot` derives `aria-label` from `getValueLabel`, whose default is the segment's
// percentage, so only override it to name a segment after its item.
const valueLabels = computed(() => (props.items ?? []).map((item) => {
  const label = item.label

  return label ? () => label : undefined
}))
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="props.status || !!slots.status" data-slot="status" :class="b24ui.status({ class: props.b24ui?.status })" :style="statusStyle">
      <slot name="status" :percent="percent">
        {{ percent }}%
      </slot>
    </div>

    <div data-slot="base" :class="b24ui.base({ class: props.b24ui?.base })">
      <ProgressRoot
        v-for="(item, index) in props.items"
        :key="index"
        :model-value="values[index]"
        :max="max"
        :get-value-label="valueLabels[index]"
        data-slot="segment"
        :class="b24ui.segment({ color: itemColors[index], class: [props.b24ui?.segment, item.b24ui?.segment] })"
        :style="segmentStyle(index)"
      >
        <ProgressIndicator data-slot="indicator" :class="b24ui.indicator({ class: [props.b24ui?.indicator, item.b24ui?.indicator] })" />
      </ProgressRoot>
    </div>

    <ul v-if="hasList" data-slot="list" :class="b24ui.list({ class: props.b24ui?.list })">
      <li v-for="(item, index) in props.items" :key="index" data-slot="item" :class="b24ui.item({ class: [props.b24ui?.item, item.b24ui?.item, item.class] })">
        <slot :name="((item.slot || 'item') as keyof ProgressGroupSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index" :percent="percents[index] ?? 0">
          <slot :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof ProgressGroupSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index" :percent="percents[index] ?? 0">
            <Component :is="item.icon" v-if="item.icon" data-slot="itemLeadingIcon" :class="b24ui.itemLeadingIcon({ color: itemColors[index], class: [props.b24ui?.itemLeadingIcon, item.b24ui?.itemLeadingIcon] })" />
            <span v-else data-slot="itemLeadingDot" :class="b24ui.itemLeadingDot({ color: itemColors[index], class: [props.b24ui?.itemLeadingDot, item.b24ui?.itemLeadingDot] })" />
          </slot>

          <span v-if="item.label || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof ProgressGroupSlots<T>]" data-slot="itemLabel" :class="b24ui.itemLabel({ class: [props.b24ui?.itemLabel, item.b24ui?.itemLabel] })">
            <slot :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof ProgressGroupSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index" :percent="percents[index] ?? 0">
              {{ item.label }}
            </slot>
          </span>

          <span data-slot="itemTrailing" :class="b24ui.itemTrailing({ class: [props.b24ui?.itemTrailing, item.b24ui?.itemTrailing] })">
            <slot :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof ProgressGroupSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index" :percent="percents[index] ?? 0">
              {{ Math.round(percents[index] ?? 0) }}%
            </slot>
          </span>
        </slot>
      </li>
    </ul>
  </Primitive>
</template>
