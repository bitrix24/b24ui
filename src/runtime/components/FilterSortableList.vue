<script lang="ts">
import type { VNode } from 'vue'

export interface FilterSortableListProps<T> {
  /** Reactive list to sort. */
  modelValue: T[]
  /**
   * CSS selector for the drag handle inside each item slot.
   * Items without a matching element become non-draggable.
   * @defaultValue '[data-drag-handle]'
   */
  handle?: string
  /**
   * Disable drag-and-drop entirely.
   * @defaultValue false
   */
  disabled?: boolean
  /** Animation duration in ms. */
  animation?: number
  /** Render-as element for the list container. */
  as?: any
  class?: any
}

export interface FilterSortableListEmits<T> {
  (e: 'update:modelValue', value: T[]): void
  (e: 'reorder', payload: { oldIndex: number, newIndex: number, value: T[] }): void
}

export interface FilterSortableListSlots<T> {
  default?(props: { item: T, index: number }): VNode[]
}
</script>

<script setup lang="ts" generic="T">
import { onMounted, onBeforeUnmount, useTemplateRef, watch, computed } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'

const props = withDefaults(defineProps<FilterSortableListProps<T>>(), {
  handle: '[data-drag-handle]',
  disabled: false,
  animation: 150,
  as: 'div'
})
const emits = defineEmits<FilterSortableListEmits<T>>()
defineSlots<FilterSortableListSlots<T>>()

const listEl = useTemplateRef<HTMLElement>('listEl')

const items = computed({
  get: () => props.modelValue,
  set: (value: T[]) => emits('update:modelValue', value)
})

let sortable: ReturnType<typeof useSortable> | null = null

onMounted(() => {
  if (!listEl.value) return
  sortable = useSortable(listEl, items, {
    handle: props.handle,
    animation: props.animation,
    disabled: props.disabled,
    onEnd: (event: { oldIndex?: number, newIndex?: number }) => {
      const oldIndex = event.oldIndex
      const newIndex = event.newIndex
      if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) return
      emits('reorder', { oldIndex, newIndex, value: items.value })
    }
  })
  sortable.start()
})

onBeforeUnmount(() => {
  sortable?.stop()
  sortable = null
})

watch(() => props.disabled, (value) => {
  sortable?.option('disabled', value)
})
</script>

<template>
  <component
    :is="props.as"
    ref="listEl"
    data-slot="root"
    :class="props.class"
  >
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <slot :item="item" :index="index" />
    </template>
  </component>
</template>
