<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'
import MoreVerticalLIcon from '@bitrix24/b24icons-vue/outline/MoreVerticalLIcon'
import ColumnsIcon from '@bitrix24/b24icons-vue/outline/ColumnsIcon'
import AppsIcon from '@bitrix24/b24icons-vue/outline/AppsIcon'

usePageMeta.setPageTitle('ScrollArea')

const isUseBg = ref(true)

const virtualize = ref(true)
const orientation = ref<'vertical' | 'horizontal'>('vertical')
const estimateSize = ref(480)
const gap = ref(16)
const lanes = ref(6)

const heights = [320, 480, 640, 800]

// Pseudo-random height selection with longer cycle to avoid alignment patterns
function getHeight(index: number) {
  const seed = (index * 11 + 7) % 17
  return heights[seed % heights.length]!
}

const items = computed(() => {
  return Array.from({ length: 1000 }, (_, index) => {
    const height = getHeight(index)
    return {
      id: index,
      title: `Item ${index + 1}`,
      src: `https://placehold.co/640x${height}?text=${index}`,
      width: 640,
      height
    }
  })
})

const virtualizeOptions = computed(() => {
  if (!virtualize.value) {
    return false
  }
  return {
    estimateSize: estimateSize.value,
    gap: gap.value,
    lanes: lanes.value
  }
})
</script>

<template>
  <B24PageGrid v-once class="lg:grid-cols-4 gap-5">
    <B24Card variant="outline">
      <template #header>
        <div class="flex flex-row items-center justify-between gap-2">
          <ProseH5 class="mb-0">
            Options
          </ProseH5>
          <B24Switch v-model="isUseBg" label="isUseBg" size="xs" />
        </div>
      </template>
      <div class="mb-4 flex flex-col gap-4">
        <B24Switch v-model="virtualize" label="Virtualize" reverse />
        <B24FieldGroup>
          <B24Button
            active-color="air-primary"
            :active="orientation === 'vertical'"
            :icon="MoreVerticalLIcon"
            @click="orientation = 'vertical'"
          />
          <B24Button
            active-color="air-primary"
            :active="orientation === 'horizontal'"
            :icon="MoreLIcon"
            @click="orientation = 'horizontal'"
          />
        </B24FieldGroup>
        <template v-if="virtualize">
          <B24FormField label="gap">
            <B24InputNumber
              v-model="gap"
              :min="0"
              :icon="ColumnsIcon"
              :max="48"
            />
          </B24FormField>

          <B24FormField label="lanes">
            <B24InputNumber
              v-model="lanes"
              :min="1"
              :icon="AppsIcon"
              :max="10"
            />
          </B24FormField>
        </template>
      </div>
    </B24Card>

    <B24Card
      :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'"
      class="lg:col-span-3"
    >
      <template #header>
        <ProseH5 class="mb-0">
          Demo
        </ProseH5>
      </template>
      <B24ScrollArea
        v-slot="{ item }"
        :items="items"
        :orientation="orientation"
        :virtualize="virtualizeOptions"
        class="w-full h-[400px] p-4 scrollbar-thin"
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
    </B24Card>
  </B24PageGrid>
</template>
