<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'

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

const active = ref()

defineShortcuts({
  1: () => {
    active.value = 'item-0'
  },
  2: () => {
    active.value = 'item-1'
  },
  3: () => {
    active.value = 'item-2'
  }
})
</script>

<template>
  <B24NavigationMenu v-model="active" :items="items" class="w-full justify-center" />
</template>
