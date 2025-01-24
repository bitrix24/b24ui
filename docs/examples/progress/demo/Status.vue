<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  isStatus?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isStatus: true
})

const value = ref(24)
</script>

<template>
  <B24Progress
    v-model="value"
    :status="isStatus"
  />
</template>
