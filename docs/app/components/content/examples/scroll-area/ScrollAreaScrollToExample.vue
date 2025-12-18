<script setup lang="ts">
const items = computed(() => Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`
})))

const scrollArea = useTemplateRef('scrollArea')

const targetIndex = ref(500)

function scrollToTop() {
  scrollArea.value?.virtualizer?.scrollToIndex(0, { align: 'start', behavior: 'smooth' })
}

function scrollToBottom() {
  scrollArea.value?.virtualizer?.scrollToIndex(items.value.length - 1, { align: 'end', behavior: 'smooth' })
}

function scrollToItem(index: number) {
  scrollArea.value?.virtualizer?.scrollToIndex(index - 1, { align: 'center', behavior: 'smooth' })
}
</script>

<template>
  <div class="w-full">
    <B24ScrollArea
      v-slot="{ item, index }"
      ref="scrollArea"
      :items="items"
      :virtualize="{ estimateSize: 72 }"
      class="h-96 w-full scrollbar-thin"
    >
      <B24PageCard
        v-bind="item"
        :variant="index % 2 === 0 ? 'filled' : 'outline'"
        class="rounded-none isolate"
        :class="[index === (targetIndex - 1) && 'bg-(--ui-color-accent-main-primary-alt-2)']"
      />
    </B24ScrollArea>

    <B24FieldGroup size="sm" class="px-4 py-3 border-t border-(--ui-color-design-tinted-na-stroke) w-full">
      <B24Button
        label="Top"
        @click="scrollToTop"
      />
      <B24Button
        label="Bottom"
        @click="scrollToBottom"
      />
      <B24Button
        :label="`Go to ${targetIndex || 500}`"
        @click="scrollToItem(targetIndex || 500)"
      />
    </B24FieldGroup>
  </div>
</template>
