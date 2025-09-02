<script setup lang="ts">
import theme from '#build/b24ui/tabs'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
// import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'
import Refresh5Icon from '@bitrix24/b24icons-vue/actions/Refresh5Icon'

usePageMeta.setPageTitle('Tabs')
const orientations = Object.keys(theme.variants.orientation)
const sizes = Object.keys(theme.variants.size)

const isUseBg = ref(false)

const variant = 'link'
const orientation = ref('horizontal' as const)
const size = ref('md' as const)

const itemsSimple = [
  { label: 'My Bitrix24' },
  { label: 'Start page' }
]
const items = [
  {
    label: 'General',
    avatar: { src: '/avatar/employee.png' },
    content: 'This is the content for General'
  },
  {
    label: 'Products',
    icon: Shining2Icon,
    content: 'This is the content for Products'
  },
  {
    label: 'Estimates',
    content: 'Use slot, this is the content for Estimates',
    slot: 'custom' as const,
    badge: 'badge'
  },
  /*
  {
    label: 'Automation',
    content: 'This is the content for Automation'
  },
  {
    label: 'Workflows',
    content: 'This is the content for Workflows'
  },

  {
    label: 'Dependencies',
    content: 'This is the content for Dependencies'
  },
  {
    label: 'History',
    content: 'This is the content for History'
  },
  {
    label: 'Market',
    content: 'This is the content for Market'
  },
   */
  {
    label: 'More',
    content: 'This is the content for More'
  }
]
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="settings" use-bg class="sm:col-span-2 md:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="flex flex-row flex-wrap gap-4">
        <B24RadioGroup v-model="orientation" class="w-[150px]" legend="Orientation" :items="orientations" />
        <B24FormField class="w-[150px]" label="Size" name="size">
          <B24Select v-model="size" :items="sizes" class="w-full" />
        </B24FormField>
      </div>
    </ExampleCard>
  </ExampleGrid>
  <B24Separator accent="accent" class="my-4" label="Demo" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="no content" use-bg class="sm:col-span-2 md:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="flex flex-col gap-4">
        <B24Tabs
          :variant="variant"
          :orientation="orientation"
          :size="size"
          :items="itemsSimple"
          :content="false"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
  <B24Separator accent="accent" class="my-4" label="Demo" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="Some content" :use-bg="isUseBg" class="ps-[1px] sm:col-span-2 md:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="overflow-auto">
        <B24Tabs
          :variant="variant"
          :orientation="orientation"
          :size="size"
          :items="items"
          class="w-full min-w-[720px]"
        >
          <template #trailing="{ item }">
            <template v-if="item.label === 'More'">
              <ChevronDownIcon class="shrink-0 size-4" />
            </template>
          </template>
          <template #custom="{ item }">
            <span class="text-(--ui-color-accent-main-alert)">Custom: {{ item.content }}</span>
          </template>

          <template #list-trailing>
            <B24Button
              :size="size"
              :icon="Refresh5Icon"
              color="air-secondary-accent-2"
              label="Some text"
              class="ml-2"
            />
          </template>
        </B24Tabs>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
