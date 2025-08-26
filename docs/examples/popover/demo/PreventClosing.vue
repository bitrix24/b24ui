<script setup lang="ts">
import { ref, computed } from 'vue'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'
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
</script>

<template>
  <B24Popover
    v-model:open="open"
    :dismissible="false"
    arrow
    :b24ui="{ content: 'p-[10px]' }"
    :content="content"
  >
    <B24Button label="Open" />

    <template #content>
      <div class="flex items-center justify-between gap-4 mb-[4px]">
        <ProseH2 class="mb-0.5">
          Popover non-dismissible
        </ProseH2>

        <B24Button
          color="air-tertiary"
          :icon="Cross50Icon"
          @click="open = false"
        />
      </div>

      <Placeholder class="w-full h-[192px]" />
    </template>
  </B24Popover>
</template>
