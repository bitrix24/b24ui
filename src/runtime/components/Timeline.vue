<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/timeline'
import type { AvatarProps, IconComponent } from '../types'
import type { DynamicSlots, GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Timeline = ComponentConfig<typeof theme, AppConfig, 'timeline'>

export interface TimelineItem {
  date?: string
  title?: string
  description?: string
  icon?: IconComponent
  avatar?: AvatarProps
  value?: string | number
  slot?: string
  class?: any
  b24ui?: Pick<Timeline['slots'], 'item' | 'container' | 'indicator' | 'separator' | 'wrapper' | 'date' | 'title' | 'description'>
  [key: string]: any
}

export interface TimelineProps<T extends TimelineItem = TimelineItem> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items: T[]
  /**
   * @defaultValue 'md'
   */
  size?: Timeline['variants']['size']
  /**
   * @defaultValue 'air-primary'
   */
  color?: Timeline['variants']['color']
  /**
   * The orientation of the Timeline.
   * @defaultValue 'vertical'
   */
  orientation?: Timeline['variants']['orientation']
  /**
   * The key used to get the value from the item.
   * @defaultValue 'value'
   */
  valueKey?: GetItemKeys<T>
  defaultValue?: string | number
  reverse?: boolean
  class?: any
  b24ui?: Timeline['slots']
}

type SlotProps<T extends TimelineItem> = (props: { item: T }) => any

export interface TimelineEmits<T extends TimelineItem = TimelineItem> {
  select: [event: Event, item: T]
}

export type TimelineSlots<T extends TimelineItem = TimelineItem> = {
  indicator: SlotProps<T>
  wrapper: SlotProps<T>
  date: SlotProps<T>
  title: SlotProps<T>
  description: SlotProps<T>
} & DynamicSlots<T, 'indicator' | 'wrapper' | 'date' | 'title' | 'description', { item: T }>

</script>

<script setup lang="ts" generic="T extends TimelineItem">
import { computed } from 'vue'
import { Primitive, Separator } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'
import { get } from '../utils'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<TimelineProps<T>>(), {
  orientation: 'vertical',
  valueKey: 'value'
})
const emits = defineEmits<TimelineEmits<T>>()
const slots = defineSlots<TimelineSlots<T>>()

const modelValue = defineModel<string | number>()

const appConfig = useAppConfig() as Timeline['AppConfig']
const uiProp = useComponentUI('timeline', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.timeline || {}) })({
  orientation: props.orientation,
  size: props.size,
  color: props.color,
  reverse: props.reverse
}))

const currentStepIndex = computed(() => {
  const value = modelValue.value ?? props.defaultValue

  if (typeof value === 'string') {
    return props.items.findIndex(item => get(item, props.valueKey as string) === value) ?? -1
  }

  if (props.reverse) {
    return value != null ? props.items.length - 1 - value : -1
  } else {
    return value ?? -1
  }
})

function getItemState(index: number): 'active' | 'completed' | undefined {
  if (currentStepIndex.value === -1) return undefined
  if (index === currentStepIndex.value) return 'active'

  if (props.reverse) {
    return index > currentStepIndex.value ? 'completed' : undefined
  } else {
    return index < currentStepIndex.value ? 'completed' : undefined
  }
}

function onSelect(event: Event, item: T) {
  emits('select', event, item)
}
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div
      v-for="(item, index) in items"
      :key="index"
      data-slot="item"
      :class="b24ui.item({ class: [uiProp?.item, item.b24ui?.item, item.class] })"
      :data-state="getItemState(index)"
      @click="onSelect($event, item)"
    >
      <div data-slot="container" :class="b24ui.container({ class: [uiProp?.container, item.b24ui?.container] })">
        <B24Avatar
          :size="size"
          :icon="item.icon"
          v-bind="typeof item.avatar === 'object' ? item.avatar : {}"
          data-slot="indicator"
          :class="b24ui.indicator({ class: [uiProp?.indicator, item.b24ui?.indicator] })"
          :b24ui="{ icon: 'text-inherit', fallback: 'text-inherit' }"
        >
          <slot :name="((item.slot ? `${item.slot}-indicator` : 'indicator') as keyof TimelineSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" />
        </B24Avatar>

        <Separator
          v-if="index < items.length - 1"
          data-slot="separator"
          :class="b24ui.separator({ class: [uiProp?.separator, item.b24ui?.separator] })"
          :orientation="props.orientation"
        />
      </div>

      <div data-slot="wrapper" :class="b24ui.wrapper({ class: [uiProp?.wrapper, item.b24ui?.wrapper] })">
        <slot :name="((item.slot ? `${item.slot}-wrapper` : 'wrapper') as keyof TimelineSlots<T>)" :item="(item as Extract<T, { slot: string; }>)">
          <div v-if="item.date || !!slots[(item.slot ? `${item.slot}-date` : 'date') as keyof TimelineSlots<T>]" data-slot="date" :class="b24ui.date({ class: [uiProp?.date, item.b24ui?.date] })">
            <slot :name="((item.slot ? `${item.slot}-date` : 'date') as keyof TimelineSlots<T>)" :item="(item as Extract<T, { slot: string; }>)">
              {{ item.date }}
            </slot>
          </div>
          <div v-if="item.title || !!slots[(item.slot ? `${item.slot}-title` : 'title') as keyof TimelineSlots<T>]" data-slot="title" :class="b24ui.title({ class: [uiProp?.title, item.b24ui?.title] })">
            <slot :name="((item.slot ? `${item.slot}-title` : 'title') as keyof TimelineSlots<T>)" :item="(item as Extract<T, { slot: string; }>)">
              {{ item.title }}
            </slot>
          </div>
          <div v-if="item.description || !!slots[(item.slot ? `${item.slot}-description` : 'description') as keyof TimelineSlots<T>]" data-slot="description" :class="b24ui.description({ class: [uiProp?.description, item.b24ui?.description] })">
            <slot :name="((item.slot ? `${item.slot}-description` : 'description') as keyof TimelineSlots<T>)" :item="(item as Extract<T, { slot: string; }>)">
              {{ item.description }}
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
