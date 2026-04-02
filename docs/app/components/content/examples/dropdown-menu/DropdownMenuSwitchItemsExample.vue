<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import Bookmark2Icon from '@bitrix24/b24icons-vue/outline/Bookmark2Icon'
import ClockWithArrowIcon from '@bitrix24/b24icons-vue/main/ClockWithArrowIcon'
import CloudDownloadIcon from '@bitrix24/b24icons-vue/outline/CloudDownloadIcon'

const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)

const items = computed(() => [
  {
    label: 'Show Bookmarks',
    icon: Bookmark2Icon,
    slot: 'switch' as const,
    checked: showBookmarks.value,
    onSelect(e: Event) {
      e.preventDefault()
      showBookmarks.value = !showBookmarks.value
    }
  },
  {
    label: 'Show History',
    icon: ClockWithArrowIcon,
    slot: 'switch' as const,
    checked: showHistory.value,
    onSelect(e: Event) {
      e.preventDefault()
      showHistory.value = !showHistory.value
    }
  },
  {
    label: 'Show Downloads',
    icon: CloudDownloadIcon,
    slot: 'switch' as const,
    checked: showDownloads.value,
    onSelect(e: Event) {
      e.preventDefault()
      showDownloads.value = !showDownloads.value
    }
  }
] satisfies DropdownMenuItem[])
</script>

<template>
  <B24DropdownMenu :items="items" :content="{ align: 'start' }" :b24ui="{ content: 'w-48', viewport: 'w-48' }">
    <B24Button label="Open" :icon="HamburgerMenuIcon" />

    <template #switch-trailing="{ item }">
      <B24Switch :model-value="item.checked" tabindex="-1" />
    </template>
  </B24DropdownMenu>
</template>
