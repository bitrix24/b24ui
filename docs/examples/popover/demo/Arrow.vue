<script setup lang="ts">
import { computed } from 'vue'
import type { ContentAlignVariants, ContentSideVariants } from './../../dictionary'

export interface ExampleProps {
  contentAlign?: ContentAlignVariants
  contentSide?: ContentSideVariants
  contentSideOffset?: number
}

const props = withDefaults(defineProps<ExampleProps>(), {
  contentAlign: 'start' as ContentAlignVariants,
  contentSide: 'top' as ContentSideVariants,
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
    arrow
    :content="content"
    :b24ui="{ content: 'p-[10px]' }"
  >
    <B24Button label="Hover" />

    <template #content>
      <Placeholder class="size-[192px]" />
    </template>
  </B24Popover>

  <B24Popover
    arrow
    :content="content"
    :b24ui="{ content: 'p-[10px]' }"
  >
    <B24Button label="Open" />

    <template #content>
      <Placeholder class="size-[192px]" />
    </template>
  </B24Popover>
</template>
