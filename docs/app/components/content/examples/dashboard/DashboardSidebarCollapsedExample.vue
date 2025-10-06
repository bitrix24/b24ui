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

const collapsed = ref(false)

defineShortcuts({
  c: () => collapsed.value = !collapsed.value
})
</script>

<template>
  <B24DashboardSidebar v-model:collapsed="collapsed" collapsible>
    <template #header>
      <Logo v-if="!collapsed" class="h-5 w-auto" />
      <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
    </template>

    <B24NavigationMenu
      :collapsed="collapsed"
      :items="items"
      orientation="vertical"
    />
  </B24DashboardSidebar>
</template>
