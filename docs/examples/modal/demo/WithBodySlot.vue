<script setup lang="ts">
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'

export interface ExampleProps {
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Modal
    :title="title"
    :description="description"
    :b24ui="{ footer: 'border-t-0 mt-2.5 pt-0' }"
  >
    <B24Button label="Open" />

    <template #body>
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
    <template #footer>
      <div class="flex flex-row gap-[10px]">
        <B24ModalDialogClose>
          <B24Button label="Send" color="air-primary" />
        </B24ModalDialogClose>
        <B24ModalDialogClose>
          <B24Button label="Cancel" color="air-tertiary" />
        </B24ModalDialogClose>
      </div>
      <div>
        <B24Button label="Full version" size="sm" color="air-tertiary-no-accent" />
      </div>
    </template>
  </B24Modal>
</template>
