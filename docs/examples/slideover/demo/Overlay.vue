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
  <B24Slideover
    :overlay="isOverlay"
    :title="title"
    :description="description"
    :b24ui="{ content: 'sm:top-[300px] sm:max-h-[calc(100%-300px)]' }"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="size-full" />
    </template>
  </B24Slideover>
</template>
