<script setup lang="ts">
import theme from '#build/b24ui/chip'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import MessageChatWithPointIcon from '@bitrix24/b24icons-vue/main/MessageChatWithPointIcon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import TrendUpIcon from '@bitrix24/b24icons-vue/outline/TrendUpIcon'

usePageMeta.setPageTitle('Chip')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const positions = Object.keys(theme.variants.position) as Array<keyof typeof theme.variants.position>

const items = [
  {
    name: 'messages-0',
    icon: MailIcon,
    count: 0
  },
  {
    name: 'messages-1',
    icon: BellIcon,
    count: 1
  },
  {
    name: 'messages-2',
    icon: MessageChatWithPointIcon,
    count: 53
  },
  {
    name: 'notifications-3',
    icon: MailIcon,
    count: 100
  },
  {
    name: 'notifications-4',
    icon: BellIcon,
    count: 1000
  }
]

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
    <ExampleCard title="inset" class="sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Chip
            v-for="position in positions"
            :key="position"
            :position="position"
            :size="size"
            color="air-primary-success"
            inset
          >
            <B24Avatar
              src="/avatar/employee.png"
              :size="size"
              alt="Employee Name"
            />
          </B24Chip>
          <B24Chip
            :size="size"
            hide-zero
            inset
            color="air-primary"
            :text="'50'"
            :trailing-icon="TrendUpIcon"
          >
            <B24Avatar
              src="/avatar/employee.png"
              :size="size"
              alt="Employee Name"
            />
          </B24Chip>
          <B24Chip v-for="{ name, count } in items" :key="name" :text="count" :size="size" inset hide-zero>
            <B24Avatar src="/avatar/assistant.png" alt="Assistant Name" :size="size" />
          </B24Chip>
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="B24Button" class="sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Chip v-for="{ name, icon, count } in items" :key="name" :text="count" :size="size">
            <B24Button :icon="icon" color="air-secondary-no-accent" />
          </B24Chip>
        </div>
      </template>
    </ExampleCard>
    <template v-for="color in airColors" :key="color">
      <ExampleCard :title="color as string" class="sm:col-span-2">
        <template v-for="size in sizes" :key="size">
          <ExampleCardSubTitle :title="size as string" />
          <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
            <B24Chip
              :size="size"
              hide-zero
              :color="color"
            >
              <B24Button :icon="MailIcon" color="air-secondary-no-accent" />
            </B24Chip>
            <template v-for="position in positions" :key="position">
              <B24Chip
                v-for="{ name, count } in items"
                :key="name"
                :text="count"
                hide-zero
                :size="size"
                :position="position"
                :color="color"
              >
                <B24Button :icon="MailIcon" color="air-secondary-no-accent" />
              </B24Chip>
            </template>
          </div>
        </template>
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
          <ExampleCard :title="color as string" class="sm:col-span-2">
            <template v-for="size in sizes" :key="size">
              <ExampleCardSubTitle :title="size as string" />
              <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
                <B24Chip v-for="position in positions" :key="position" :position="position" :size="size" :color="color">
                  <B24Button :icon="MailIcon" color="air-secondary-no-accent" />
                </B24Chip>
              </div>
            </template>
          </ExampleCard>
        </template>
      </ExampleGrid>
    </template>
  </B24Collapsible>
</template>
