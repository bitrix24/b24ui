<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Max.vue'

const max = ref(48)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="max" class="w-full sm:w-1/4">
        <B24Input v-model.number="max" type="number" :min="1" :max="200" />
      </B24FormField>
    </template>
    <Demo :max="max" />
  </ComponentShowExample>
</template>
