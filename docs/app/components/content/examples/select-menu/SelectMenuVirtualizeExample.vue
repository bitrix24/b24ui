<script setup lang="ts">
import type { SelectMenuItem } from '@bitrix24/b24ui-nuxt'

const items: SelectMenuItem[] = Array(1000).fill(0).map((_, i) => ({
  label: `item-${i}`,
  value: i
}))
</script>

<template>
  <B24SelectMenu virtualize :items="items" class="w-[192px]" />
</template>
