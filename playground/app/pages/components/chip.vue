<script setup lang="ts">
/**
 * @todo add standalone
 * @todo remove class from B24Button
 * @todo remove class from B24Avatar
 */
import theme from '#build/b24ui/chip'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import MessageChatWithPointIcon from '@bitrix24/b24icons-vue/main/MessageChatWithPointIcon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'

usePageMeta.setPageTitle('Chip')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const positions = Object.keys(theme.variants.position) as Array<keyof typeof theme.variants.position>

const items = [
  {
    name: 'messages-1',
    icon: MessageChatWithPointIcon,
    count: 1
  },
  {
    name: 'messages-2',
    icon: MessageChatWithPointIcon,
    count: 53
  },
  {
    name: 'notifications-3',
    icon: BellIcon,
    count: 100
  },
  {
    name: 'notifications-4',
    icon: BellIcon,
    count: 1000
  }
]
</script>

<template>
  <ExampleGrid>
    <ExampleCard title="inset">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Chip
            v-for="position in positions"
            :key="position"
            :position="position"
            :size="size"
            color="success"
            inset
          >
            <B24Avatar class="border-1 border-base-300 p-0.5" src="https://github.com/bitrix24.png" :size="size" text="B24" />
          </B24Chip>
        </div>
      </template>
    </ExampleCard>
    <template v-for="color in colors" :key="color">
      <ExampleCard :title="color as string">
        <template v-for="size in sizes" :key="size">
          <ExampleCardSubTitle :title="size as string" />
          <div class="mb-4 flex items-center gap-4">
            <B24Chip v-for="position in positions" :key="position" :position="position" :size="size" :color="color">
              <B24Button class="px-1 py-1 bg-gray-300 rounded-xs" :icon="MailIcon" color="default" depth="normal" />
            </B24Chip>
          </div>
        </template>
      </ExampleCard>
    </template>
    <ExampleCard title="B24Button">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Chip v-for="{ name, icon, count } in items" :key="name" :text="count" :size="size">
            <B24Button class="px-1 py-1 bg-gray-300 rounded-md text-xl" :icon="icon" size="md" color="default" depth="normal" />
          </B24Chip>
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="B24Avatar">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Chip v-for="{ name, count } in items" :key="name" :text="count" :size="size">
            <B24Avatar class="border-1 border-base-300 p-0.5" src="https://github.com/bitrix24.png" :size="size" text="B24" />
          </B24Chip>
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
