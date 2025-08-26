<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ContentAlignVariants, ContentSideVariants } from './../../dictionary'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'

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
    arrow
    :b24ui="{ content: 'p-[10px]' }"
    :content="content"
  >
    <B24Button label="Upload file" />

    <template #content>
      <div class="max-w-[192px] max-h-[292px]">
        <div class="flex flex-col gap-[14px]">
          <B24Separator />
          <div class="w-full flex flex-row flex-nowrap items-center justify-start gap-3">
            <div class="size-8xl rounded-xs border border-(--ui-color-divider-default) flex flex-col items-center justify-center">
              <FileUploadIcon class="size-10 text-(--b24ui-typography-description-color)" />
            </div>
            <div class="flex flex-col flex-nowrap gap-1">
              <ProseH5 class="mb-0">
                start-ui.md
              </ProseH5>
              <ProseP small accent="less-more">
                650 bytes
              </ProseP>
            </div>
          </div>
          <B24Separator />
          <div class="w-full mt-[6px]">
            <B24Textarea autofocus placeholder="Add a comment" autoresize :rows="1" :maxrows="4" />
          </div>
        </div>
      </div>

      <div class="mt-[20px] flex flex-row gap-[10px]">
        <B24Button
          rounded
          label="Send"
          color="air-primary-success"
          size="sm"
          @click="open = false"
        />
        <B24Button
          rounded
          label="Cancel"
          color="air-tertiary-no-accent"
          size="sm"
          @click="open = false"
        />
      </div>
    </template>
  </B24Popover>
</template>
