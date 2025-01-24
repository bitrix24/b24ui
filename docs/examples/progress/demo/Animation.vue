<script setup lang="ts">
export interface ExampleProps {
  animation?: any
}

withDefaults(defineProps<ExampleProps>(), {
  animation: 'swing'
})
</script>

<template>
  <B24Progress
    :animation="animation"
  />
</template>
