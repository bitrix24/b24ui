<script setup lang="ts">
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

const items: TimelineItem[] = [{
  date: 'Mar 15, 2025',
  title: 'Project Kickoff',
  icon: RocketIcon,
  value: 'kickoff'
}, {
  date: 'Mar 22, 2025',
  title: 'Design Phase',
  icon: SignIcon,
  value: 'design'
}, {
  date: 'Mar 29, 2025',
  title: 'Development Sprint',
  icon: MoreMIcon,
  value: 'development'
}, {
  date: 'Apr 5, 2025',
  title: 'Testing & Deployment',
  icon: InfoIcon,
  value: 'deployment'
}]
</script>

<template>
  <B24Timeline
    :items="items"
    :default-value="2"
    :b24ui="{ item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2rem)] even:text-right' }"
    class="translate-x-[calc(50%-1rem)]"
  />
</template>
