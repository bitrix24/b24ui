<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import PlayIcon from '@bitrix24/b24icons-vue/common-service/PlayIcon'
import CompassIcon from '@bitrix24/b24icons-vue/main/CompassIcon'
import BookmarkIcon from '@bitrix24/b24icons-vue/outline/BookmarkIcon'

const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: HomeIcon,
    active: true
  },
  {
    label: 'Samples',
    icon: PlayIcon
  },
  {
    label: 'Explore',
    icon: CompassIcon
  },
  {
    label: 'Library',
    icon: BookmarkIcon
  }
]

const b24UiCustom = ref({
  root: 'w-[76px] ps-0',
  item: 'w-[54px]',
  link: 'h-[54px]',
  linkLabelWrapper: 'h-[44px] w-[44px] flex-col gap-0.5 px-3',
  linkLabel: 'block text-[10px]/3 text-center'
})
</script>

<template>
  <B24NavigationMenu
    collapsed
    orientation="vertical"
    :items="items"
    :b24ui="b24UiCustom"
  />
</template>
