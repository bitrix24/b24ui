<script setup lang="ts">
import type { DropdownMenuProps } from '@bitrix24/b24ui-nuxt'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'

export interface ExampleProps {
  size?: DropdownMenuProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})

const items = [
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
]
</script>

<template>
  <B24DropdownMenu
    :size="size"
    :items="items"
  >
    <B24Button label="Open" color="link" depth="dark" :icon="MenuIcon" />
  </B24DropdownMenu>
</template>
