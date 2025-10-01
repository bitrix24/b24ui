<script lang="ts" setup>
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/timeline'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

usePageMeta.setPageTitle('Timeline')

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)
const orientations = Object.keys(theme.variants.orientation)

const isUseBg = ref(true)

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
  <ExampleGrid v-once>
    <ExampleCard title="settings" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select v-model="color" :items="colors" placeholder="Color" />
        <B24Select v-model="size" :items="sizes" placeholder="Size" />
        <B24Select v-model="orientation" :items="orientations" placeholder="Orientation" />
        <B24Select v-model="value" :items="items.map(item => item.value)" placeholder="Value" />
        <B24Switch v-model="reverse" label="Reverse" />
      </div>
    </ExampleCard>
    <ExampleCard title="matrix" :use-bg="isUseBg" class="sm:col-span-3">
      <B24Separator class="my-3" type="dotted" />
      <B24Timeline
        v-model="value"
        :color="color"
        :orientation="orientation"
        :size="size"
        :items="items"
        :reverse="reverse"
        class="data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[400px] min-h-0"
      />
    </ExampleCard>
  </ExampleGrid>
</template>
