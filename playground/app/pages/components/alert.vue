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

const action = (color: string) => [
  {
    icon: DotsIcon,
    color: color as any,
    depth: 'light' as const,
    onClick() {
      console.log('Action 3 clicked')
    }
  }
]

const multipleActions = (color: string) => [
  {
    label: 'Action',
    color: color as any,
    onClick() {
      console.log('Action clicked')
    }
  },
  {
    label: 'Another action',
    color: color as any,
    onClick() {
      console.log('Another action clicked')
    }
  },
  {
    label: 'One more action',
    color: color as any,
    onClick() {
      console.log('One more action clicked')
    }
  },
  {
    label: 'And one more',
    color: color as any,
    icon: SignIcon,
    onClick() {
      console.log('And one more clicked')
    }
  },
  {
    label: 'Last one',
    color: color as any,
    icon: DotsIcon,
    onClick() {
      console.log('Last one clicked')
    }
  }
]

const data = {
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let\'s assign a task to the manager on behalf of the manager.',
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
        <B24Alert :title="data.title" :icon="data.icon" description="example with multiple actions." :actions="multipleActions('default')" />
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
        <ExampleCardSubTitle title="sm" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-6">
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            size="sm"
          />
          <B24Alert
            :title="data.title"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="action(color)"
            size="sm"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="multipleActions(color)"
            size="sm"
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
            :actions="action(color)"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="multipleActions(color)"
          />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
</template>
