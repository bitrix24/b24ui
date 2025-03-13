<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/NumberOfMonths.vue'

const numberOfMonths = ref(2)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="numberOfMonths" class="w-28">
        <B24InputNumber v-model.number="numberOfMonths" :min="1" :max="4" size="md" />
      </B24FormField>
    </template>
    <Demo :number-of-months="numberOfMonths" />
  </ComponentShowExample>
</template>
