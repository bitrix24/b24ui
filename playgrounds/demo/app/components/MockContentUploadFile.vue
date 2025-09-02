<script setup lang="ts">
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
</script>

<template>
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
</template>
