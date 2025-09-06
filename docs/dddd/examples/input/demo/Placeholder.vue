<script setup lang="ts">
export interface ExampleProps {
  placeholder?: string
}

withDefaults(defineProps<ExampleProps>(), {
  placeholder: 'Search...'
})
</script>

<template>
  <B24Input
    :placeholder="placeholder"
  />
</template>
