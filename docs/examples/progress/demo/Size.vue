<script setup lang="ts">
export interface ExampleProps {
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md'
})
</script>

<template>
  <B24Progress
    :size="size"
  />
</template>
