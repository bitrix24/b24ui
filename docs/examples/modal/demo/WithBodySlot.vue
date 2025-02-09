<script setup lang="ts">
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
</script>

<template>
  <B24Modal
    title="File upload"
    :b24ui="{
      footer: 'border-t-0 mt-2.5 pt-0'
    }"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <div class="flex flex-col gap-4">
        <B24Separator />
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
          <B24Textarea autofocus placeholder="Add a comment" autoresize :rows="1" :maxrows="4" />
        </div>
      </div>
    </template>
    <template #footer>
      <B24ModalDialogClose>
        <B24Button rounded label="Send" color="primary" size="sm" />
      </B24ModalDialogClose>
      <B24ModalDialogClose>
        <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
      </B24ModalDialogClose>
    </template>
  </B24Modal>
</template>
