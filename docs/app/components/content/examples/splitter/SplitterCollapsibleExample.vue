<script setup lang="ts">
import type { SplitterItem } from '@bitrix24/b24ui-nuxt'
import CloseChatIcon from '@bitrix24/b24icons-vue/outline/CloseChatIcon'
import OpenChatIcon from '@bitrix24/b24icons-vue/outline/OpenChatIcon'

const items: SplitterItem[] = [
  { slot: 'sidebar', sizeUnit: 'px', minSize: 150, defaultSize: 250, collapsible: true, collapsedSize: 48, class: 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md)' },
  { slot: 'main', class: 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)' }
]
</script>

<template>
  <div class="w-full h-96">
    <B24Splitter id="splitter-collapsible-example" :items="items">
      <template #sidebar="{ collapsed, collapse, expand }">
        <div class="flex-1 flex items-center justify-center p-2">
          <B24Button
            :icon="collapsed ? OpenChatIcon : CloseChatIcon"
            :label="collapsed ? undefined : 'Collapse'"
            :aria-label="collapsed ? 'Expand' : undefined"
            color="air-secondary"
            size="sm"
            @click="collapsed ? expand() : collapse()"
          />
        </div>
      </template>

      <template #main>
        Main
      </template>
    </B24Splitter>
  </div>
</template>
