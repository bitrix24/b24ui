<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Close.vue'
import { size, colorValue, title, description } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <div class="w-full flex flex-col flex-wrap items-center justify-center gap-2">
      <Demo
        :size="size"
        :color="colorValue"
        :title="title"
        :description="description"
      />
    </div>
  </ComponentShowExample>
</template>
