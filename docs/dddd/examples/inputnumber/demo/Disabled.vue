<script setup lang="ts">
export interface ExampleProps {
  isDisabled?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true
})
</script>

<template>
  <B24InputNumber
    :disabled="isDisabled"
    placeholder="Enter a number"
  />
</template>
