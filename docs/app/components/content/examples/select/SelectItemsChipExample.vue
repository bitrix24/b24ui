<script setup lang="ts">
import type { SelectItem, ChipProps } from '@bitrix24/b24ui-nuxt'

const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'air-primary-alert'
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'air-primary-success'
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'air-primary-copilot'
    }
  }
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)

function getChip(value: string) {
  return items.value.find(item => item.value === value)?.chip
}
</script>

<template>
  <B24Select v-model="value" :items="items" value-key="value" class="w-[192px]">
    <template #leading="{ modelValue, b24ui }">
      <B24Chip
        v-if="modelValue"
        v-bind="getChip(modelValue)"
        inset
        standalone
        :size="(b24ui.itemLeadingChipSize() as ChipProps['size'])"
        :class="b24ui.itemLeadingChip()"
      />
    </template>
  </B24Select>
</template>
