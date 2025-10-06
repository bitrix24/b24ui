<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

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
    <B24DashboardSidebar
      open
      :toggle="{
        color: 'primary',
        variant: 'subtle',
        class: 'rounded-full'
      }"
    >
      <template #header>
        <Logo class="h-5 w-auto" />
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
