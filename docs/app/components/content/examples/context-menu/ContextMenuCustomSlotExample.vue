<script setup lang="ts">
import type { ContextMenuItem } from '@bitrix24/b24ui-nuxt'

const loading = ref(true)

const items = [
  {
    label: 'Refresh the Page',
    slot: 'refresh' as const
  },
  {
    label: 'Clear Cookies and Refresh'
  },
  {
    label: 'Clear Cache and Refresh'
  }
] satisfies ContextMenuItem[]
</script>

<template>
  <B24ContextMenu :items="items" :ui="{ content: 'w-48' }">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-sm aspect-video w-72">
      Right click here
    </div>

    <template #refresh-label>
      {{ loading ? 'Refreshing...' : 'Refresh the Page' }}
    </template>

    <template #refresh-trailing>
      <UIcon v-if="loading" name="i-lucide-loader-circle" class="shrink-0 size-5 text-primary animate-spin" />
    </template>
  </B24ContextMenu>
</template>
