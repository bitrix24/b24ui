<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Form.vue'
import { colorValue, size } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <Demo :color="colorValue" :size="size" />
  </ComponentShowExample>
</template>
