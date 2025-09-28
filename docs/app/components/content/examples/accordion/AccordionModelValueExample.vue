<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import SmartActivityIcon from '@bitrix24/b24icons-vue/outline/SmartActivityIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const items: AccordionItem[] = [
  {
    label: 'Getting started with Bitrix24',
    icon: SmartActivityIcon,
    content: 'Bitrix24 is an online service that offers useful tools for your company.'
  },
  {
    label: 'Main features of Bitrix24',
    icon: FeedbackIcon,
    content: 'Bitrix24 is an online service that has all the tools for company operation and business management.'
  },
  {
    label: 'Bitrix24 Cloud plans',
    icon: RocketIcon,
    content: 'Bitrix24 is an online service for business management and work automation.'
  }
]

const active = ref('0')

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % items.length)
  }, 2000)
})
</script>

<template>
  <B24Accordion v-model="active" :items="items" />
</template>
