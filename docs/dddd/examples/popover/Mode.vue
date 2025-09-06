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
      <div class="w-full sm:w-1/4">
        <B24FormField label="mode">
          <B24Select v-model="mode" :items="modeList" class="w-full" />
        </B24FormField>
      </div>
    </template>
    <Demo :mode="mode" />
  </ComponentShowExample>
</template>
