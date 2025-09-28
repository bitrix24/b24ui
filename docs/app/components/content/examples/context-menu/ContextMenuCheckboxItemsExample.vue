<script setup lang="ts">
import type { ContextMenuItem } from '@bitrix24/b24ui-nuxt'

const showSidebar = ref(true)
const showToolbar = ref(false)

const items = computed<ContextMenuItem[]>(() => [{
  label: 'View',
  type: 'label' as const
}, {
  type: 'separator' as const
}, {
  label: 'Show Sidebar',
  type: 'checkbox' as const,
  checked: showSidebar.value,
  onUpdateChecked(checked: boolean) {
    showSidebar.value = checked
  },
  onSelect(e: Event) {
    e.preventDefault()
  }
}, {
  label: 'Show Toolbar',
  type: 'checkbox' as const,
  checked: showToolbar.value,
  onUpdateChecked(checked: boolean) {
    showToolbar.value = checked
  }
}, {
  label: 'Collapse Pinned Tabs',
  type: 'checkbox' as const,
  disabled: true
}])
</script>

<template>
  <B24ContextMenu :items="items" :ui="{ content: 'w-48' }">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-sm aspect-video w-72">
      Right click here
    </div>
  </B24ContextMenu>
</template>
