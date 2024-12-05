<script setup lang="ts">
/**
 * @todo fig B24Button color
 * @todo fig B24Avatar color
 */
import theme from '#build/b24ui/chip'
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import MessageChatWithPointIcon from '@bitrix24/b24icons-vue/main/MessageChatWithPointIcon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import usePageMeta from './../../composables/usePageMeta'

usePageMeta.setPageTitle('Chip')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const positions = Object.keys(theme.variants.position) as Array<keyof typeof theme.variants.position>

const items = [{
  name: 'messages',
  icon: MessageChatWithPointIcon,
  count: 3
}, {
  name: 'notifications',
  icon: BellIcon,
  count: 0
}]
</script>

<template>
  <div class="flex flex-col gap-8 p-4 bg-white rounded-lg">
    <div class="flex items-center gap-4">
      <B24Chip color="danger" v-for="position in positions" :key="position" :position="position">
        <B24Button class="px-1 py-1 bg-gray-300 rounded-xs" :icon="MailIcon" color="default" depth="normal" />
      </B24Chip>
    </div>

    <div class="flex items-center gap-4">
      <B24Chip color="primary" v-for="{ name, icon, count } in items" :key="name" :text="count" :show="count > 0" size="lg">
        <B24Button class="px-1 py-1 bg-gray-300 rounded-md text-xl" :icon="icon" size="md" color="default" depth="normal" />
      </B24Chip>
    </div>

    <div class="flex items-center gap-4">
      <B24Chip v-for="size in sizes" :key="size" :size="size" inset text="1">
        <B24Avatar class="border-1 border-base-300 p-0.5" src="https://github.com/bitrix24.png" />
      </B24Chip>
    </div>
  </div>
</template>
