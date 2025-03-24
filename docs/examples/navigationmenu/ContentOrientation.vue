<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/navigation-menu'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/ContentOrientation.vue'

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('vertical' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="orientation" legend="contentOrientation" :items="orientations" orientation="horizontal" />
    </template>
    <div class="relative px-2 py-3 bg-white dark:bg-base-900 rounded w-full overflow-auto">
      <Demo :content-orientation="orientation" />
    </div>
  </ComponentShowExample>
</template>
