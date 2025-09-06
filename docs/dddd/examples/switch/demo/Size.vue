<script setup lang="ts">
export interface ExampleProps {
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md'
})
</script>

<template>
  <B24Switch
    :size="size"
    label="Enable rich link previews"
    default-value
  />
</template>
