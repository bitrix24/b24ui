<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items = [
  {
    label: 'Getting started with Bitrix24',
    icon: SmartActivityIcon,
    content: 'Bitrix24 is an online service that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
  },
  {
    label: 'Main features of Bitrix24',
    icon: FeedbackIcon,
    slot: 'colors' as const,
    content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
  },
  {
    label: 'Bitrix24 Cloud plans',
    icon: RocketIcon,
    content: 'Bitrix24 is an online service for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
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
