<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  isDisabled?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true
})

const items = ref(['Payment', 'Delivery', 'Scripts'])
const value = ref('Delivery')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
    :disabled="isDisabled"
  />
</template>
