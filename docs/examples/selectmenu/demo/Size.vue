<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md'
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
const value = ref({
  label: 'My company details',
  value: 'my_company_details'
})
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :size="size"
    :items="items"
    class="w-full"
  />
</template>
