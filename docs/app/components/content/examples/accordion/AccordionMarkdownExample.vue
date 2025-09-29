<script setup lang="ts">
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items = [
  {
    label: 'Getting started with Bitrix24',
    icon: SmartActivityIcon,
    content: 'Bitrix24 is an **online service** that offers useful tools for your company. This includes chats and calls, tasks and projects, CRM, and AI-powered assistant.'
  },
  {
    label: 'Main features of Bitrix24',
    icon: FeedbackIcon,
    content: '[Bitrix24](https://www.bitrix24.com/) is an online service that has all the tools for company operation and business management.'
  },
  {
    label: 'Bitrix24 Cloud plans',
    icon: RocketIcon,
    content: 'Bitrix24 is an `online service` for business management and work automation. It contains tools for companies of all sizes and industries. Bitrix24 has several plans with different sets of tools that are suitable for different types of business.'
  }
]
</script>

<template>
  <B24Accordion
    type="multiple"
    :items="items"
    :unmount-on-hide="false"
    :default-value="['3']"
    :ui="{
      trigger: 'text-base',
      body: 'text-base text-(--b24ui-typography-description-color)'
    }"
  >
    <template #body="{ item }">
      <MDC :value="item.content" unwrap="p" />
    </template>
  </B24Accordion>
</template>
