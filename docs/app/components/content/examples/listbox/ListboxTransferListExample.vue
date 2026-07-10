<script setup lang="ts">
import type { ListboxItem } from '@bitrix24/b24ui-nuxt'
import Location1Icon from '@bitrix24/b24icons-vue/main/Location1Icon'
import ChevronLeftLIcon from '@bitrix24/b24icons-vue/outline/ChevronLeftLIcon'
import ChevronRightLIcon from '@bitrix24/b24icons-vue/outline/ChevronRightLIcon'

const items: ListboxItem[] = [
  { label: 'France', icon: Location1Icon, value: 'FR' },
  { label: 'Germany', icon: Location1Icon, value: 'DE' },
  { label: 'Italy', icon: Location1Icon, value: 'IT' },
  { label: 'Spain', icon: Location1Icon, value: 'ES' },
  { label: 'Netherlands', icon: Location1Icon, value: 'NL' },
  { label: 'Poland', icon: Location1Icon, value: 'PL' },
  { label: 'Belgium', icon: Location1Icon, value: 'BE' },
  { label: 'Portugal', icon: Location1Icon, value: 'PT' }
]

const targetItems = ref<ListboxItem[]>([])
const sourceSelection = ref<ListboxItem[]>([])
const targetSelection = ref<ListboxItem[]>([])

const sourceItems = computed(() => items.filter(item => !targetItems.value.some(t => t.value === item.value)))

function transferSelected() {
  targetItems.value = [...targetItems.value, ...sourceSelection.value]
  sourceSelection.value = []
}

function removeSelected() {
  targetItems.value = targetItems.value.filter(item => !targetSelection.value.some(t => t.value === item.value))
  targetSelection.value = []
}
</script>

<template>
  <div class="flex items-stretch gap-4 w-full">
    <div class="flex flex-col flex-1 gap-1">
      <span class="text-sm font-medium text-highlighted">Available</span>

      <B24Listbox
        v-model="sourceSelection"
        :items="sourceItems"
        multiple
        filter
        class="size-full"
      />
    </div>

    <div class="flex flex-col items-center justify-center gap-1">
      <B24Button
        :icon="ChevronRightLIcon"
        :disabled="!sourceSelection.length"
        @click="transferSelected"
      />
      <B24Button
        :icon="ChevronLeftLIcon"
        :disabled="!targetSelection.length"
        @click="removeSelected"
      />
    </div>

    <div class="flex flex-col flex-1 gap-1">
      <span class="text-sm font-medium text-legend">Selected</span>

      <B24Listbox
        v-model="targetSelection"
        :items="targetItems"
        multiple
        filter
        class="size-full"
      />
    </div>
  </div>
</template>
