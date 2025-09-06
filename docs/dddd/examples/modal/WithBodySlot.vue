<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithBodySlot.vue'
import { title, description } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <Demo :title="title" :description="description" />
  </ComponentShowExample>
</template>
