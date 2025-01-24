<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    type: 'label',
    label: 'CRM'
  },
  'CRM settings',
  'My company details',
  'Access permissions',
  {
    type: 'separator'
  },
  {
    type: 'label',
    label: 'Smart scripts'
  },
  'Scripts',
  'Create script',
  'Install from Bitrix24.Market'
])
const value = ref('Access permissions')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
  />
</template>
