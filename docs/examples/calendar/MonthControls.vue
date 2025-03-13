<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/MonthControls.vue'

const monthControls = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="month-controls">
        <B24Switch v-model="monthControls" />
      </B24FormField>
    </template>
    <Demo :month-controls="monthControls" />
  </ComponentShowExample>
</template>
