<script setup lang="ts">
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'
import BatteryIcon from '@bitrix24/b24icons-vue/button/BatteryIcon'

const items = [
  {
    label: 'View',
    icon: OpenedEyeIcon,
    slot: 'view'
  },
  {
    label: 'Copy',
    icon: CopyPlatesIcon
  },
  {
    label: 'Edit',
    icon: PencilDrawIcon
  }
]
</script>

<template>
  <B24DropdownMenu
    :items="items"
    :b24ui="{ content: 'w-52' }"
  >
    <B24Button label="Open" color="link" depth="dark" :icon="MenuIcon" />

    <template #view-trailing>
      <BatteryIcon class="shrink-0 size-5 text-ai-500" />
    </template>
  </B24DropdownMenu>
</template>
