<script setup lang="ts">
export interface ExampleProps {
  isLoading?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isLoading: true
})
</script>

<template>
  <B24Switch
    :loading="isLoading"
    label="Enable rich link previews"
    default-value
  />
</template>
