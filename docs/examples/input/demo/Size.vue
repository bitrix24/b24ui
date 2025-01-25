<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md'
})
</script>

<template>
  <B24Input
    :size="size"
    placeholder="Search..."
  />
</template>
