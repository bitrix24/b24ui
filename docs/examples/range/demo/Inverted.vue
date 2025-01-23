<script setup lang="ts">
export interface ExampleProps {
  isInverted?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isInverted: true
})
</script>

<template>
  <B24Range
    :inverted="isInverted"
    :default-value="24"
  />
</template>
