<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'

const items = [
  {
    label: 'Sales Pipeline',
    icon: ConnectionIcon,
    slot: 'pipeline' as const,
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
    label: 'GitHub',
    icon: GitHubIcon,
    to: 'https://github.com/bitrix24/b24ui',
    target: '_blank'
  }
] satisfies NavigationMenuItem[]
</script>

<template>
  <B24NavigationMenu
    :items="items"
    :b24ui="{
      viewport: 'sm:w-(--reka-navigation-menu-viewport-width)',
      content: 'sm:w-auto',
      childList: 'sm:w-[380px]'
    }"
    class="w-full justify-center"
  >
    <template #pipeline-content="{ item }">
      <ul class="grid gap-2 p-4 lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
        <li class="row-span-3">
          <Placeholder class="size-full min-h-[203px]" />
        </li>

        <li v-for="child in item.children" :key="child.label">
          <B24Link class="group text-(length:--ui-font-size-sm) text-left rounded-(--ui-border-radius-md) p-3 transition-colors hover:no-underline hover:bg-(--ui-color-bg-content-secondary)">
            <p class="font-(--ui-font-weight-medium) text-(--b24ui-typography-legend-color) group-hover:text-(--ui-color-accent-main-primary-alt-2)">
              {{ child.label }}
            </p>
            <p class="text-(--b24ui-typography-description-color) line-clamp-2">
              {{ child.description }}
            </p>
          </B24Link>
        </li>
      </ul>
    </template>
  </B24NavigationMenu>
</template>
