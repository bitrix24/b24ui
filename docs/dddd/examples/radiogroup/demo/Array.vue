<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'CRM settings',
    description: 'Configure your CRM system.\n',
    value: 'settings'
  },
  {
    label: 'My company details',
    description: 'Access and update your company\'s information and profile.\n',
    value: 'my_company_details'
  },
  {
    label: 'Access permissions',
    description: 'Manage and configure user access levels and permissions within the system.',
    value: 'access_permissions'
  }
])
const value = ref('my_company_details')
</script>

<template>
  <B24RadioGroup
    v-model="value"
    :items="items"
  />
</template>
