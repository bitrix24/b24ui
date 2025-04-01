<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  indicator?: any
  variant?: any
}

withDefaults(defineProps<ExampleProps>(), {
  indicator: 'start',
  variant: 'list'
})

const items = ref(['Payment', 'Delivery', 'Scripts'])
const value = ref('Delivery')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
    :indicator="indicator"
    :variant="variant"
  />
</template>
