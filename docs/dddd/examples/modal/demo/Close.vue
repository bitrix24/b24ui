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
    :close="{ color: 'air-primary-alert', size: 'lg', rounded: false }"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-40" />
    </template>
  </B24Modal>
</template>
