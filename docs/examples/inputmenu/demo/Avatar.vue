<script setup lang="ts">
import { ref } from 'vue'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

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
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
    class="w-full"
  />
  <B24InputMenu
    v-model="value"
    :items="items"
    :avatar="{ icon: Bitrix24Icon }"
    class="w-full"
  />
</template>
