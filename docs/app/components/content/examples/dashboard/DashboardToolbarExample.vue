<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

const items: NavigationMenuItem[][] = [[{
  label: 'General',
  ddDicon: 'i-lucide-user',
  active: true
}, {
  label: 'Members',
  ddDicon: 'i-lucide-users'
}, {
  label: 'Notifications',
  ddDicon: 'i-lucide-bell'
}], [{
  label: 'Documentation',
  ddDicon: 'i-lucide-book-open',
  to: 'https://ui.nuxt.com/docs',
  target: '_blank'
}, {
  label: 'Help & Feedback',
  ddDicon: 'i-lucide-help-circle',
  to: 'https://github.com/nuxt/ui/issues',
  target: '_blank'
}]]
</script>

<template>
  <B24DashboardToolbar>
    <B24NavigationMenu :items="items" highlight class="flex-1" />
  </B24DashboardToolbar>
</template>
