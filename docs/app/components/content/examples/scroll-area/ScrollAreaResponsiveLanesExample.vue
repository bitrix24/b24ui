<script setup lang="ts">
import { useElementSize } from '@vueuse/core'

const items = Array.from({ length: 1000 }).map((_, index) => ({
  id: index,
  title: `Item ${index + 1}`,
  src: `https://placehold.co/640x480?text=${index}`,
  width: 640,
  height: 480
}))

const scrollArea = useTemplateRef('scrollArea')
const { width } = useElementSize(() => scrollArea.value?.$el)

const lanes = computed(() => Math.max(1, Math.min(4, Math.floor(width.value / 200))))
</script>

<template>
  <B24ScrollArea
    ref="scrollArea"
    v-slot="{ item }"
    :items="items"
    :virtualize="{
      lanes,
      estimateSize: 148,
      gap: 16
    }"
    class="w-full h-96 p-4 scrollbar-thin"
  >
    <img
      :src="item.src"
      :alt="item.title"
      :width="item.width"
      :height="item.height"
      loading="lazy"
      class="rounded-md size-full object-cover"
    >
  </B24ScrollArea>
</template>
