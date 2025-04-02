<script setup lang="ts">
export interface ExampleProps {
  isLoading?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isLoading: true
})
</script>

<template>
  <B24Textarea
    placeholder="Search..."
    :loading="isLoading"
    :rows="1"
    autoresize
  />
</template>
