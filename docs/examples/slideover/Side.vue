<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/slideover'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Side.vue'

const sides = Object.keys(theme.variants.side)

const side = ref('left' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="side" legend="side" :items="sides" orientation="horizontal" />
    </template>
    <Demo :side="side" />
  </ComponentShowExample>
</template>
