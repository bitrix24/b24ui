<script setup lang="ts">
import { ref } from 'vue'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'

const open = ref(false)
</script>

<template>
  <B24Popover
    v-model:open="open"
    arrow
    :b24ui="{
      content: 'p-5 max-w-60 max-h-72 overflow-y-auto'
    }"
  >
    <B24Button label="Upload file" color="link" depth="dark" />

    <template #content>
      <div class="mb-2.5 flex flex-col gap-2.5">
        <div class="w-full flex flex-row flex-nowrap items-center justify-start gap-3">
          <div class="size-8xl rounded-xs border border-base-100 dark:border-white/20 flex flex-col items-center justify-center">
            <FileUploadIcon class="size-10 text-base-600" />
          </div>
          <div class="flex flex-col flex-nowrap gap-1">
            <div class="font-bold text-h5">
              start-ui.md
            </div>
            <div class="text-sm text-base-500 dark:text-base-600">
              650 bytes
            </div>
          </div>
        </div>
        <B24Separator />
        <div class="w-full">
          <B24Input autofocus placeholder="Add a comment" :rows="4" />
        </div>
      </div>

      <B24Separator />

      <div class="mt-2.5 flex flex-row gap-3">
        <B24Button
          rounded
          label="Send"
          color="primary"
          size="sm"
          @click="open = false"
        />
        <B24Button
          rounded
          label="Cancel"
          color="link"
          depth="dark"
          size="sm"
          @click="open = false"
        />
      </div>
    </template>
  </B24Popover>
</template>
