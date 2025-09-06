<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'CRM settings',
    description: 'Configure your CRM system.\n',
    id: 'settings'
  },
  {
    label: 'My company details',
    description: 'Access and update your company\'s information and profile.\n',
    id: 'my_company_details'
  },
  {
    label: 'Access permissions',
    description: 'Manage and configure user access levels and permissions within the system.',
    id: 'access_permissions'
  }
])
const value = ref('access_permissions')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    value-key="id"
    :items="items"
  />
</template>
