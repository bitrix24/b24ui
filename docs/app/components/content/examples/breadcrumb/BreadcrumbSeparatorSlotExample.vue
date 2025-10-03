<script setup lang="ts">
import type { BreadcrumbItem } from '@bitrix24/b24ui-nuxt'

const items: BreadcrumbItem[] = [
  {
    label: 'Docs',
    to: '/docs'
  },
  {
    label: 'Components',
    to: '/docs/components'
  },
  {
    label: 'Breadcrumb',
    to: '/docs/components/breadcrumb'
  }
]
</script>

<template>
  <B24Breadcrumb :items="items">
    <template #separator>
      <span class="mx-2 text-(--b24ui-typography-legend-color)">/</span>
    </template>
  </B24Breadcrumb>
</template>
