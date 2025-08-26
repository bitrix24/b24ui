<script setup lang="ts">
import { ref, computed } from 'vue'
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

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Popover
    v-model:open="open"
    :b24ui="{ content: 'p-[10px]' }"
    :content="content"
  >
    <B24Button label="Open" />

    <template #content>
      <Placeholder class="size-[192px]" />
    </template>
  </B24Popover>
</template>
