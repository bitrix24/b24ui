<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/MinMax.vue'

const min = ref(3)
const max = ref(50)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="min" class="w-28">
        <B24InputNumber v-model.number="min" :min="0" :max="99" />
      </B24FormField>
      <B24FormField label="max" class="w-28">
        <B24InputNumber v-model.number="max" :min="1" :max="100" />
      </B24FormField>
    </template>
    <Demo :min="min" :max="max" />
  </ComponentShowExample>
</template>
