<script setup lang="ts">
import { shallowRef } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const items = shallowRef<AccordionItem[]>([
  {
    label: 'Icons',
    icon: IncertImageIcon,
    content: 'You have nothing to do.'
  },
  {
    label: 'Colors',
    icon: CalculatorIcon,
    content: 'Choose a primary color from your Tailwind CSS theme.'
  },
  {
    label: 'Components',
    icon: RocketIcon,
    content: 'You can customize components by using the `class` / `b24ui` props.'
  }
])

const accordion = useTemplateRef<HTMLElement>('accordion')

useSortable(
  accordion,
  items,
  {
    animation: 150
  }
)
</script>

<template>
  <B24Accordion ref="accordion" :items="items" />
</template>
