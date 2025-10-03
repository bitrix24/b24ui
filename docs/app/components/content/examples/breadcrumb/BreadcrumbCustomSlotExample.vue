<script setup lang="ts">
import type { BreadcrumbItem } from '@bitrix24/b24ui-nuxt'
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import ProductIcon from '@bitrix24/b24icons-vue/outline/ProductIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'

const items = [
  {
    label: 'Home',
    to: '/',
    icon: HomeIcon
  },
  {
    slot: 'dropdown' as const,
    icon: MoreLIcon,
    children: [
      {
        label: 'Documentation',
        to: '/docs'
      },
      {
        label: 'Themes'
      },
      {
        label: 'GitHub'
      }
    ]
  },
  {
    label: 'Components',
    to: '/docs/components',
    icon: ProductIcon
  },
  {
    label: 'Breadcrumb',
    to: '/docs/components/breadcrumb',
    icon: LinkIcon
  }
] satisfies BreadcrumbItem[]
</script>

<template>
  <B24Breadcrumb :items="items">
    <template #dropdown="{ item }">
      <B24DropdownMenu :items="item.children">
        <B24Button :icon="item.icon" color="air-tertiary-no-accent" class="p-0.5" />
      </B24DropdownMenu>
    </template>
  </B24Breadcrumb>
</template>
