<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import FolderIcon from '@bitrix24/b24icons-vue/outline/FolderIcon'
import BookOpenIcon from '@bitrix24/b24icons-vue/crm/BookOpenIcon'
import Share1Icon from '@bitrix24/b24icons-vue/main/Share1Icon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import PlusLIcon from '@bitrix24/b24icons-vue/outline/PlusLIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Personal',
      type: 'label',
      slot: 'personal-label' as const
    },
    {
      label: 'Design System',
      icon: FolderIcon,
      active: true
    },
    {
      label: 'Travel',
      icon: FolderIcon
    }
  ],
  [
    {
      label: 'Teams',
      type: 'label',
      slot: 'teams-label' as const
    },
    {
      label: 'Engineering',
      icon: FolderIcon
    },
    {
      label: 'Marketing',
      icon: FolderIcon
    }
  ]
]

const dropdownItems: DropdownMenuItem[][] = [
  [
    { label: 'View Project', icon: BookOpenIcon },
    { label: 'Share Project', icon: Share1Icon }
  ],
  [
    { label: 'Delete Project', icon: TrashcanIcon, color: 'air-primary-alert' }
  ]
]
</script>

<template>
  <B24NavigationMenu
    orientation="vertical"
    :items="items"
    :b24ui="{ label: 'flex items-center justify-between gap-1.5 ' }"
    class="w-48"
  >
    <template #personal-label-trailing>
      <B24Button :icon="PlusLIcon" color="air-tertiary" size="xs" />
    </template>

    <template #teams-label-trailing>
      <B24Button :icon="PlusLIcon" color="air-tertiary" size="xs" />
    </template>

    <template #item-trailing>
      <div class="flex -mr-1.5 -my-0.5 translate-x-full group-hover:translate-x-0 has-data-[state=open]:translate-x-0 transition-transform">
        <B24DropdownMenu
          :items="dropdownItems"
          :content="{ align: 'start' }"
          :modal="false"
          size="xs"
        >
          <B24Button
            as="div"
            :icon="MoreMIcon"
            color="air-tertiary"
            size="xs"
            class="text-(--b24ui-typography-description-color) hover:text-(--b24ui-typography-label-color) hover:bg-(--ui-color-accent-soft-element-blue)/40 data-[state=open]:bg-(--ui-color-accent-soft-element-blue)/30 mr-1.5"
          />
        </B24DropdownMenu>
      </div>
    </template>
  </B24NavigationMenu>
</template>
