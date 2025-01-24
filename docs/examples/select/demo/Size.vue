<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md'
})

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('Access permissions')
</script>

<template>
  <B24Select
    v-model="value"
    :size="size"
    :items="items"
  />
</template>
