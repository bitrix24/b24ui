<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  max?: number
}

withDefaults(defineProps<ExampleProps>(), {
  max: 100
})

const value = ref(24)
</script>

<template>
  <B24Progress
    v-model="value"
    :max="max"
  />
</template>
