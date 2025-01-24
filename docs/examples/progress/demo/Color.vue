<script setup lang="ts">
export interface ExampleProps {
  color?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
})
</script>

<template>
  <B24Progress
    :color="color"
  />
</template>
