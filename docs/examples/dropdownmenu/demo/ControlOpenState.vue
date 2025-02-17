<script setup lang="ts">
import { ref } from 'vue'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
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
    v-model:open="open"
    :items="items"
    :b24ui="{ content: 'w-52' }"
  >
    <B24Button label="Open" color="link" depth="dark" :icon="MenuIcon" />
  </B24DropdownMenu>
</template>
