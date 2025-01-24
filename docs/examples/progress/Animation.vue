<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/progress'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Animation.vue'

const animations = Object.keys(theme.variants.animation)

const animation = ref('swing' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="animation" legend="animation" :items="animations" orientation="horizontal" />
    </template>
    <Demo :animation="animation" />
  </ComponentShowExample>
</template>
