<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'CRM settings',
    value: 'settings'
  },
  {
    label: 'My company details',
    value: 'my_company_details',
    color: 'ai'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
])
const value = ref(items.value[0])
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    class="w-full"
  />
</template>
