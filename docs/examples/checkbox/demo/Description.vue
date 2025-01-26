<script setup lang="ts">
export interface ExampleProps {
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  description: 'Broadcast posting is allowed in Feed. These posts will be visible to everyone.'
})
</script>

<template>
  <B24Checkbox
    label="All employees can post to Feed"
    :description="description"
  />
</template>
