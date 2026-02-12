<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/navigation-menu'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import Placeholder from '../../components/Placeholder.vue'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import PulseCircleIcon from '@bitrix24/b24icons-vue/main/PulseCircleIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import Filter1Icon from '@bitrix24/b24icons-vue/main/Filter1Icon'

const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>
const collapsed = ref(false)
const tooltip = ref(false)
const popover = ref(false)
const orientation = ref(orientations[0])

const items = [
  [
    {
      label: 'Current Deals',
      type: 'label' as NavigationMenuItem['type'],
      active: true,
      badge: 13,
      icon: ConnectionIcon
    },
    {
      label: 'Sales Pipeline',
      type: 'trigger' as NavigationMenuItem['type'],
      avatar: { src: '/b24ui/demo/avatar/employee.png' },
      children: [
        {
          label: 'Lead Generation',
          description: 'Initial contact with potential clients',
          active: false
        },
        {
          label: 'Lead Qualification',
          description: 'Client potential assessment',
          active: true
        },
        {
          label: 'Negotiations',
          description: 'Deal terms discussion',
          icon: MicrophoneOnIcon
        }
      ]
    }
  ],
  [
    {
      label: 'Team Support',
      hint: '500%',
      icon: PulseCircleIcon,
      disabled: true,
      to: 'https://helpdesk.bitrix24.com/',
      target: '_blank'
    },
    {
      label: 'Resources',
      icon: GitHubIcon,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank',
      tooltip: {
        text: 'Open on GitHub',
        kbds: [
          '3.8k'
        ]
      }
    },
    {
      viewportRtl: true,
      label: 'Sales Analytics',
      hint: '500%',
      type: 'trigger' as NavigationMenuItem['type'],
      active: true,
      activeClass: '',
      defaultOpen: true,
      badge: {
        label: '14',
        color: 'air-primary' as const,
        inverted: false
      },
      icon: Filter1Icon,
      to: '/components/navigation-menu#1',
      children: [
        {
          label: 'Sales Reports',
          hint: '250%',
          badge: 1,
          icon: CrmMapIcon,
          to: '/components/navigation-menu#1'
        },
        {
          label: 'Key Metrics',
          hint: '250%',
          badge: 2,
          icon: Settings5Icon,
          to: '/components/checkbox'
        },
        {
          label: 'CRM Integration',
          to: 'https://github.com/bitrix24/b24ui',
          target: '_blank'
        }
      ]
    }
  ]
] satisfies NavigationMenuItem[][]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="orientation" :items="orientations" placeholder="Orientation" />
      <template v-if="orientation ==='vertical'">
        <B24Switch v-model="collapsed" label="isCollapsed" />
        <B24Switch v-model="tooltip" label="isTooltip" />
        <B24Switch v-model="popover" label="isPopover" />
      </template>
    </template>

    <div
      :class="['flex gap-2 w-full overflow-auto py-3 px-1', { 'flex-col min-h-52': orientation === 'horizontal' }]"
    >
      <B24NavigationMenu
        :tooltip="tooltip"
        :popover="popover"
        :collapsed="collapsed"
        :items="items"
        :orientation="orientation"
        class="data-[orientation=horizontal]:h-max data-[orientation=horizontal]:min-w-120 data-[orientation=vertical]:w-48 data-[orientation=vertical]:data-[collapsed=true]:w-6xl"
      />
      <Placeholder class="size-full mt-0" />
    </div>
  </PlaygroundPage>
</template>
