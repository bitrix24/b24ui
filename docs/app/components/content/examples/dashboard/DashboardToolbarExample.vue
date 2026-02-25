<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import Bell1Icon from '@bitrix24/b24icons-vue/main/Bell1Icon'
import OpenBookIcon from '@bitrix24/b24icons-vue/main/OpenBookIcon'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'General',
      icon: UserIcon,
      active: true
    },
    {
      label: 'Members',
      icon: UserGroupIcon
    },
    {
      label: 'Notifications',
      icon: Bell1Icon
    }
  ],
  [
    {
      label: 'Documentation',
      icon: OpenBookIcon,
      to: 'https://bitrix24.github.io/b24ui/',
      target: '_blank'
    },
    {
      label: 'Help & Feedback',
      icon: InfoCircleIcon,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    }
  ]
]
</script>

<template>
  <B24DashboardToolbar>
    <B24NavigationMenu :items="items" highlight class="flex-1" />
  </B24DashboardToolbar>
</template>
