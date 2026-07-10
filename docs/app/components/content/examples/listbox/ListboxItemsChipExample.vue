<script setup lang="ts">
import type { ListboxItem } from '@bitrix24/b24ui-nuxt'

const items = ref<ListboxItem[]>([
  {
    label: 'bug',
    chip: {
      color: 'air-primary-alert'
    }
  },
  {
    label: 'feature',
    chip: {
      color: 'air-primary-success'
    }
  },
  {
    label: 'enhancement',
    chip: {
      color: 'air-primary'
    }
  }
])
</script>

<template>
  <B24Listbox :items="items" />
</template>
