<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Delay.vue'

const openDelay = ref<number>(500)
const closeDelay = ref<number>(300)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="openDelay" class="w-32">
        <B24InputNumber v-model.number="openDelay" :min="100" size="md" :step="50" />
      </B24FormField>
      <B24FormField label="closeDelay" class="w-32">
        <B24InputNumber v-model.number="closeDelay" :min="100" size="md" :step="50" />
      </B24FormField>
    </template>
    <Demo :open-delay="openDelay" :close-delay="closeDelay" />
  </ComponentShowExample>
</template>
