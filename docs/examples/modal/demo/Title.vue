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
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </B24Modal>
</template>
