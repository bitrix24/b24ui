<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  color?: any
  isHighlight?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  isHighlight: true
})

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('Access permissions')
</script>

<template>
  <B24Select
    v-model="value"
    :color="color"
    :highlight="isHighlight"
    :items="items"
    class="w-full"
  />
</template>
