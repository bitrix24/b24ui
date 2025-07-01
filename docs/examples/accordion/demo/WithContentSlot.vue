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
    icon: FeedbackIcon
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
      <p class="pb-4 text-base-700 dark:text-base-300">
        This is the <ProseCode>{{ item.label }}</ProseCode> panel.
      </p>
    </template>
  </B24Accordion>
</template>
