<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import B24Icon from '@bitrix24/b24icons-vue/main/B24Icon'
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

const collapsed = ref(false)

defineShortcuts({
  c: () => collapsed.value = !collapsed.value
})
</script>

<template>
  <B24DashboardSidebar v-model:collapsed="collapsed" collapsible>
    <template #header>
      <Logo v-if="!collapsed" class="h-5 w-auto text-(--b24ui-typography-label-color)" />
      <B24Icon v-else class="size-10 text-[#2fc6f6] mx-auto" />
    </template>

    <B24NavigationMenu
      :collapsed="collapsed"
      :items="items"
      orientation="vertical"
    />
  </B24DashboardSidebar>
</template>
