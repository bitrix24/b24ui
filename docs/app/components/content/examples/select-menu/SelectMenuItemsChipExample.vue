<script setup lang="ts">
import type { SelectMenuItem, ChipProps } from '@bitrix24/b24ui-nuxt'

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
] satisfies SelectMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <B24SelectMenu v-model="value" :items="items" class="w-[192px]">
    <template #leading="{ modelValue, b24ui }">
      <B24Chip
        v-if="modelValue"
        v-bind="modelValue.chip"
        inset
        standalone
        :size="(b24ui.itemLeadingChipSize() as ChipProps['size'])"
        :class="b24ui.itemLeadingChip()"
      />
    </template>
  </B24SelectMenu>
</template>
