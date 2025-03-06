<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/modal'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/OverlayBlur.vue'

const overlayBlurList = Object.keys(theme.variants.overlayBlur)
const overlayBlur = ref('auto' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="overlayBlur" legend="overlayBlur" :items="overlayBlurList" orientation="horizontal" />
    </template>
    <Demo :overlay-blur="overlayBlur" />
  </ComponentShowExample>
</template>
