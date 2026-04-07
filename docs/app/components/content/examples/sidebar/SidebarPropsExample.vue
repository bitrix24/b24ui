<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from '@bitrix24/b24ui-nuxt'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MailIcon from '@bitrix24/b24icons-vue/outline/MailIcon'
import ContactIcon from '@bitrix24/b24icons-vue/outline/ContactIcon'

// @todo fix icons
// @todo fix colors

// Ignore the props for the example
defineProps<Pick<SidebarProps, 'variant' | 'collapsible' | 'side'>>()

const open = ref(true)

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
  <div
    class="flex flex-1"
    :class="[
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse'
    ]"
  >
    <B24Sidebar
      v-model:open="open"
      :variant="variant"
      :collapsible="collapsible"
      :side="side"
      :b24ui="{
        container: 'h-full'
      }"
    >
      <template #header>
        <div dd-name="i-logos-nuxt-icon" class="size-8" />
      </template>

      <B24NavigationMenu
        :items="items"
        orientation="vertical"
        :b24ui="{ link: 'p-1.5 overflow-hidden' }"
      />
    </B24Sidebar>

    <div class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default">
      <div
        class="h-(--b24ui-header-height) shrink-0 flex items-center px-4"
        :class="[
          variant !== 'floating' && 'border-b border-default',
          side === 'right' && 'justify-end'
        ]"
      >
        <!-- @todo i-lucide-panel-right -->
        <B24Button
          dd-icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
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
