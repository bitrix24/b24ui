<script setup lang="ts">
import type { ContextMenuItem } from '@bitrix24/b24ui-nuxt'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

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
  <B24ContextMenu :items="items" :ui="{ content: 'w-[192px]' }">
    <div class="flex items-center justify-center rounded-md border border-dashed border-(--ui-color-design-outline-na-stroke) text-(length:--ui-font-size-sm) aspect-video w-72">
      Right click here
    </div>

    <template #refresh-label>
      {{ loading ? 'Refreshing...' : 'Refresh the Page' }}
    </template>

    <template #refresh-trailing>
      <SpinnerIcon v-if="loading" class="shrink-0 size-5 text-(--ui-color-accent-main-primary) animate-spin" />
    </template>
  </B24ContextMenu>
</template>
