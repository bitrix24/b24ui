<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import usePageMeta from './../../composables/usePageMeta'
import Placeholder from '../../components/Placeholder.vue'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import PulseCircleIcon from '@bitrix24/b24icons-vue/main/PulseCircleIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import Filter1Icon from '@bitrix24/b24icons-vue/main/Filter1Icon'

usePageMeta.setPageTitle('NavigationMenu')

const isCollapsed = ref(false)
const isTooltip = ref(false)
const isPopover = ref(false)

const items = [
  [
    {
      label: 'Sales Manager'
    },
    {
      label: 'Active Clients',
      type: 'label' as NavigationMenuItem['type'],
      avatar: {
        src: '/avatar/employee.png'
      }
    },
    {
      label: 'Conversion Rates',
      type: 'label' as NavigationMenuItem['type'],
      icon: ConnectionIcon
    },
    {
      label: 'Current Deals',
      type: 'label' as NavigationMenuItem['type'],
      active: true,
      badge: 3
    },
    {
      label: 'Sales Pipeline',
      type: 'trigger' as NavigationMenuItem['type'],
      avatar: {
        src: '/avatar/employee.png'
      },
      children: [
        {
          label: 'Lead Generation',
          description: 'Initial contact with potential clients',
          active: false
        },
        {
          label: 'Lead Qualification',
          description: 'Client potential assessment',
          avatar: {
            src: '/avatar/employee.png'
          },
          active: true
        },
        {
          label: 'Negotiations',
          description: 'Deal terms discussion',
          icon: MicrophoneOnIcon,
          active: true
        }
      ]
    }
  ],
  [
    {
      label: 'Team Support',
      badge: {
        label: '14',
        color: 'ai' as const,
        depth: 'dark' as const,
        useFill: true
      },
      icon: PulseCircleIcon,
      disabled: true,
      to: 'https://helpdesk.bitrix24.com/',
      target: '_blank'
    },
    {
      label: 'Resources',
      icon: GitHubIcon,
      badge: 14,
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
      type: 'trigger' as NavigationMenuItem['type'],
      active: true,
      defaultOpen: true,
      badge: 3,
      icon: Filter1Icon,
      to: '/components/navigation-menu#1',
      children: [
        {
          label: 'Sales Reports',
          badge: 1,
          icon: CrmMapIcon,
          to: '/components/navigation-menu#1'
        },
        {
          label: 'Key Metrics',
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

const isInit = ref(false)

onMounted(() => {
  setTimeout(() => {
    isInit.value = true
  }, 300)
})
</script>

<template>
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="settings">
      <B24Separator class="my-5" type="dotted" />
      <div class="flex flex-row gap-4">
        <B24FormField label="isCollapsed" name="isCollapsed">
          <B24Switch v-model="isCollapsed" />
        </B24FormField>
        <B24FormField label="isTooltip" name="isTooltip">
          <B24Switch v-model="isTooltip" />
        </B24FormField>
        <B24FormField label="isPopover" name="isPopover">
          <B24Switch v-model="isPopover" />
        </B24FormField>
      </div>
    </ExampleCard>
  </ExampleGrid>
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="demo" class="col-span-4">
      <B24Separator class="mt-3" type="dotted" label="horizontal" />
      <div class="-mt-[8px] mb-4 flex flex-col justify-center flex-wrap overflow-auto">
        <div
          v-if="isInit"
          class="isolate px-4 w-full min-w-[720px]"
        >
          <div class="relative z-[1] border-base-master/10 flex flex-row items-center justify-between min-h-(--topbar-height) ">
            <B24NavigationMenu
              class="min-h-full shrink-1 w-full"
              :items="items"
              orientation="horizontal"
              :tooltip="isTooltip"
              :popover="isPopover"
            />
          </div>

          <Placeholder class="h-52 w-full mt-0" />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="demo" class="col-span-4">
      <B24Separator class="mt-3" type="dotted" label="vertical" />
      <div
        v-if="isInit"
        class="-mt-[8px] isolate px-4 mb-4 flex flex-row justify-start flex-wrap gap-2"
      >
        <B24NavigationMenu
          :collapsed="isCollapsed"
          :items="items"
          orientation="vertical"
          :tooltip="isTooltip"
          :popover="isPopover"
          class="w-[240px] data-[collapsed=true]:w-[69px]"
        />
        <Placeholder class="flex-1 rounded-l-none rounded-tr-none ms-2 w-full shrink" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
