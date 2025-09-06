<script setup lang="ts">
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
  <B24Slideover
    :title="title"
    :description="description"
    :b24ui="{ footer: 'justify-between' }"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="size-full" />
    </template>
    <template #footer="{ close }">
      <div class="w-1/5 flex justify-start" />
      <div class="w-full flex flex-row justify-center gap-[10px]">
        <B24ModalDialogClose>
          <B24Button label="Send" color="air-primary" />
        </B24ModalDialogClose>
        <B24Button label="Cancel" color="air-tertiary" @click="close" />
      </div>
      <div class="w-1/5 flex justify-end">
        <B24Button label="Full version" size="sm" color="air-tertiary-no-accent" />
      </div>
    </template>
  </B24Slideover>
</template>
