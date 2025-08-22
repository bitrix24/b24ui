<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/LoadingAuto.vue'
import { colorValue, size } from './dictionary.js'
</script>

<template>
  <ComponentShowExample>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo :color="colorValue" :size="size" />
    </div>
  </ComponentShowExample>
</template>
