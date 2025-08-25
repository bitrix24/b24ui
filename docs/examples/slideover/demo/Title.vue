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
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="size-full" />
    </template>
  </B24Slideover>
</template>
