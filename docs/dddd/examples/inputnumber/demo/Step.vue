<script setup lang="ts">
export interface ExampleProps {
  step?: number
}

withDefaults(defineProps<ExampleProps>(), {
  step: 1
})
</script>

<template>
  <B24InputNumber
    :step="step"
    :default-value="24"
  />
</template>
