<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

const items: NavigationMenuItem[][] = [[{
  label: 'Home',
  ddDicon: 'i-lucide-house',
  active: true
}, {
  label: 'Inbox',
  ddDicon: 'i-lucide-inbox',
  badge: '4'
}, {
  label: 'Contacts',
  ddDicon: 'i-lucide-users'
}, {
  label: 'Settings',
  ddDicon: 'i-lucide-settings',
  defaultOpen: true,
  children: [{
    label: 'General'
  }, {
    label: 'Members'
  }, {
    label: 'Notifications'
  }]
}], [{
  label: 'Feedback',
  ddDicon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}, {
  label: 'Help & Support',
  ddDicon: 'i-lucide-info',
  to: 'https://github.com/nuxt/ui',
  target: '_blank'
}]]
</script>

<template>
  <B24DashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto shrink-0" />
      <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
    </template>

    <template #default="{ collapsed }">
      <B24Button
        :label="collapsed ? undefined : 'Search...'"
        data-icon="i-lucide-search"
        data-color="neutral"
        block
        :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <B24Kbd value="meta" variant="subtle" />
            <B24Kbd value="K" variant="subtle" />
          </div>
        </template>
      </B24Button>

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
        :avatar="{
          src: 'https://github.com/benjamincanac.png'
        }"
        :label="collapsed ? undefined : 'Benjamin'"
        data-color="neutral"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </B24DashboardSidebar>
</template>
