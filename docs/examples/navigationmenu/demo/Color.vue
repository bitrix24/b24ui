<script setup lang="ts">
import { ref } from 'vue'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

export interface ExampleProps {
  color?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'success' as const
})

const items = ref([
  {
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
])
</script>

<template>
  <div class="min-w-[600px] min-h-72">
    <div class="border-base-master/10 dark:border-base-100/20 border-y relative z-[1]">
      <B24NavigationMenu
        :color="color"
        :items="items"
        class="w-full"
      />
    </div>

    <Placeholder class="h-52 w-full mt-2" />
  </div>
</template>
