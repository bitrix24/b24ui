<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/progress'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'

const sizes = Object.keys(theme.variants.size)

const size = ref('lg' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="size" legend="sizes" :items="sizes" orientation="horizontal" />
    </template>
    <Demo :size="size" />
  </ComponentShowExample>
</template>
