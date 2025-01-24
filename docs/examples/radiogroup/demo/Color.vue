<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  color: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
})

const items = ref(['Payment', 'Delivery', 'Scripts'])
const value = ref('Delivery')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
    :color="color"
  />
</template>
