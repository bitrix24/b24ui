<script setup lang="ts">
import { ref } from 'vue'
import CheckInBoxIcon from '@bitrix24/b24icons-vue/crm/CheckInBoxIcon'

const items = ref(['CRM settings', 'My company details', 'Access permissions'])
const value = ref('My company details')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :selected-icon="CheckInBoxIcon"
    class="w-full"
  />
</template>
