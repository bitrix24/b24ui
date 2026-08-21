<script setup lang="ts">
import type { SplitterItem } from '@bitrix24/b24ui-nuxt'

const panel = 'items-center justify-center text-description font-(--ui-font-weight-medium)'

const items: SplitterItem[] = [
  { slot: 'left', minSize: 20, defaultSize: 30, class: panel },
  { slot: 'right', defaultSize: 70, class: panel }
]
</script>

<template>
  <div class="w-full h-96">
    <B24Splitter
      id="splitter-custom-handle-example"
      :items="items"
      :b24ui="{ handle: 'data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-px bg-(--ui-color-divider-default) transition-colors data-[state=hover]:bg-(--ui-color-accent-main-primary) data-[state=drag]:bg-(--ui-color-accent-main-primary)' }"
      class="rounded-(--ui-border-radius-md) border border-(--ui-color-divider-default) overflow-hidden"
    >
      <template #left>
        Left
      </template>

      <template #right>
        Right
      </template>
    </B24Splitter>
  </div>
</template>
