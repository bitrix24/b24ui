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

const open = ref(true)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24DashboardSidebar v-model:open="open">
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto" />
      <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
    </template>

    <B24NavigationMenu
      :items="items"
      orientation="vertical"
    />
  </B24DashboardSidebar>
</template>
