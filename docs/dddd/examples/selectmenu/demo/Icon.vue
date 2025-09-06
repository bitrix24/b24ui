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
const value = ref({
  label: 'My company details',
  value: 'my_company_details'
})
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    :icon="CrmSearchIcon"
    class="w-full"
  />
</template>
