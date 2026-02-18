<script setup lang="ts">
import type { NavigationMenuItem, NavigationMenuProps } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'

const items: NavigationMenuItem[] = [
  {
    label: 'Sales Pipeline',
    icon: ConnectionIcon,
    chip: { color: 'air-primary-alert' },
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
        chip: { color: 'air-primary-alert' },
        icon: MicrophoneOnIcon
      }
    ]
  },
  {
    label: 'Sales Analytics',
    icon: CrmMapIcon,
    chip: { color: 'air-primary', text: 3 },
    children: [
      {
        label: 'Sales Reports',
        icon: CrmMapIcon,
        active: true,
        chip: { text: 1 }
      },
      {
        label: 'Key Metrics',
        icon: Settings5Icon,
        chip: { color: 'air-primary-copilot', text: 2 }
      },
      {
        label: 'CRM Integration'
      }
    ]
  },
  {
    label: 'Resources',
    icon: Info1Icon,
    chip: true,
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
  }
]

const orientation = ref<NavigationMenuProps['orientation']>('horizontal')
const isCollapsed = ref(false)
const isPopover = ref(false)
</script>

<template>
  <div class="flex flex-col items-center gap-[4px]">
    <div class="flex flex-row flex-wrap items-center justify-center gap-[4px]">
      <B24Select v-model="orientation" :items="['horizontal', 'vertical']" class="min-w-[175px]" />
      <B24Switch v-model="isCollapsed" label="collapsed" />
      <B24Switch v-model="isPopover" label="popover" />
    </div>
    <B24Separator class="my-[4px]" />
    <B24NavigationMenu
      :orientation="orientation"
      :collapsed="isCollapsed"
      :popover="isPopover"
      :items="items"
      class="data-[collapsed=true]:w-[50px]"
    />
  </div>
</template>
