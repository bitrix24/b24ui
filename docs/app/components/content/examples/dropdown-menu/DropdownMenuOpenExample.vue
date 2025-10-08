<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import Settings3Icon from '@bitrix24/b24icons-vue/actions/Settings3Icon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const items: DropdownMenuItem[] = [
  {
    label: 'Profile',
    icon: UserIcon,
    slot: 'profile' as const
  }, {
    label: 'Billing',
    icon: PaymentIcon
  }, {
    label: 'Settings',
    icon: Settings3Icon
  }
]
</script>

<template>
  <B24DropdownMenu v-model:open="open" :items="items" :b24ui="{ content: 'w-[200px]', viewport: 'w-[200px]' }">
    <B24Button label="Open" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
