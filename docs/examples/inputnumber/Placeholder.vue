<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Placeholder.vue'

const placeholder = ref('Enter a number')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="placeholder" class="w-full sm:w-1/4">
        <B24Input v-model="placeholder" />
      </B24FormField>
    </template>
    <Demo :placeholder="placeholder" />
  </ComponentShowExample>
</template>
