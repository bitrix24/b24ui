<script setup lang="ts">
import theme from '#build/b24ui/navigation-menu'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import ConnectionIcon from '@bitrix24/b24icons-vue/actions/ConnectionIcon'
import SyncSettingsIcon from '@bitrix24/b24icons-vue/actions/SyncSettingsIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import PulseCircleIcon from '@bitrix24/b24icons-vue/main/PulseCircleIcon'

usePageMeta.setPageTitle('NavigationMenu')

const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation)

const color = ref(theme.defaultVariants.color)
const variant = ref(theme.defaultVariants.variant)
// const orientation = ref('vertical' as const)
const orientation = ref('horizontal' as const)
const isCollapsed = ref(false)

const items = ref([
  [
    {
      label: 'label 1',
      type: 'label' as const
    },
    {
      label: 'label 2',
      type: 'label' as const,
      avatar: {
        src: '/avatar/employee.png'
      }
    },
    {
      label: 'label 3',
      type: 'label' as const,
      icon: ConnectionIcon
    },
    {
      label: 'Item 1',
      avatar: {
        src: '/avatar/employee.png'
      },
      active: false,
      children: [
        {
          label: 'Item 1.1',
          description: 'Item 1.1 description',
          active: false
        },
        {
          label: 'Item 1.2',
          description: 'Item 1.2 description',
          avatar: {
            src: '/avatar/employee.png'
          },
          active: true
        },
        {
          label: 'Item 1.3',
          description: 'Item 1.3 description',
          icon: SyncSettingsIcon,
          active: true
        }
      ]
    },
    {
      label: 'Item 2',
      active: false,
      defaultOpen: true,
      badge: 3,
      icon: SyncSettingsIcon,
      to: '/components/navigation-menu#1',
      children: [
        {
          label: 'Item 2.1',
          badge: 1,
          icon: SyncSettingsIcon,
          description: 'Item 2.1 description.',
          to: '/components/navigation-menu#1'
        },
        {
          label: 'Item 2.2',
          badge: 2,
          icon: SyncSettingsIcon,
          description: 'Item 2.2 description.',
          to: '/components/checkbox'
        }
      ]
    }
  ],
  [
    {
      label: 'GitHub',
      icon: GitHubIcon,
      badge: 14,
      to: 'https://github.com/bitrix24/b24ui',
      target: '_blank'
    },
    {
      label: 'Help',
      badge: {
        label: '14',
        color: 'ai',
        depth: 'dark',
        useFill: true
      },
      icon: PulseCircleIcon,
      disabled: true
    }
  ]
])
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="settings">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4">
        <B24RadioGroup v-model="variant" legend="Variant" :items="variants" />
        <B24RadioGroup v-model="orientation" legend="Orientation" :items="orientations" />
        <B24FormField label="Color" name="color">
          <B24Select v-model="color" :items="colors" class="w-full" />
        </B24FormField>
        <B24FormField label="isCollapsed" name="isCollapsed">
          <B24Switch v-model="isCollapsed" />
        </B24FormField>
      </div>
    </ExampleCard>
    <ExampleCard title="NavigationMenu" class="md:col-span-3">
      <ExampleCardSubTitle title="demo" />
      <div class="mb-4 flex flex-row justify-center flex-wrap gap-2">
        <B24NavigationMenu
          arrow
          :collapsed="isCollapsed"
          :items="items"
          :color="color"
          :variant="variant"
          :orientation="orientation"
          highlight
          highlight-color="default"
          class="border-base-master/10 dark:border-base-100/20 data-[orientation=vertical]:border data-[orientation=vertical]:py-2 data-[orientation=vertical]:rounded data-[orientation=horizontal]:border-b data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[240px] data-[orientation=vertical]:data-[collapsed=true]:w-[69px]"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
