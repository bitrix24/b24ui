<script setup lang="ts">
import theme from '#build/b24ui/tabs'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'
import Refresh5Icon from '@bitrix24/b24icons-vue/actions/Refresh5Icon'

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const attrs = reactive({
  size: [theme.defaultVariants.size]
})

const orientation = ref(orientations[0])

const itemsSimple = [
  { label: 'My Bitrix24' },
  { label: 'Start page' }
]
const items = [
  {
    label: 'General',
    avatar: { src: '/b24ui/demo/avatar/employee.png' },
    content: 'This is the content for General'
  },
  {
    label: 'Products',
    icon: Shining2Icon,
    content: 'This is the content for Products'
  },
  {
    label: 'Estimates',
    content: 'Use slot, this is the content for Estimates',
    slot: 'custom' as const,
    badge: 'badge'
  },
  {
    label: 'More',
    content: 'This is the content for More'
  }
]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="orientation" class="w-44" :items="orientations" placeholder="Orientation" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'grow-0', body: 'overflow-x-auto' }">
      <B24Tabs
        :items="itemsSimple"
        :content="false"
        v-bind="props"
        :orientation="orientation"
      />
      <B24Tabs
        :items="items"
        v-bind="props"
        :orientation="orientation"
      >
        <template #trailing="{ item }">
          <template v-if="item.label === 'More'">
            <ChevronDownIcon class="shrink-0 size-4" />
          </template>
        </template>
        <template #custom="{ item }">
          <span class="text-(--ui-color-accent-main-alert)">Custom: {{ item.content }}</span>
        </template>

        <template #list-trailing>
          <B24Button
            :size="props?.size"
            :icon="Refresh5Icon"
            color="air-secondary-accent-2"
            label="Some text"
            class="ml-2"
          />
        </template>
      </B24Tabs>
    </Matrix>
  </PlaygroundPage>
</template>
