<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import CloudDownloadIcon from '@bitrix24/b24icons-vue/outline/CloudDownloadIcon'
import ClockWithArrowIcon from '@bitrix24/b24icons-vue/main/ClockWithArrowIcon'
import Bookmark2Icon from '@bitrix24/b24icons-vue/outline/Bookmark2Icon'
import WindowScreenIcon from '@bitrix24/b24icons-vue/social/WindowScreenIcon'

const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)

const items = computed(() => [
  {
    label: 'Interface',
    icon: WindowScreenIcon,
    type: 'label' as const
  },
  {
    label: 'Show Bookmarks',
    icon: Bookmark2Icon,
    type: 'checkbox' as const,
    checked: showBookmarks.value,
    onUpdateChecked(checked: boolean) {
      showBookmarks.value = checked
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  },
  {
    label: 'Show History',
    icon: ClockWithArrowIcon,
    type: 'checkbox' as const,
    checked: showHistory.value,
    onUpdateChecked(checked: boolean) {
      showHistory.value = checked
    }
  },
  {
    type: 'separator' as const
  },
  {
    label: 'Show Downloads',
    icon: CloudDownloadIcon,
    type: 'checkbox' as const,
    checked: showDownloads.value,
    onUpdateChecked(checked: boolean) {
      showDownloads.value = checked
    }
  }
] satisfies DropdownMenuItem[])
</script>

<template>
  <B24DropdownMenu :items="items" :content="{ align: 'start' }" :ui="{ content: 'w-48' }">
    <B24Button label="Open" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
