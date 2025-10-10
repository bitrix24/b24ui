<script setup lang="ts">
import type { InputMenuItem } from '@bitrix24/b24ui-nuxt'

const items: InputMenuItem[] = Array(1000).fill(0).map((_, i) => ({
  label: `item-${i}`,
  value: i
}))
</script>

<template>
  <B24InputMenu virtualize :items="items" class="w-[192px]" />
</template>
