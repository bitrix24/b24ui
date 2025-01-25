<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  orientation?: any
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal'
})

const items = ref(['Payment', 'Delivery', 'Scripts'])
const value = ref('Delivery')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
    :orientation="orientation"
  />
</template>
