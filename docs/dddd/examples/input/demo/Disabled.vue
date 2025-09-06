<script setup lang="ts">
export interface ExampleProps {
  isDisabled?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true
})
</script>

<template>
  <B24Input
    placeholder="Search..."
    :disabled="isDisabled"
  />
</template>
