<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Content.vue'
import type { ExampleProps } from './demo/Content.vue'

const contentAlignVariants = ref(['start', 'center', 'end'])
const contentAlign = ref<ExampleProps['contentAlign']>('start')

const contentSideVariants = ref(['top', 'right', 'bottom', 'left'])
const contentSide = ref<ExampleProps['contentSide']>('left')

const contentSideOffset = ref(8)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="contentAlign" legend="content.align" :items="contentAlignVariants" orientation="horizontal" />
      <B24RadioGroup v-model="contentSide" legend="content.side" :items="contentSideVariants" orientation="horizontal" />
      <B24FormField label="content.sideOffset" class="w-28">
        <B24InputNumber v-model.number="contentSideOffset" :min="0" :max="200" />
      </B24FormField>
    </template>
    <Demo
      :content-align="contentAlign"
      :content-side="contentSide"
      :content-side-offset="contentSideOffset"
    />
  </ComponentShowExample>
</template>
