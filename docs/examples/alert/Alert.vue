<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Alert.vue'
import { title } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <Demo :title="title" />
  </ComponentShowExample>
</template>
