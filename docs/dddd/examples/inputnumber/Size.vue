<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/input-number'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'

const sizes = Object.keys(theme.variants.size)
const size = ref('md' as const)

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('horizontal' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="size" legend="size" :items="sizes" orientation="horizontal" />
      <B24RadioGroup v-model="orientation" legend="orientations" :items="orientations" orientation="horizontal" />
    </template>
    <Demo :size="size" :orientation="orientation" />
  </ComponentShowExample>
</template>
