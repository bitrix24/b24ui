<script setup lang="ts">
import type { TabsItem } from '@bitrix24/b24ui-nuxt'

const items: TabsItem[] = [{
  label: 'All',
  value: 'all'
}, {
  label: 'Unread',
  value: 'unread'
}]
</script>

<template>
  <B24DashboardNavbar title="Inbox">
    <template #leading>
      <B24DashboardSidebarCollapse />
    </template>

    <template #trailing>
      <B24Badge label="4" variant="subtle" />
    </template>

    <template #right>
      <B24Tabs
        :items="items"
        default-value="all"
        size="sm"
        class="w-40"
        :content="false"
      />
    </template>
  </B24DashboardNavbar>
</template>
