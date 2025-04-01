<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  color?: any
  variant?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  variant: 'list'
})

const items = ref(['Payment', 'Delivery', 'Scripts'])
const value = ref('Delivery')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
    :color="color"
    :variant="variant"
  />
</template>
