<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import { useLocalStorage } from '@vueuse/core'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MailIcon from '@bitrix24/b24icons-vue/outline/MailIcon'
import ContactIcon from '@bitrix24/b24icons-vue/outline/ContactIcon'
import OpenChatIcon from '@bitrix24/b24icons-vue/outline/OpenChatIcon'

const open = useLocalStorage('sidebar-open', true)

defineShortcuts({
  o: () => open.value = !open.value
})

const items: NavigationMenuItem[] = [
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
  }
]
</script>

<template>
  <div class="flex flex-1">
    <B24Sidebar v-model:open="open" title="Navigation" collapsible="icon">
      <B24NavigationMenu
        :items="items"
        orientation="vertical"
        :b24ui="{ link: 'p-1.5 overflow-hidden' }"
      />
    </B24Sidebar>

    <div class="flex-1 flex flex-col">
      <div class="h-(--b24ui-header-height) shrink-0 flex items-center px-4 border-b border-default">
        <B24Button
          :icon="OpenChatIcon"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>

      <div class="flex-1 p-4">
        <Placeholder class="size-full" />
      </div>
    </div>
  </div>
</template>
