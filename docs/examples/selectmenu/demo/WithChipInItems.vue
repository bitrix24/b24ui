<script setup lang="ts">
import { ref } from 'vue'
import type { ChipProps } from '@bitrix24/b24ui-nuxt'

const items = ref([
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
const value = ref(items.value[1])
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    class="w-full"
  >
    <template #leading="{ modelValue, b24ui }">
      <B24Chip
        v-if="modelValue"
        v-bind="modelValue.chip"
        inset
        standalone
        :size="b24ui.itemLeadingChipSize()"
        :class="b24ui.itemLeadingChip()"
      />
    </template>
  </B24SelectMenu>
</template>
