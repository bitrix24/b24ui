<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

defineProps<{
  mode: 'drawer' | 'slideover' | 'modal'
}>()

const items: NavigationMenuItem[] = [{
  label: 'Home',
  ddDicon: 'i-lucide-house',
  active: true
}, {
  label: 'Inbox',
  ddDicon: 'i-lucide-inbox'
}, {
  label: 'Contacts',
  ddDicon: 'i-lucide-users'
}]
</script>

<template>
  <B24DashboardGroup>
    <B24DashboardSidebar :mode="mode">
      <template #header="{ collapsed }">
        <Logo v-if="!collapsed" class="h-5 w-auto" />
        <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
      </template>

      <B24NavigationMenu
        :items="items"
        orientation="vertical"
      />
    </B24DashboardSidebar>

    <B24DashboardPanel>
      <template #header>
        <B24DashboardNavbar title="Dashboard" />
      </template>
    </B24DashboardPanel>
  </B24DashboardGroup>
</template>
