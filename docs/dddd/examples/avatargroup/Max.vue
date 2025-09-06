<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Max.vue'

const max = ref(2)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="max" class="w-28">
        <B24InputNumber v-model.number="max" :min="1" :max="3" size="md" />
      </B24FormField>
    </template>
    <Demo :max="max" />
  </ComponentShowExample>
</template>
