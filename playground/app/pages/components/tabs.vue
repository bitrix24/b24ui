<script setup lang="ts">
import theme from '#build/b24ui/tabs'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
// import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import Shining2Icon from '@bitrix24/b24icons-vue/main/Shining2Icon'

usePageMeta.setPageTitle('Tabs')
const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation)
const sizes = Object.keys(theme.variants.size)

const color = ref(theme.defaultVariants.color)
const variant = ref(theme.defaultVariants.variant)
const orientation = ref('horizontal' as const)
const size = ref('md' as const)

const items = [
  {
    label: 'General',
    avatar: {
      src: '/avatar/employee.png'
    },
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
    slot: 'custom' as const
  },
  {
    label: 'Automation',
    content: 'This is the content for Automation'
  },
  {
    label: 'Workflows',
    content: 'This is the content for Workflows'
  },
  /*
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
    <ExampleCard title="settings">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4">
        <B24FormField label="Color" name="color">
          <B24Select v-model="color" :items="colors" />
        </B24FormField>
        <B24FormField label="Variant" name="variant">
          <B24Select v-model="variant" :items="variants" />
        </B24FormField>
        <B24FormField label="Orientation" name="color">
          <B24Select v-model="orientation" :items="orientations" />
        </B24FormField>
        <B24FormField label="Size" name="size">
          <B24Select v-model="size" :items="sizes" />
        </B24FormField>
      </div>
    </ExampleCard>
    <ExampleCard title="no content">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4">
        <B24Tabs
          :color="color"
          :variant="variant"
          :orientation="orientation"
          :size="size"
          :items="[{ label: 'My Bitrix24' }, { label: 'Start page' }]"
          :content="false"
        />
      </div>
    </ExampleCard>
    <ExampleCard title="tabs" class="sm:col-span-3">
      <B24Separator class="my-3" type="dotted" />
      <B24Tabs
        :color="color"
        :variant="variant"
        :orientation="orientation"
        :size="size"
        :items="items"
        class="w-96"
      >
        <template #default="{ item }">
          <template v-if="item.label === 'More'">
            <B24Button normal-case use-dropdown :label="item.label" color="link" />
          </template>
          <template v-else>
            {{ item.label }}
          </template>
        </template>
        <template #custom="{ item }">
          <span class="text-red-500">Custom: {{ item.content }}</span>
        </template>
      </B24Tabs>
    </ExampleCard>
  </ExampleGrid>
</template>
