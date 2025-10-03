<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import MoreLIcon from '@bitrix24/b24icons-vue/outline/MoreLIcon'

usePageMeta.setPageTitle('Breadcrumb')

const isUseBg = ref(true)

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
]
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="simple" :use-bg="isUseBg" class="sm:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Breadcrumb :items="items">
          <template #dropdown="{ item }">
            <B24DropdownMenu :items="item.children">
              <B24Button :icon="item.icon" color="air-tertiary-no-accent" class="p-0.5" />
            </B24DropdownMenu>
          </template>
        </B24Breadcrumb>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
