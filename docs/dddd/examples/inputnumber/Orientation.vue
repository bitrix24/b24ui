<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/input-number'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Orientation.vue'

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('vertical' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="orientation" legend="orientations" :items="orientations" orientation="horizontal" />
    </template>
    <div class="w-full sm:w-1/3">
      <Demo :orientation="orientation" />
    </div>
  </ComponentShowExample>
</template>
