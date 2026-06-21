<script setup lang="ts">
import type { TabsItem } from '@bitrix24/b24ui-nuxt'
import HomePageIcon from '@bitrix24/b24icons-vue/main/HomePageIcon'
import ActivityIcon from '@bitrix24/b24icons-vue/main/ActivityIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'

const items: TabsItem[] = [
  {
    label: 'Home',
    icon: HomePageIcon
  },
  {
    label: 'Activity',
    icon: ActivityIcon
  },
  {
    label: 'Settings',
    icon: SettingsIcon
  },
  {
    label: 'Profile',
    icon: UserIcon
  }
]
</script>

<template>
  <B24Tabs
    :items="items"
    :content="false"
    :b24ui="{
      list: 'justify-around w-full',
      trigger: 'grow flex-col gap-1 py-1',
      label: 'text-[10px]/3'
    }"
    class="w-full"
  />
</template>
