<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  size?: any
  variant?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md',
  variant: 'list'
})

const items = ref(['Payment', 'Delivery', 'Scripts'])
const value = ref('Delivery')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
    :size="size"
    :variant="variant"
  />
</template>
