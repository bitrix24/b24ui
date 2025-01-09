<script setup lang="ts">
import theme from '#build/b24ui/alert'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'

usePageMeta.setPageTitle('Alert')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const actions = (color: string) => [
  {
    label: 'Action 1',
    color: color as any,
    depth: 'dark',
    click() {
      console.log('Action 1 clicked')
    }
  },
  {
    label: 'Action 2',
    color: color as any,
    depth: 'normal',
    click() {
      console.log('Action 2 clicked')
    }
  },
  {
    icon: DotsIcon,
    color: 'link',
    depth: 'light',
    click() {
      console.log('Action 3 clicked')
    }
  }
]

const data = {
  title: 'Heads up!',
  description: 'You can change the primary color in your app config.',
  icon: SignIcon,
  close: true
}
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base" class="sm:col-span-3">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Alert :title="data.title" />
      </div>
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-6">
          <B24Alert
            :title="data.title"
            :size="size"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :size="size"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :size="size"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :avatar="{ src: '/avatar/employee.png' }"
            :close="data.close"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <template v-for="color in colors" :key="color">
      <ExampleCard :title="color as string" class="sm:col-span-3">
        <ExampleCardSubTitle title="xs" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-6">
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            size="xs"
          />
          <B24Alert
            :title="data.title"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="actions(color)"
            size="xs"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="actions(color)"
            size="xs"
          />
        </div>
        <ExampleCardSubTitle title="md" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-6">
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
          />
          <B24Alert
            :title="data.title"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="actions(color)"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="actions(color)"
          />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
</template>
