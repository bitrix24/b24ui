<script setup lang="ts">
import type { CommandPaletteItem } from '@bitrix24/b24ui-nuxt'

const items: CommandPaletteItem[] = Array(1000)
  .fill(0)
  .map((_, value) => ({
    label: `item-${value}`,
    value
  }))

const groups = [
  {
    id: 'items',
    items
  }
]
</script>

<template>
  <B24CommandPalette
    virtualize
    :fuse="{ resultLimit: 1000 }"
    :groups="groups"
    class="flex-1 h-[320px]"
  />
</template>
