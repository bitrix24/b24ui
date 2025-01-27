<script setup lang="ts">
export interface ExampleProps {
  isRounded?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isRounded: true
})
</script>

<template>
  <B24Button
    label="Button"
    :rounded="isRounded"
  />
</template>
