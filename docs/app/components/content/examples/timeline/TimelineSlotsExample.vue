<script lang="ts" setup>
import type { TimelineItem } from '@bitrix24/b24ui-nuxt'
import { useTimeAgo } from '@vueuse/core'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const items = [{
  username: 'Employee Name',
  date: '2025-05-24T14:58:55Z',
  action: 'opened this',
  avatar: {
    src: '/b24ui/avatar/employee.png'
  }
}, {
  username: 'Employee Name',
  date: '2025-05-26T19:30:14+02:00',
  action: 'marked this pull request as ready for review',
  icon: RocketIcon
}, {
  username: 'Assistant Name',
  date: '2025-05-27T11:01:20Z',
  action: 'commented on this',
  description: 'I\'ve made a few changes, let me know what you think! Basically I updated the design, removed unnecessary divs, used Avatar component for the indicator since it supports icon already.',
  avatar: {
    src: '/b24ui/avatar/assistant.png'
  }
}, {
  username: 'Employee Name',
  date: '2025-05-27T11:01:20Z',
  action: 'commented on this',
  description: 'Looks great! Good job on cleaning it up.',
  avatar: {
    src: '/b24ui/avatar/employee.png'
  }
}, {
  username: 'Assistant Name',
  date: '2025-05-27T11:01:20Z',
  action: 'merged this',
  icon: MoreMIcon
}] satisfies TimelineItem[]
</script>

<template>
  <B24Timeline
    :items="items"
    size="xs"
    :b24ui="{
      date: 'float-end ms-1',
      description: 'px-3 py-2 ring ring-(--ui-color-g-glass-grey-bg-2) mt-2 rounded-md text-(--b24ui-typography-description-color)'
    }"
    class="w-[384px]"
  >
    <template #title="{ item }">
      <span>{{ item.username }}</span>
      <span class="font-normal text-(--b24ui-typography-label-color)">&nbsp;{{ item.action }}</span>
    </template>

    <template #date="{ item }">
      {{ useTimeAgo(new Date(item.date)) }}
    </template>
  </B24Timeline>
</template>
