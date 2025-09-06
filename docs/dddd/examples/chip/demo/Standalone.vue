<script setup lang="ts">
export interface ExampleProps {
  isStandalone?: boolean
  isInset?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isStandalone: true,
  isInset: true
})
</script>

<template>
  <B24Chip
    :standalone="isStandalone"
    :inset="isInset"
  />
</template>
