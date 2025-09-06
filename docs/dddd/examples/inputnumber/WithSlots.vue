<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithSlots.vue'
</script>

<template>
  <ComponentShowExample>
    <div class="w-full sm:w-1/3">
      <Demo />
    </div>
  </ComponentShowExample>
</template>
