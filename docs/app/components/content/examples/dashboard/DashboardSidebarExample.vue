<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import B24Icon from '@bitrix24/b24icons-vue/main/B24Icon'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MailIcon from '@bitrix24/b24icons-vue/outline/MailIcon'
import ContactIcon from '@bitrix24/b24icons-vue/outline/ContactIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Home',
      icon: HomeIcon,
      active: true
    },
    {
      label: 'Inbox',
      icon: MailIcon,
      badge: '4'
    },
    {
      label: 'Contacts',
      icon: ContactIcon
    },
    {
      label: 'Settings',
      icon: SettingsIcon,
      defaultOpen: true,
      children: [
        {
          label: 'General'
        },
        {
          label: 'Members'
        },
        {
          label: 'Notifications'
        }
      ]
    }
  ],
  [
    {
      label: 'Feedback',
      icon: FeedbackIcon,
      to: 'https://github.com/bitrix24/b24ui/issues',
      target: '_blank'
    },
    {
      label: 'Help & Support',
      icon: InfoCircleIcon,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }
  ]
]
</script>

<template>
  <B24DashboardSidebar
    collapsible
    resizable
    :b24ui="{ footer: 'border-t border-(--ui-color-divider-default)' }"
  >
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto shrink-0 text-(--b24ui-typography-label-color)" />
      <B24Icon v-else class="size-10 text-[#2fc6f6] mx-auto" />
    </template>

    <template #default="{ collapsed }">
      <B24DashboardSearchButton
        :collapsed="collapsed"
        class="ms-4"
      />

      <B24NavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />

      <B24NavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
      />
    </template>

    <template #footer="{ collapsed }">
      <B24Button
        :avatar="{ src: 'https://github.com/bitrix24.png' }"
        :label="collapsed ? undefined : 'Bitrix24'"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </B24DashboardSidebar>
</template>
