<script setup lang="ts">
import type { NavigationMenuItem, NavigationMenuProps } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const items: NavigationMenuItem[] = [
  {
    label: 'Sales Pipeline',
    icon: ConnectionIcon,
    children: [
      {
        label: 'Lead Generation',
        description: 'Initial contact with potential clients'
      },
      {
        label: 'Lead Qualification',
        description: 'Client potential assessment'
      },
      {
        label: 'Negotiations',
        description: 'Deal terms discussion',
        icon: MicrophoneOnIcon
      }
    ]
  },
  {
    label: 'Sales Analytics',
    icon: CrmMapIcon,
    badge: '+3',
    children: [
      {
        label: 'Sales Reports',
        icon: CrmMapIcon,
        active: true,
        badge: 1
      },
      {
        label: 'Key Metrics',
        icon: Settings5Icon,
        badge: {
          label: 2,
          color: 'air-primary-copilot' as const
        }
      },
      {
        label: 'CRM Integration'
      }
    ]
  },
  {
    label: 'Resources',
    icon: Info1Icon,
    children: [
      {
        label: 'Support',
        icon: Info1Icon,
        disabled: true,
        to: 'https://helpdesk.bitrix24.com/',
        target: '_blank'
      },
      {
        label: 'RestApi Integration'
      }
    ]
  },
  {
    label: 'Resources',
    icon: GitHubIcon,
    to: 'https://github.com/bitrix24/b24ui',
    target: '_blank',
    tooltip: {
      text: 'Open on GitHub',
      kbds: ['meta', 'G']
    }
  }
]

const orientation = ref<NavigationMenuProps['orientation']>('vertical')
const idCollapsed = ref(true)
const isTooltip = ref(true)
</script>

<template>
  <div class="flex flex-col items-center gap-[4px]">
    <div class="flex flex-row flex-wrap items-center justify-center gap-[4px]">
      <B24Select v-model="orientation" :items="['horizontal', 'vertical']" class="min-w-[175px]" />
      <B24Switch v-model="idCollapsed" label="collapsed" />
      <B24Switch v-model="isTooltip" label="tooltip" />
    </div>
    <B24Separator class="my-[4px]" />
    <B24NavigationMenu
      :orientation="orientation"
      :collapsed="idCollapsed"
      :tooltip="isTooltip"
      :items="items"
      class="data-[collapsed=true]:w-[50px]"
    />
  </div>
</template>
