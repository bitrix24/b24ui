<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const items: AccordionItem[] = [
  {
    label: 'Icons',
    icon: IncertImageIcon
  },
  {
    label: 'Colors',
    icon: CalculatorIcon
  },
  {
    label: 'Components',
    icon: RocketIcon
  }
]
</script>

<template>
  <B24Accordion :items="items">
    <template #content="{ item }">
      <p class="pb-4 text-base-700 dark:text-base-300">
        This is the {{ item.label }} panel.
      </p>
    </template>
  </B24Accordion>
</template>
