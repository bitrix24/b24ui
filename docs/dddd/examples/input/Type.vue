<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Type.vue'

const types = [
  'text',
  'number',
  'password',
  'search',
  'file'
]

const type = ref('file' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="type" legend="type" :items="types" orientation="horizontal" />
    </template>
    <Demo :type="type" />
  </ComponentShowExample>
</template>
