<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/navigation-menu'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import PulseCircleIcon from '@bitrix24/b24icons-vue/main/PulseCircleIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/main/MicrophoneOnIcon'
import CrmMapIcon from '@bitrix24/b24icons-vue/crm/CrmMapIcon'
import Settings5Icon from '@bitrix24/b24icons-vue/editor/Settings5Icon'
import Filter1Icon from '@bitrix24/b24icons-vue/main/Filter1Icon'

usePageMeta.setPageTitle('NavigationMenu')

const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation)

const color = ref(theme.defaultVariants.color)
const variant = ref(theme.defaultVariants.variant)
const contentOrientation = ref('vertical' as const)
const isCollapsed = ref(false)
const isHighlight = ref(true)
const isTooltip = ref(false)
const isPopover = ref(false)
const isArrow = ref(false)

const items = [
  [
    {
      label: 'Sales Manager'
    },
    {
      label: 'Active Clients',
      type: 'label' as NavigationMenuItem['type'],
      avatar: {
        src: '/b24ui/demo/avatar/employee.png'
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
        src: '/b24ui/demo/avatar/employee.png'
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
            src: '/b24ui/demo/avatar/employee.png'
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
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="settings">
      <B24Separator class="my-5" type="dotted" />
      <div class="space-y-4">
        <B24RadioGroup v-model="variant" legend="Variant" :items="variants" />
        <B24RadioGroup v-model="contentOrientation" legend="contentOrientation" :items="orientations" />
        <B24FormField label="Color" name="color">
          <B24Select v-model="color" :items="colors" class="w-full max-w-[300px]" />
        </B24FormField>
        <B24FormField label="isCollapsed" name="isCollapsed">
          <B24Switch v-model="isCollapsed" />
        </B24FormField>
        <B24FormField label="isHighlight" name="isHighlight">
          <B24Switch v-model="isHighlight" />
        </B24FormField>
        <B24FormField label="isTooltip" name="isTooltip">
          <B24Switch v-model="isTooltip" />
        </B24FormField>
        <B24FormField label="isPopover" name="isPopover">
          <B24Switch v-model="isPopover" />
        </B24FormField>
        <B24FormField label="isArrow" name="isArrow">
          <B24Switch v-model="isArrow" />
        </B24FormField>
      </div>
    </ExampleCard>
    <ExampleCard title="demo" class="col-span-3">
      <B24Separator class="my-3" type="dotted" label="horizontal" />
      <div class="mb-4 flex flex-col justify-center flex-wrap overflow-auto">
        <div
          v-if="isInit"
          class="isolate px-4 py-3 w-full min-w-[720px]"
        >
          <div class="relative z-[1] border-base-master/10 dark:border-base-100/20 border-y">
            <B24NavigationMenu
              :items="items"
              :color="color"
              :variant="variant"
              orientation="horizontal"
              :content-orientation="contentOrientation"
              :highlight="isHighlight"
              :highlight-color="color"
              :arrow="isArrow"
              :tooltip="isTooltip"
              :popover="isPopover"
            />
          </div>

          <Placeholder class="h-52 w-full mt-2" />
        </div>
      </div>

      <ExampleCardSubTitle title="vertical" />
      <div
        v-if="isInit"
        class="isolate px-4 mb-4 flex flex-row justify-start flex-wrap gap-2"
      >
        <B24NavigationMenu
          :collapsed="isCollapsed"
          :items="items"
          :color="color"
          :variant="variant"
          orientation="vertical"
          :highlight="isHighlight"
          :highlight-color="color"
          :arrow="isArrow"
          :tooltip="isTooltip"
          :popover="isPopover"
          class="border-base-master/10 dark:border-base-100/20 border py-2 rounded w-[240px] data-[collapsed=true]:w-[69px]"
        />
        <Placeholder class="flex-1 w-full shrink" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
