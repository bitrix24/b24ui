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

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24SelectMenu
    v-model="value"
    v-model:open="open"
    :items="items"
    class="w-full"
  />
</template>
