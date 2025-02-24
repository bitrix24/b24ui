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
const value = ref(items.value[1])

const searchTerm = ref('Ac')
</script>

<template>
  <B24InputMenu
    v-model="value"
    v-model:search-term="searchTerm"
    :items="items"
    class="w-full"
  />
</template>
