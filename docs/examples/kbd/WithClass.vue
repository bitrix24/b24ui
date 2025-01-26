<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/kbd'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithClass.vue'

const depths = Object.keys(theme.variants.depth)

const depth = ref('normal' as const)
const classValue = ref('text-ai-500 dark:text-orange-500 font-bold rounded-full')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="class" class="w-full sm:w-44">
        <B24Input v-model="classValue" />
      </B24FormField>
      <B24RadioGroup v-model="depth" legend="depth" :items="depths" orientation="horizontal" />
    </template>
    <Demo :class-value="classValue" :depth="depth" />
  </ComponentShowExample>
</template>
