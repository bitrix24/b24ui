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
    value: 'access_permissions'
  }
])
const value = ref()
</script>

<template>
  <B24InputMenu
    v-model="value"
    :items="items"
    arrow
    class="w-full"
  />
</template>
