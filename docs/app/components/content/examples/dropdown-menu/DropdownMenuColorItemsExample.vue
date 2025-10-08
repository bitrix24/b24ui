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
  <B24DropdownMenu :items="items" :ui="{ content: 'w-48' }">
    <B24Button label="Open" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
