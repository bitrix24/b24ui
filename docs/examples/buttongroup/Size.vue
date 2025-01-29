<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/button-group'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'

const sizes = Object.keys(theme.variants.size)
const size = ref('sm' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="size" legend="size" :items="sizes" orientation="horizontal" />
    </template>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-5">
      <Demo :size="size" />
    </div>
  </ComponentShowExample>
</template>
