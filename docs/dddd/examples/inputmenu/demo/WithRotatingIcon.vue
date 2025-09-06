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
</script>

<template>
  <B24InputMenu
    v-model="value"
    :items="items"
    :b24ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
    class="w-full"
  />
</template>
