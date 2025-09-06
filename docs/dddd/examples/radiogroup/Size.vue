<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/radio-group'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'

const sizes = Object.keys(theme.variants.size)

const size = ref('lg' as const)

const variants = Object.keys(theme.variants.variant)
const variant = ref('list' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="size" legend="size" :items="sizes" orientation="horizontal" />
      <B24RadioGroup v-model="variant" legend="variant" :items="variants" orientation="horizontal" />
    </template>
    <Demo :size="size" :variant="variant" />
  </ComponentShowExample>
</template>
