<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    type: 'label',
    label: 'Main'
  },
  {
    label: 'CRM settings',
    value: 'settings'
  },
  {
    label: 'My company details',
    value: 'my_company_details'
  },
  {
    type: 'separator'
  },
  {
    type: 'label',
    label: 'Access'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions',
    color: 'danger'
  }
])
const value = ref()
</script>

<template>
  <B24InputMenu
    v-model="value"
    :items="items"
    class="w-full"
  />
</template>
