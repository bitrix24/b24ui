<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Arrow.vue'
import { contentAlign, contentSide, contentSideOffset } from './../dictionary'
</script>

<template>
  <ComponentShowExample>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo
        :content-align="contentAlign"
        :content-side="contentSide"
        :content-side-offset="contentSideOffset"
      />
    </div>
  </ComponentShowExample>
</template>
