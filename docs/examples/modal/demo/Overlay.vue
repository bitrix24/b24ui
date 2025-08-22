<script setup lang="ts">
export interface ExampleProps {
  isOverlay?: boolean
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  isOverlay: true,
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Modal
    :overlay="isOverlay"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-40" />
    </template>
  </B24Modal>
</template>
