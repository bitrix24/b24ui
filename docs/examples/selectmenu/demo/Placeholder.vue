<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  placeholder?: string
}

withDefaults(defineProps<ExampleProps>(), {
  placeholder: 'You need to choose'
})

const items = ref([
  {
    label: 'CRM settings',
    value: 'settings'
  },
  {
    label: 'My company details',
    value: 'my_company_details'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
])
const value = ref({})
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    :placeholder="placeholder"
    class="w-full"
  />
</template>
