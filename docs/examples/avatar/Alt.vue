<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/avatar'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Alt.vue'

const sizes = Object.keys(theme.variants.size)
const size = ref('xl' as const)

const alt = ref('Employee Name')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="alt" class="w-full sm:w-44">
        <B24Input v-model="alt" />
      </B24FormField>
      <B24FormField label="size" class="w-full sm:w-44">
        <B24Select v-model="size" :items="sizes" />
      </B24FormField>
    </template>
    <Demo :alt="alt" :size="size" />
  </ComponentShowExample>
</template>
