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

const open = ref(false)
</script>

<template>
  <B24InputMenu
    v-model="value"
    v-model:open="open"
    :items="items"
    class="w-full"
    @focus="open = true"
  />
</template>
