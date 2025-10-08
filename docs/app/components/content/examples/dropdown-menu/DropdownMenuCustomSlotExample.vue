<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import PaymentIcon from '@bitrix24/b24icons-vue/outline/PaymentIcon'
import Settings3Icon from '@bitrix24/b24icons-vue/actions/Settings3Icon'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import CloudWithCheckIcon from '@bitrix24/b24icons-vue/outline/CloudWithCheckIcon'

const items = [
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
] satisfies DropdownMenuItem[]
</script>

<template>
  <B24DropdownMenu :items="items" :ui="{ content: 'w-48' }">
    <B24Button label="Open" :icon="HamburgerMenuIcon" />

    <template #profile-trailing>
      <CloudWithCheckIcon class="shrink-0 size-5 text-(--ui-color-accent-main-primary)" />
    </template>
  </B24DropdownMenu>
</template>
