<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  isInverted?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isInverted: true
})

const value = ref(24)
</script>

<template>
  <B24Progress
    v-model="value"
    :inverted="isInverted"
  />
</template>
