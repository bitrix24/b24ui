<script setup lang="ts">
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'

const items = [
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
      color: 'danger' as const,
      icon: TrashBinIcon
    }
  ]
]
</script>

<template>
  <B24DropdownMenu
    :items="items"
  >
    <B24Button label="Open" color="link" depth="dark" use-dropdown />
  </B24DropdownMenu>
</template>
