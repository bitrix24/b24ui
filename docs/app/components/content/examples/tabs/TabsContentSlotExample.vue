<script setup lang="ts">
import type { TabsItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Shield2ContourIcon from '@bitrix24/b24icons-vue/main/Shield2ContourIcon'

const items: TabsItem[] = [
  {
    label: 'Account',
    icon: UserIcon
  },
  {
    label: 'Password',
    icon: Shield2ContourIcon
  }
]
</script>

<template>
  <B24Tabs :items="items" class="w-full">
    <template #content="{ item }">
      <p>This is the {{ item.label }} tab.</p>
    </template>
  </B24Tabs>
</template>
