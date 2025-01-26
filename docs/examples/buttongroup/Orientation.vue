<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/button-group'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Orientation.vue'

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('vertical' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="orientation" legend="orientation" :items="orientations" orientation="horizontal" />
    </template>
    <div class="flex flex-row flex-wrap items-center justify-between gap-5">
      <Demo :orientation="orientation" />
    </div>
  </ComponentShowExample>
</template>
