<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  placeholder?: string
}

withDefaults(defineProps<ExampleProps>(), {
  placeholder: 'You need to choose'
})

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :placeholder="placeholder"
    class="w-full"
  />
</template>
