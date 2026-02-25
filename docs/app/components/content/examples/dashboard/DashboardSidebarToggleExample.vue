<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MailIcon from '@bitrix24/b24icons-vue/outline/MailIcon'
import ContactIcon from '@bitrix24/b24icons-vue/outline/ContactIcon'

const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: HomeIcon,
    active: true
  },
  {
    label: 'Inbox',
    icon: MailIcon
  },
  {
    label: 'Contacts',
    icon: ContactIcon
  }
]
</script>

<template>
  <B24DashboardGroup>
    <B24DashboardSidebar
      open
      :toggle="{
        color: 'air-primary',
        class: 'rounded-full'
      }"
      :menu="{
        side: 'left',
        inset: true
      }"
      :b24ui="{ overlay: 'bg-(--ui-color-bg-content-primary) base-mode' }"
    >
      <template #header>
        <Logo class="h-5 w-auto text-(--b24ui-typography-label-color)" />
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
