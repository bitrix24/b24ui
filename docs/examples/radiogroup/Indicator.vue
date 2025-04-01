<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/radio-group'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Indicator.vue'

const indicators = Object.keys(theme.variants.indicator)
const indicator = ref('end' as const)

const variants = Object.keys(theme.variants.variant)
const variant = ref('card' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="indicator" legend="indicator" :items="indicators" orientation="horizontal" />
      <B24RadioGroup v-model="variant" legend="variant" :items="variants" orientation="horizontal" />
    </template>
    <Demo :indicator="indicator" :variant="variant" />
  </ComponentShowExample>
</template>
