<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['CRM settings', 'My company details', 'Access permissions', 'CRM Payment', 'CRM.Delivery', 'Scripts', 'Create script', 'Install from Bitrix24.Market'])
const value = ref(['CRM Payment', 'My company details'])
</script>

<template>
  <B24Select
    v-model="value"
    multiple
    :items="items"
  />
</template>
