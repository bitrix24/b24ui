<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/SidebarLayout.vue'
</script>

<template>
  <ComponentShowExample>
    <div class="demo w-full border-1 border-base-500 border-dashed"><Demo /></div>
  </ComponentShowExample>
</template>

<style scoped>
/* This is for demonstration purposes only */
.demo > div {
  background: var(--air-theme-background);
}
</style>
