<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'
import ArrowDownIcon from '@bitrix24/b24icons-vue/actions/ArrowDownIcon'

const items = [
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
        to: '/b24ui/components/components/navigation-menu.html'
      },
      {
        label: 'Key Metrics',
        icon: Settings5Icon,
        to: '/b24ui/components/navigation-menu.html'
      },
      {
        label: 'CRM Integration',
        to: 'https://github.com/bitrix24/b24ui',
        target: '_blank'
      }
    ]
  },
  {
    label: 'Resources',
    to: 'https://github.com/bitrix24/b24ui',
    target: '_blank'
  },
  {
    label: 'Support',
    icon: Info1Icon,
    disabled: true,
    to: 'https://helpdesk.bitrix24.com/',
    target: '_blank'
  }
] satisfies NavigationMenuItem[]

/**
 * @memo The setTimeout construction is needed for normal initialization of the B24NavigationMenu component in demo mode
 * In a real project, you will not dynamically load it
 */
const isInit = ref(false)
onMounted(() => {
  setTimeout(() => {
    isInit.value = true
  }, 300)
})
</script>

<template>
  <div v-if="isInit" class="min-w-[600px]">
    <div class="relative z-[1] border-base-master/10 dark:border-base-100/20 border-y">
      <B24NavigationMenu
        :trailing-icon="ArrowDownIcon"
        :items="items"
        class="w-full justify-start"
      />
    </div>

    <Placeholder class="h-52 w-full mt-2" />
  </div>
</template>
