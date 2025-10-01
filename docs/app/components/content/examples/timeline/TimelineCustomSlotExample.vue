<script setup lang="ts">
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

const items = [{
  date: 'Mar 15, 2025',
  title: 'Project Kickoff',
  subtitle: 'Project Initiation',
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
  value: 'development',
  slot: 'development' as const,
  developers: [
    {
      src: 'https://github.com/bitrix-tools.png'
    }, {
      src: 'https://github.com/bitrix24.png'
    }
  ]
}, {
  date: 'Apr 5, 2025',
  title: 'Testing & Deployment',
  description: 'QA testing and performance optimization. Deployed the application to production.',
  icon: InfoIcon,
  value: 'deployment'
}] satisfies TimelineItem[]
</script>

<template>
  <B24Timeline :items="items" :default-value="2" class="w-[384px]">
    <template #development-title="{ item }">
      <div class="flex items-center gap-1">
        <span>{{ item.title }}</span>

        <B24AvatarGroup size="2xs">
          <B24Avatar v-for="(developer, index) of item.developers" :key="index" v-bind="developer" />
        </B24AvatarGroup>
      </div>
    </template>
  </B24Timeline>
</template>
