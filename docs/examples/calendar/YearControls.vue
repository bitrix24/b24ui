<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/YearControls.vue'

const yearControls = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="year-controls">
        <B24Switch v-model="yearControls" />
      </B24FormField>
    </template>
    <Demo :year-controls="yearControls" />
  </ComponentShowExample>
</template>
