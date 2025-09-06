<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/FixedWeeks.vue'

const fixedWeeks = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="fixed-weeks">
        <B24Switch v-model="fixedWeeks" />
      </B24FormField>
    </template>
    <Demo :fixed-weeks="fixedWeeks" />
  </ComponentShowExample>
</template>
