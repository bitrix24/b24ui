<script setup lang="ts">
export interface ExampleProps {
  title?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!'
})
</script>

<template>
  <B24Modal
    :title="title"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-40" />
    </template>
  </B24Modal>
</template>
