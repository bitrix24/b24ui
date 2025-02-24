<script setup lang="ts">
import { ref } from 'vue'
import CrmSearchIcon from '@bitrix24/b24icons-vue/crm/CrmSearchIcon'

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
</script>

<template>
  <B24InputMenu
    v-model="value"
    :items="items"
    :icon="CrmSearchIcon"
    class="w-full"
  />
</template>
