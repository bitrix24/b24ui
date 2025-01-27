<script setup lang="ts">
export interface ExampleProps {
  title?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!'
})
</script>

<template>
  <B24Alert
    :title="title"
  />
</template>
