<script setup lang="ts">
import type { ContextMenuItem } from '@bitrix24/b24ui-nuxt'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'

const items: ContextMenuItem[][] = [
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
  <B24ContextMenu :items="items">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(--b24ui-typography-legend-color) text-(length:--ui-font-size-sm) bg-(--ui-color-bg-content-primary) aspect-video w-72">
      Right click here
    </div>
  </B24ContextMenu>
</template>
