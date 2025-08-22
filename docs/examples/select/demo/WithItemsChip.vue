<script setup lang="ts">
import { ref } from 'vue'
import type { ChipProps } from '@bitrix24/b24ui-nuxt'

// @memo for demo ////
const chipItems = ref([
  {
    label: 'air-primary',
    value: 'air-primary',
    chip: {
      color: 'air-primary' as ChipProps['color']
    }
  },
  {
    label: 'air-primary-copilot',
    value: 'air-primary-copilot',
    chip: {
      color: 'air-primary-copilot' as ChipProps['color']
    }
  }
])
const chipValue = ref((chipItems.value[0]?.value))

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}
</script>

<template>
  <B24Select
    v-model="chipValue"
    :items="chipItems"
    name="color"
    class="w-full"
  >
    <template #leading="{ modelValue, b24ui }">
      <B24Chip
        v-if="modelValue"
        v-bind="getChip(modelValue as string)"
        inset
        standalone
        :size="b24ui.itemLeadingChipSize()"
        :class="b24ui.itemLeadingChip()"
      />
    </template>
  </B24Select>
</template>
