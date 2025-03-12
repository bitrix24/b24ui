<script setup lang="ts">
import { computed } from 'vue'

export interface ExampleProps {
  contentAlign?: 'start' | 'center' | 'end'
  contentSide?: 'top' | 'right' | 'bottom' | 'left'
  contentSideOffset?: number
}

const props = withDefaults(defineProps<ExampleProps>(), {
  contentAlign: 'start',
  contentSide: 'left',
  contentSideOffset: 8
})

const content = computed(() => {
  return {
    align: props.contentAlign,
    side: props.contentSide,
    sideOffset: props.contentSideOffset
  }
})
</script>

<template>
  <B24Popover
    mode="hover"
    :content="content"
  >
    <B24Button label="Hover" color="link" depth="dark" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </B24Popover>
</template>
