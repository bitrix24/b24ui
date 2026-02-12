<script lang="ts" setup>
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/timeline'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)
const orientations = Object.keys(theme.variants.orientation)

const color = ref(theme.defaultVariants.color)
const size = ref(theme.defaultVariants.size)
const orientation = ref('vertical' as keyof typeof theme.variants.orientation)
const reverse = ref(false)

const items = [{
  date: 'Mar 15, 2025',
  title: 'Project Kickoff',
  description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
  icon: SignIcon,
  value: 'kickoff'
}, {
  date: 'Mar 22, 2025',
  title: 'Design Phase',
  description: 'User research and design workshops. Created wireframes and prototypes for user testing',
  icon: MoreMIcon,
  value: 'design'
}, {
  date: 'Mar 29, 2025',
  title: 'Development Sprint',
  description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
  icon: InfoIcon,
  value: 'development'
}, {
  date: 'Apr 5, 2025',
  title: 'Testing & Deployment',
  description: 'QA testing and performance optimization. Deployed the application to production.',
  icon: RocketIcon,
  value: 'deployment'
}] satisfies TimelineItem[]

const value = ref('design')
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'overflow-x-auto' }">
    <template #controls>
      <B24Select v-model="color" class="w-44" :items="colors" placeholder="Color" />
      <B24Select v-model="size" class="w-32" :items="sizes" placeholder="Size" />
      <B24Select v-model="orientation" class="w-44" :items="orientations" placeholder="Orientation" />
      <B24Select v-model="value" class="w-32" :items="items.map(item => item.value)" placeholder="Value" />
      <B24Switch v-model="reverse" label="Reverse" />
    </template>

    <B24Timeline
      v-model="value"
      :color="color"
      :orientation="orientation"
      :size="size"
      :items="items"
      :reverse="reverse"
      class="data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[400px] min-h-0"
    />
  </PlaygroundPage>
</template>
