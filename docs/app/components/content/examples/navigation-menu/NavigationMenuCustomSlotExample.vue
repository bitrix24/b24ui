<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

const items = [
  {
    label: 'Sales Pipeline',
    icon: ConnectionIcon
  },
  {
    label: 'Sales Analytics',
    badge: '+3'
  },
  {
    label: 'Resources'
  },
  {
    label: 'Support',
    icon: Info1Icon,
    slot: 'support' as const
  }
] satisfies NavigationMenuItem[]
</script>

<template>
  <B24NavigationMenu :items="items" class="w-full justify-center">
    <template #support-trailing>
      <B24Badge label="44" size="sm" />
    </template>
  </B24NavigationMenu>
</template>
