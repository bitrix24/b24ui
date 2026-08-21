<script setup lang="ts">
import type { SplitterItem } from '@bitrix24/b24ui-nuxt'

const card = 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)'

const items: SplitterItem[] = [
  { slot: 'left', minSize: 20, class: card },
  { slot: 'right', minSize: 20 }
]

const nested: SplitterItem[] = [
  { slot: 'top', minSize: 20, class: card },
  { slot: 'bottom', minSize: 20, class: card }
]
</script>

<template>
  <div class="w-full h-96">
    <B24Splitter id="splitter-nested-example" :items="items">
      <template #left>
        Left
      </template>

      <template #right>
        <B24Splitter id="splitter-nested-example-inner" orientation="vertical" :items="nested">
          <template #top>
            Top
          </template>

          <template #bottom>
            Bottom
          </template>
        </B24Splitter>
      </template>
    </B24Splitter>
  </div>
</template>
