<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'CRM settings',
    id: 'settings'
  },
  {
    label: 'My company details',
    id: 'my_company_details'
  },
  {
    label: 'Access permissions',
    id: 'access_permissions'
  }
])
const value = ref('my_company_details')
</script>

<template>
  <B24Select
    v-model="value"
    value-key="id"
    :items="items"
    class="w-full"
  />
</template>
