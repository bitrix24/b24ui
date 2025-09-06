<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Arrow.vue'
import { contentAlign, contentSide, contentSideOffset } from './../dictionary'
</script>

<template>
  <ComponentShowExample>
    <Demo
      :content-align="contentAlign"
      :content-side="contentSide"
      :content-side-offset="contentSideOffset"
    />
  </ComponentShowExample>
</template>
