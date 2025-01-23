<script setup lang="ts">
export interface ExampleProps {
  isDisabled?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true
})
</script>

<template>
  <B24Switch
    :disabled="isDisabled"
    label="Enable rich link previews"
    default-value
  />
</template>
