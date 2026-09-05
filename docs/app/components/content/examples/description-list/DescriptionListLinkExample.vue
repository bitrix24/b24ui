<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'

const items: DescriptionListItem[] = [
  {
    label: 'Documentation',
    description: 'Getting started guide',
    to: '/docs/getting-started'
  },
  {
    label: 'External profile',
    description: 'View on partner portal',
    to: 'https://bitrix24.com',
    target: '_blank'
  },
  {
    label: 'Created',
    description: 'Oct 6, 2024 08:37'
  }
]
</script>

<template>
  <B24DescriptionList :items="items" size="sm" />
</template>
