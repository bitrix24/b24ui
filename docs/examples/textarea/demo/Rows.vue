<script setup lang="ts">
export interface ExampleProps {
  rows?: number
}

withDefaults(defineProps<ExampleProps>(), {
  rows: 3
})
</script>

<template>
  <B24Textarea
    :rows="rows"
    placeholder="Enter a company description"
  />
</template>
