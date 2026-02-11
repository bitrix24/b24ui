<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import type { UseSortableOptions } from '@vueuse/integrations/useSortable'
import { useSortable } from '@vueuse/integrations/useSortable'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items = shallowRef<AccordionItem[]>([
  {
    label: 'Getting started with Bitrix24',
    icon: SmartActivityIcon,
    content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
  },
  {
    label: 'Main features of Bitrix24',
    icon: FeedbackIcon,
    content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
  },
  {
    label: 'Bitrix24 Cloud plans',
    icon: RocketIcon,
    content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
  }
])

const accordion = useTemplateRef<HTMLElement>('accordion')

useSortable(accordion, items, {
  animation: 150
} as UseSortableOptions)
</script>

<template>
  <B24Accordion ref="accordion" :items="items" />
</template>
