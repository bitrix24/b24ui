<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  ['CRM settings', 'My company details', 'Access permissions', 'CRM Payment', 'CRM.Delivery'],
  ['Scripts', 'Create script', 'Install from Bitrix24.Market']
])
const value = ref()
</script>

<template>
  <B24InputMenu
    v-model="value"
    :items="items"
  />
</template>
