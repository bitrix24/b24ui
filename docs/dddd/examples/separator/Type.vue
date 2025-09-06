<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/separator'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Type.vue'

const types = Object.keys(theme.variants.type)
const type = ref('dashed' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="type" legend="type" :items="types" orientation="horizontal" />
    </template>
    <div class="bg-white dark:bg-base-900 rounded w-full h-[70px] p-2 flex flex-col items-center justify-center gap-5">
      <Demo :type="type" />
    </div>
  </ComponentShowExample>
</template>
