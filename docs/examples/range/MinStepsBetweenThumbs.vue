<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/MinStepsBetweenThumbs.vue'

const minStepsBetweenThumbs = ref(10)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="minStepsBetweenThumbs" class="w-28">
        <B24InputNumber v-model.number="minStepsBetweenThumbs" :min="0" :max="20" />
      </B24FormField>
    </template>
    <Demo :min-steps-between-thumbs="minStepsBetweenThumbs" />
  </ComponentShowExample>
</template>
