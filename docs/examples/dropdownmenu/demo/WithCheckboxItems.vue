<script setup lang="ts">
import { ref, computed } from 'vue'
import MenuIcon from '@bitrix24/b24icons-vue/main/MenuIcon'
import PencilDrawIcon from '@bitrix24/b24icons-vue/actions/PencilDrawIcon'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import OpenedEyeIcon from '@bitrix24/b24icons-vue/main/OpenedEyeIcon'

const showCopy = ref(true)
const showEdit = ref(false)

const items = computed(() => [
  {
    label: 'View',
    icon: OpenedEyeIcon,
    type: 'label' as const
  },
  {
    type: 'separator' as const
  },
  {
    label: 'Copy',
    icon: CopyPlatesIcon,
    type: 'checkbox' as const,
    checked: showCopy.value,
    onUpdateChecked(checked: boolean) {
      showCopy.value = checked
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  },
  {
    label: 'Edit',
    icon: PencilDrawIcon,
    type: 'checkbox' as const,
    checked: showEdit.value,
    onUpdateChecked(checked: boolean) {
      showEdit.value = checked
    }
  }
])
</script>

<template>
  <B24DropdownMenu
    :items="items"
  >
    <B24Button label="Open" color="link" depth="dark" :icon="MenuIcon" />
  </B24DropdownMenu>
</template>
