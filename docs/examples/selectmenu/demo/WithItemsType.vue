<script setup lang="ts">
import { ref } from 'vue'
import type { SelectMenuItem } from '@bitrix24/b24ui-nuxt'

const items = ref([
  {
    type: 'label',
    label: 'Main'
  },
  {
    label: 'CRM settings',
    value: 'settings'
  },
  {
    type: 'separator'
  },
  {
    label: 'My company details',
    value: 'my_company_details'
  },
  {
    type: 'label',
    label: 'Access'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions',
    color: 'danger'
  }
] satisfies SelectMenuItem[])

const value = ref(items.value[3])
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    class="w-full"
  />
</template>
