<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Step.vue'

const step = ref(10)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="step">
        <B24Input v-model.number="step" type="number" :min="0" :max="99" />
      </B24FormField>
    </template>
    <Demo :step="step" />
  </ComponentShowExample>
</template>
