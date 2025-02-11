<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  orientation?: any
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal'
})

const value = ref(5)
</script>

<template>
  <B24InputNumber
    v-model="value"
    :orientation="orientation"
  />
</template>
