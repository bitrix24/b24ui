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
      <B24FormField label="min">
        <B24Input v-model.number="min" type="number" :min="0" :max="99" />
      </B24FormField>
      <B24FormField label="max">
        <B24Input v-model.number="max" type="number" :min="1" :max="100" />
      </B24FormField>
    </template>
    <Demo :min="min" :max="max" />
  </ComponentShowExample>
</template>
