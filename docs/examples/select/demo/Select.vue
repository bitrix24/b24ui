<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['CRM settings', 'My company details', 'Access permissions', 'CRM Payment', 'CRM.Delivery', 'Scripts', 'Create script', 'Install from Bitrix24.Market'])
const value = ref('CRM Payment')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    class="w-3/4"
  />
  <B24Separator class="my-3 w-3/4" label="fix height" type="dotted" />
  <B24Select
    :items="items"
    default-value="My company details"
    class="w-full"
    :b24ui="{ content: 'max-h-60' }"
  />
</template>
