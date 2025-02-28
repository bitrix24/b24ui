<script setup lang="ts">
export interface ExampleProps {
  title?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!'
})
</script>

<template>
  <B24Slideover
    :title="title"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full" />
    </template>
  </B24Slideover>
</template>
