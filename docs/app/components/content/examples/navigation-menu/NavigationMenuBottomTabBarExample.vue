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
  root: 'justify-around border-t border-(--ui-color-divider-default) py-2',
  link: 'h-[64px]',
  item: 'py-0',
  linkLabelWrapper: 'flex-col gap-1 px-3',
  linkLeadingIcon: 'size-8',
  linkLabel: 'text-[10px]/3 font-normal'
})
</script>

<template>
  <B24NavigationMenu
    :items="items"
    :b24ui="b24UiCustom"
    class="w-full"
  >
    <template #item-leading="{ item, active, b24ui }">
      <template v-if="item.icon">
        <Component
          :is="item.icon"
          class="size-5"
          :class="b24ui.linkLeadingIcon({ class: [b24UiCustom?.linkLeadingIcon], active, disabled: !!item.disabled })"
        />
      </template>
    </template>
  </B24NavigationMenu>
</template>
