<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/progress'
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
    <div class="h-48 w-full flex flex-col items-center justify-center">
      <Demo :orientation="orientation" />
    </div>
  </ComponentShowExample>
</template>
