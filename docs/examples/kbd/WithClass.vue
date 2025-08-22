<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithClass.vue'

const classValue = ref('text-ai-500 dark:text-orange-500 font-bold rounded-full')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="class" class="w-full sm:w-1/4">
        <B24Input v-model="classValue" />
      </B24FormField>
    </template>
    <Demo :class-value="classValue" />
  </ComponentShowExample>
</template>
