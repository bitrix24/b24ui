<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/navigation-menu'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Orientation.vue'

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('horizontal' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="orientation" legend="orientations" :items="orientations" orientation="horizontal" />
    </template>
    <div class="relative px-2 py-3 bg-white dark:bg-base-900 rounded w-full overflow-auto">
      <Demo :orientation="orientation" />
    </div>
  </ComponentShowExample>
</template>
