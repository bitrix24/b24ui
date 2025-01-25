<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/kbd'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Depth.vue'

const depths = Object.keys(theme.variants.depth)

const depth = ref('normal' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="depth" legend="depth" :items="depths" orientation="horizontal" />
    </template>
    <Demo :depth="depth" />
  </ComponentShowExample>
</template>
