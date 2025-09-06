<script setup lang="ts">
export interface ExampleProps {
  label?: string
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Button'
})
</script>

<template>
  <B24Button
    :label="label"
  />
</template>
