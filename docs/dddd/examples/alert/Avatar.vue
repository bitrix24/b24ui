<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Avatar.vue'
import { title, description } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <div class="w-full flex flex-col flex-wrap items-center justify-between gap-2">
      <Demo :title="title" :description="description" />
    </div>
  </ComponentShowExample>
</template>
