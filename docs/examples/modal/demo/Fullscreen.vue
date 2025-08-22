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
    fullscreen
    :title="title"
    :description="description"
    :b24ui="{ body: 'max-h-[calc(100vh-90px)]' }"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-[3000px]" />
    </template>
  </B24Modal>
</template>
