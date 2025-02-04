<script setup lang="ts">
import { ref } from 'vue'

const chipItems = ref([
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
