<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const items = [
  {
    label: 'Icons',
    icon: IncertImageIcon,
    content: 'You have nothing to do.'
  },
  {
    label: 'Colors',
    icon: CalculatorIcon,
    slot: 'colors' as const,
    content: 'Choose a primary color from your Tailwind CSS theme.'
  },
  {
    label: 'Components',
    icon: RocketIcon,
    content: 'You can customize components by using the `class` / `b24ui` props.'
  }
] satisfies AccordionItem[]
</script>

<template>
  <B24Accordion :items="items">
    <template #colors="{ item }">
      <p class="pb-4 text-red-500">
        {{ item.content }}
      </p>
    </template>
  </B24Accordion>
</template>
