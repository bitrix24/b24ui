<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'

// `to` and `target` are not part of `DescriptionListItem`; the index signature
// carries them so the `#description` slot can read them back.
const items: DescriptionListItem[] = [
  {
    label: 'Documentation',
    description: 'Getting started guide',
    to: '/docs/getting-started'
  },
  {
    label: 'Product site',
    description: 'View on bitrix24.com',
    to: 'https://www.bitrix24.com/',
    target: '_blank'
  },
  {
    label: 'Created',
    description: 'Oct 6, 2024 08:37'
  }
]
</script>

<template>
  <B24DescriptionList :items="items" size="sm">
    <template #description="{ item }">
      <B24Link
        v-if="item.to"
        :to="item.to"
        :target="item.target"
      >
        {{ item.description }}
      </B24Link>
      <template v-else>
        {{ item.description }}
      </template>
    </template>
  </B24DescriptionList>
</template>
