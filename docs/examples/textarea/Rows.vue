<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Rows.vue'

const rows = ref(12)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="rows">
        <B24Input v-model.number="rows" type="number" :min="1" :max="1000" />
      </B24FormField>
    </template>
    <Demo :rows="rows" />
  </ComponentShowExample>
</template>
