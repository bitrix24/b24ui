<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/tabs'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'

const variants = Object.keys(theme.variants.variant)
const variant = ref('link' as const)

const sizes = Object.keys(theme.variants.size)

const size = ref('md' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="size" legend="size" :items="sizes" orientation="horizontal" />
      <B24RadioGroup v-model="variant" legend="variant" :items="variants" orientation="horizontal" />
    </template>
    <Demo :variant="variant" :size="size" />
  </ComponentShowExample>
</template>
