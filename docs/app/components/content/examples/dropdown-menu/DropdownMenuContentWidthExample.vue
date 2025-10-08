<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'

const items: DropdownMenuItem[][] = [
  [
    {
      label: 'View',
      icon: OpenedEyeIcon
    },
    {
      label: 'Copy',
      icon: CopyPlatesIcon
    },
    {
      label: 'Edit',
      icon: PencilDrawIcon
    }
  ],
  [
    {
      label: 'Delete',
      color: 'air-primary-alert' as const,
      icon: TrashBinIcon
    }
  ]
]
</script>

<template>
  <B24DropdownMenu :items="items" :b24ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)', viewport: 'w-(--reka-dropdown-menu-trigger-width)' }">
    <B24Button
      label="Open"
      class="w-46"
      block
      :icon="HamburgerMenuIcon"
    />
  </B24DropdownMenu>
</template>
