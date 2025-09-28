<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items: AccordionItem[] = [
  {
    label: 'Getting started with Bitrix24',
    icon: SmartActivityIcon
  },
  {
    label: 'Main features of Bitrix24',
    icon: FeedbackIcon,
    slot: 'colors' as const
  },
  {
    label: 'Bitrix24 Cloud plans',
    icon: RocketIcon
  }
]
</script>

<template>
  <B24Accordion :items="items">
    <template #content="{ item }">
      <p class="pb-3.5 text-(length:--ui-font-size-sm) text-(--b24ui-typography-description-color)">
        This is the {{ item.label }} panel.
      </p>
    </template>
  </B24Accordion>
</template>
