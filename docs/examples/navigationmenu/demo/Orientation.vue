<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

export interface ExampleProps {
  orientation?: any
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal' as const
})

const items = [
  [
    {
      label: 'Sales Manager',
      type: 'label' as const
    },
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
      label: 'Support',
      icon: Info1Icon,
      disabled: true,
      to: 'https://helpdesk.bitrix24.com/',
      target: '_blank'
    }
  ],
  [
    {
      viewportRtl: true,
      label: 'Sales Analytics',
      badge: '+3',
      active: true,
      defaultOpen: true,
      children: [
        {
          label: 'Sales Reports',
          icon: CrmMapIcon,
          active: true,
          to: '/b24ui/components/components/navigation-menu.html',
          badge: 1
        },
        {
          label: 'Key Metrics',
          icon: Settings5Icon,
          to: '/b24ui/components/navigation-menu.html',
          badge: {
            label: 2,
            color: 'ai' as const,
            depth: 'dark' as const,
            useFill: true
          }
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
  <div v-if="isInit" class="min-w-[600px] min-h-72">
    <div
      class="border-base-master/10 dark:border-base-100/20"
      :class="[
        orientation === 'horizontal'
          ? 'border-y relative z-[1]'
          : 'border py-2 rounded w-[240px] data-[collapsed=true]:w-[69px]'
      ]"
    >
      <B24NavigationMenu
        :items="items"
        :orientation="orientation"
        class="w-full"
      />
    </div>
  </div>
</template>
