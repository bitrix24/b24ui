<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

export interface ExampleProps {
  isDisabled?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true
})

const items = ref<AccordionItem[]>([
  {
    label: 'Icons',
    icon: IncertImageIcon,
    content: 'You have nothing to do.'
  },
  {
    label: 'Colors',
    icon: CalculatorIcon,
    content: 'Choose a primary color from your Tailwind CSS theme.',
    disabled: true
  },
  {
    label: 'Components',
    icon: RocketIcon,
    content: 'You can customize components by using the `class` / `b24ui` props.'
  }
])
</script>

<template>
  <B24Accordion
    :items="items"
    :disabled="isDisabled"
  />
</template>
