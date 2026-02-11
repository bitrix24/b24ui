<script setup lang="ts">
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

const items: TimelineItem[] = [{
  date: 'Mar 15, 2025',
  title: 'Project Kickoff',
  description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
  icon: RocketIcon,
  value: 'kickoff'
}, {
  date: 'Mar 22, 2025',
  title: 'Design Phase',
  description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
  icon: SignIcon,
  value: 'design'
}, {
  date: 'Mar 29, 2025',
  title: 'Development Sprint',
  description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
  icon: MoreMIcon,
  value: 'development'
}, {
  date: 'Apr 5, 2025',
  title: 'Testing & Deployment',
  description: 'QA testing and performance optimization. Deployed the application to production.',
  icon: InfoIcon,
  value: 'deployment'
}]

const active = ref<string | number>('kickoff')

function onSelect(_e: Event, item: TimelineItem) {
  if (item.value) {
    active.value = item.value
  }
}
</script>

<template>
  <B24Timeline
    v-model="active"
    :items="items"
    class="w-[384px]"
    @select="onSelect"
  />
</template>
