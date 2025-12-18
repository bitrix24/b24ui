<script setup lang="ts">
const items = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}))
</script>

<template>
  <B24ScrollArea
    v-slot="{ item, index }"
    :items="items"
    class="w-full h-96 scrollbar-thin"
  >
    <B24PageCard
      v-bind="item"
      :variant="index % 2 === 0 ? 'filled' : 'outline'"
      class="rounded-none"
    />
  </B24ScrollArea>
</template>
