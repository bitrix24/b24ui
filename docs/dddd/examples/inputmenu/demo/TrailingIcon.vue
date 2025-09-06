<script setup lang="ts">
import { ref } from 'vue'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

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
    :trailing-icon="Expand1Icon"
    class="w-full"
  />
</template>
