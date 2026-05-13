<script setup lang="ts">
import type { BreadcrumbItem } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/breadcrumb'
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'

const colors = Object.keys(theme.variants.color)

const attrs = reactive({
  color: [theme.defaultVariants.color]
})

const items = [
  {
    label: 'Home',
    to: '/'
  },
  {
    slot: 'dropdown' as const,
    icon: MoreLIcon,
    children: [
      {
        label: 'Documentation'
      },
      {
        label: 'Themes'
      },
      {
        label: 'GitHub'
      }
    ]
  },
  {
    label: 'Components',
    disabled: true
  },
  {
    label: 'Breadcrumb',
    to: '/components/breadcrumb'
  }
] satisfies BreadcrumbItem[]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.color"
        class="w-44"
        :items="colors"
        placeholder="Color"
        multiple
        size="xs"
      />
    </template>
    <Matrix v-slot="props" :attrs="attrs" class="flex-col">
      <B24Breadcrumb
        :items="items"
        v-bind="props"
        class="mx-auto mt-4"
      >
        <template #dropdown="{ item }">
          <B24DropdownMenu :items="item.children">
            <B24Button :icon="item.icon" color="air-tertiary-no-accent" class="p-0.5" />
          </B24DropdownMenu>
        </template>
      </B24Breadcrumb>
    </Matrix>
  </PlaygroundPage>
</template>
