<script setup lang="ts">
import { ref } from 'vue'
import type { SelectItem } from '@bitrix24/b24ui-nuxt'

const items = ref([
  {
    type: 'label',
    label: 'CRM'
  },
  'CRM settings',
  'My company details',
  {
    type: 'separator'
  },
  'Access permissions',
  {
    type: 'label',
    label: 'Smart scripts'
  },
  'Scripts',
  'Create script',
  'Install from Bitrix24.Market'
] satisfies SelectItem[])

const value = ref(items.value[4])
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    class="w-full"
  />
</template>
