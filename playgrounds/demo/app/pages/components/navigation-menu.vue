<script setup lang="ts">
import { ref } from 'vue'
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
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="demo" class="col-span-4">
      <B24Separator class="mt-3" type="dotted" label="horizontal" />
      <div class="-mt-[8px] mb-4 flex flex-col justify-center flex-wrap overflow-auto">
        <div
          class="isolate px-2 w-full min-w-[720px]"
        >
          <div class="relative z-[1] flex flex-row items-center justify-between min-h-(--topbar-height) ">
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
        class="-mt-[8px] px-2 isolate mb-4 flex flex-row justify-start flex-wrap gap-2"
      >
        <B24NavigationMenu
          :collapsed="isCollapsed"
          :items="items"
          orientation="vertical"
          :tooltip="isTooltip"
          :popover="isPopover"
          class="mt-[4px] w-[240px] data-[collapsed=true]:w-[50px]"
        />
        <Placeholder class="flex-1 rounded-l-none rounded-tr-none ms-2 w-full shrink">
          <ExampleCard title="settings" class="backdrop-blur-md bg-(--ui-color-g-content-grey-1)/20">
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
        </Placeholder>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
