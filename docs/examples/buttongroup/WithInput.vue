<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithInput.vue'
</script>

<template>
  <ComponentShowExample>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo />
    </div>
  </ComponentShowExample>
</template>
