<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'default',
    value: 'default',
    chip: {
      color: 'default' as const
    }
  },
  {
    label: 'danger',
    value: 'danger',
    chip: {
      color: 'danger' as const
    }
  }
])
const value = ref()
</script>

<template>
  <B24InputMenu
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
  </B24InputMenu>
</template>
