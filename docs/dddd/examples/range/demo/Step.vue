<script setup lang="ts">
export interface ExampleProps {
  step?: number
}

withDefaults(defineProps<ExampleProps>(), {
  step: 10
})
</script>

<template>
  <B24Range
    :step="step"
    :default-value="50"
  />
</template>
