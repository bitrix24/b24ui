<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Value.vue'

const value = ref('K')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="value" class="w-full sm:w-1/4">
        <B24Input v-model="value" />
      </B24FormField>
    </template>
    <Demo :value="value" />
  </ComponentShowExample>
</template>
