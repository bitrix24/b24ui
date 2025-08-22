<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/alert'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

usePageMeta.setPageTitle('Alert')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const action = () => [
  {
    icon: MoreMIcon,
    color: 'air-secondary-no-accent' as ButtonProps['color'],
    onClick() {
      console.log('Action 3 clicked')
    }
  }
]

const multipleActions = () => [
  {
    label: 'Action',
    color: 'air-primary' as ButtonProps['color'],
    onClick() {
      console.log('Action clicked')
    }
  },
  {
    label: 'Another action',
    color: 'air-primary-success' as ButtonProps['color'],
    onClick() {
      console.log('Another action clicked')
    }
  },
  {
    label: 'One more action',
    color: 'air-secondary-accent-1' as ButtonProps['color'],
    onClick() {
      console.log('One more action clicked')
    }
  },
  {
    label: 'And one more',
    color: 'air-secondary' as ButtonProps['color'],
    icon: SignIcon,
    onClick() {
      console.log('And one more clicked')
    }
  },
  {
    label: 'Last one',
    color: 'air-secondary-no-accent' as ButtonProps['color'],
    icon: MoreMIcon,
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

const oldColors = computed(() => {
  return colors.filter((color) => {
    return !color.includes('air')
  })
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="base" class="col-span-4">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Alert :title="data.title" />
        <B24Alert :title="data.title" :icon="data.icon" description="example with multiple actions." :actions="multipleActions()" />
        <B24Alert class="style-filled" :title="data.title" />
        <B24Alert class="edge-dark style-filled-success" :title="data.title" :icon="data.icon" description="example with multiple actions." :actions="multipleActions()" />
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
            :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
            :close="data.close"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>

  <ExampleGrid v-once class="mb-2">
    <template v-for="color in airColors" :key="color">
      <ExampleCard :title="color as string" class="col-span-4">
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
            :actions="action()"
            orientation="horizontal"
            size="sm"
            inverted
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
            :close="data.close"
            :color="color"
            :actions="multipleActions()"
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
            :actions="action()"
            orientation="horizontal"
          />
          <B24Alert
            :title="data.title"
            :description="data.description"
            :icon="data.icon"
            :close="data.close"
            :color="color"
            :actions="multipleActions()"
            inverted
          />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>

  <B24Collapsible class="mb-2">
    <B24Button
      color="air-secondary-no-accent"
      label="Deprecate"
      use-dropdown
    />

    <template #content>
      <ExampleGrid v-once class="mb-2">
        <template v-for="color in oldColors" :key="color">
          <ExampleCard :title="color as string" class="col-span-4">
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
                :actions="action()"
                orientation="horizontal"
                size="sm"
              />
              <B24Alert
                :title="data.title"
                :description="data.description"
                :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
                :close="data.close"
                :color="color"
                :actions="multipleActions()"
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
                :actions="action()"
                orientation="horizontal"
              />
              <B24Alert
                :title="data.title"
                :description="data.description"
                :icon="data.icon"
                :close="data.close"
                :color="color"
                :actions="multipleActions()"
              />
            </div>
          </ExampleCard>
        </template>
      </ExampleGrid>
    </template>
  </B24Collapsible>
</template>
