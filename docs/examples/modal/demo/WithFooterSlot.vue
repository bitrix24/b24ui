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
  <B24Modal
    :title="title"
    :description="description"
    :b24ui="{ footer: 'flex-row-reverse justify-start' }"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-40" />
    </template>
    <template #footer="{ close }">
      <B24Button
        label="Cancel"
        color="air-tertiary"
        @click="close"
      />
      <B24ModalDialogClose>
        <B24Button label="Send" color="air-primary" />
      </B24ModalDialogClose>
    </template>
  </B24Modal>
</template>
