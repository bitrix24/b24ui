<script setup lang="ts">
export interface ExampleProps {
  isDisabled?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true
})
</script>

<template>
  <B24Textarea
    :disabled="isDisabled"
    placeholder="Enter a company description"
  />
</template>
