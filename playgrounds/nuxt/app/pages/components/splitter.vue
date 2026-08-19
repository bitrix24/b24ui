<script setup lang="ts">
import type { SplitterItem } from '@bitrix24/b24ui-nuxt'

const card = 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-semi-bold)'

const items: SplitterItem[] = [
  { slot: 'a', minSize: 20, class: card },
  { slot: 'bc', minSize: 20 }
]

const nested: SplitterItem[] = [
  { slot: 'b', minSize: 20, class: card },
  { slot: 'c', minSize: 20, class: card }
]
</script>

<template>
  <Navbar />

  <div class="flex-1 w-full">
    <B24Splitter id="splitter" orientation="horizontal" :items="items">
      <template #a>
        Panel A
      </template>

      <template #bc>
        <B24Splitter id="splitter-nested" orientation="vertical" :items="nested">
          <template #b>
            Panel B
          </template>

          <template #c>
            Panel C
          </template>
        </B24Splitter>
      </template>
    </B24Splitter>
  </div>
</template>
