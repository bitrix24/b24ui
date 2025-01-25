<script setup lang="ts">
export interface ExampleProps {
  isLoading?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isLoading: true
})
</script>

<template>
  <B24Input
    placeholder="Search..."
    :loading="isLoading"
  />
</template>
