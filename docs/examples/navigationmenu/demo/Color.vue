<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

export interface ExampleProps {
  color?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'success' as const
})

const items = [
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
  <div v-if="isInit" class="min-w-[600px] min-h-72">
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
