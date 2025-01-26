<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Content.vue'
import type { ExampleProps } from './demo/Content.vue'

const contentAlignVariants = ref(['start', 'center', 'end'])
const contentAlign = ref<ExampleProps['contentAlign']>('start')

const contentSideVariants = ref(['top', 'right', 'bottom', 'left'])
const contentSide = ref<ExampleProps['contentSide']>('right')

const contentSideOffset = ref(8)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="contentAlign" legend="content.align" :items="contentAlignVariants" orientation="horizontal" />
      <B24RadioGroup v-model="contentSide" legend="content.side" :items="contentSideVariants" orientation="horizontal" />
      <B24FormField label="content.sideOffset" class="w-20">
        <B24Input v-model.number="contentSideOffset" type="number" :min="0" size="md" />
      </B24FormField>
    </template>
    <div class="w-full sm:w-1/3">
      <Demo
        :content-align="contentAlign"
        :content-side="contentSide"
        :content-side-offset="contentSideOffset"
      />
    </div>
  </ComponentShowExample>
</template>
