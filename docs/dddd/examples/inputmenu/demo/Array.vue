<script setup lang="ts">
import { ref } from 'vue'

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
    value: 'access_permissions',
    color: 'danger'
  }
])
const value = ref(items.value[1])
</script>

<template>
  <B24InputMenu
    v-model="value"
    :items="items"
  />
</template>
