<script setup lang="ts">
import type { ProgressGroupItem } from '@bitrix24/b24ui-nuxt'

const items: ProgressGroupItem[] = [
  { label: 'System', value: 24, color: 'air-secondary' },
  { label: 'Apps', value: 8, color: 'air-primary-alert' },
  { label: 'Documents', value: 12, color: 'air-primary-warning' },
  { label: 'Multimedia', value: 42, color: 'air-primary-success' }
]
</script>

<template>
  <B24ProgressGroup :items="items" :max="128" class="w-96">
    <template #item-label="{ item }">
      <span class="font-(--ui-font-weight-medium)">{{ item.label }}</span>
    </template>

    <template #item-trailing="{ item }">
      {{ item.value }}GB
    </template>
  </B24ProgressGroup>
</template>
