<script setup lang="ts">
export interface ExampleProps {
  min?: number
  max?: number
}

withDefaults(defineProps<ExampleProps>(), {
  min: 3,
  max: 50
})
</script>

<template>
  <B24Range
    :min="min"
    :max="max"
    :default-value="50"
  />
</template>
