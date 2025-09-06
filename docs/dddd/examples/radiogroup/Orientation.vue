<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/radio-group'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Orientation.vue'

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('horizontal' as const)

const variants = Object.keys(theme.variants.variant)
const variant = ref('list' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="orientation" legend="orientations" :items="orientations" orientation="horizontal" />
      <B24RadioGroup v-model="variant" legend="variant" :items="variants" orientation="horizontal" />
    </template>
    <Demo :orientation="orientation" :variant="variant" />
  </ComponentShowExample>
</template>
