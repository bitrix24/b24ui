<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Value.vue'

const value = ref('K')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="value" class="w-1/2">
        <B24Input v-model="value" type="search" />
      </B24FormField>
    </template>
    <Demo :value="value" />
  </ComponentShowExample>
</template>
