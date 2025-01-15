<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'danger' as const
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'success' as const
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'primary' as const
    }
  }
])
const value = ref(items.value[0]?.value)

function getChip(value: string) {
  return items.value.find(item => item.value === value)?.chip
}
</script>

<template>
  <B24Select v-model="value" :items="items" class="w-48">
    <template #leading="{ modelValue, ui }">
      <B24Chip
        v-if="modelValue"
        v-bind="getChip(modelValue as string)"
        inset
        standalone
        :size="ui.itemLeadingChipSize()"
        :class="ui.itemLeadingChip()"
      />
    </template>
  </B24Select>
</template>
