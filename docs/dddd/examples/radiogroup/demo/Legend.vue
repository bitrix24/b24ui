<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  legend?: string
}

withDefaults(defineProps<ExampleProps>(), {
  legend: 'You need to choose'
})

const items = ref(['Payment', 'Delivery', 'Scripts'])
const value = ref('Delivery')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
    :legend="legend"
  />
</template>
