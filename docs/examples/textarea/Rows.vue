<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Rows.vue'

const rows = ref(12)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="rows" class="w-28">
        <B24InputNumber v-model.number="rows" :min="1" :max="100" />
      </B24FormField>
    </template>
    <Demo :rows="rows" />
  </ComponentShowExample>
</template>
