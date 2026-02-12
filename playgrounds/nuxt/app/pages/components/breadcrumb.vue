<script setup lang="ts">
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'

const items = [
  {
    label: 'Home',
    to: '/'
  },
  {
    slot: 'dropdown' as const,
    icon: MoreLIcon,
    children: [
      {
        label: 'Documentation'
      },
      {
        label: 'Themes'
      },
      {
        label: 'GitHub'
      }
    ]
  },
  {
    label: 'Components',
    disabled: true
  },
  {
    label: 'Breadcrumb',
    to: '/components/breadcrumb'
  }
]
</script>

<template>
  <PlaygroundPage>
    <B24Breadcrumb :items="items" class="mx-auto mt-4">
      <template #dropdown="{ item }">
        <B24DropdownMenu :items="item.children">
          <B24Button :icon="item.icon" color="air-tertiary-no-accent" class="p-0.5" />
        </B24DropdownMenu>
      </template>
    </B24Breadcrumb>
  </PlaygroundPage>
</template>
