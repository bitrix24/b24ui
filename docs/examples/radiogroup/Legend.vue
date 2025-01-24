<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Legend.vue'

const legend = ref('You need to choose')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="legend" class="w-1/2">
        <B24Input v-model="legend" type="search" />
      </B24FormField>
    </template>
    <Demo :legend="legend" />
  </ComponentShowExample>
</template>
