<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Avatar.vue'
</script>

<template>
  <ComponentShowExample>
    <div class="bg-white dark:bg-base-900 rounded w-full h-[140px] px-2 flex flex-col items-center justify-center gap-8">
      <Demo />
    </div>
  </ComponentShowExample>
</template>
