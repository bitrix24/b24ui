<script setup lang="ts">
export interface ExampleProps {
  isTransition?: boolean
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  isTransition: true,
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Modal
    :transition="isTransition"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-40" />
    </template>
  </B24Modal>
</template>
