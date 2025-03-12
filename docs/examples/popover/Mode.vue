<script setup lang="ts">
import { ref } from 'vue'
import type { PopoverProps } from '@bitrix24/b24ui-nuxt'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Mode.vue'

const modeList = ['click', 'hover'] as PopoverProps['mode'][]
const mode = ref('hover' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="mode" legend="mode" :items="modeList" orientation="horizontal" />
    </template>
    <Demo :mode="mode" />
  </ComponentShowExample>
</template>
