<script setup lang="ts">
import theme from '#build/b24ui/radio-group'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('RadioGroup')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

const literalOptions = [
  'Option 1',
  'Option 2',
  'Option 3'
]
const items = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]

const itemsWithDescription = [
  { value: '1', label: 'Option 1', description: 'Description 1' },
  { value: '2', label: 'Option 2', description: 'Description 2' },
  { value: '3', label: 'Option 3', description: 'Description 3' }
]
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="color">
      <ExampleCardSubTitle title="default" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24RadioGroup :items="items" legend="primary" aria-label="Primary" default-value="1" />
        </div>
      </div>

      <ExampleCardSubTitle title="different color" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24RadioGroup
            v-for="color in colors"
            :key="color"
            :items="items"
            :color="color"
            :legend="color"
            :aria-label="color"
            default-value="1"
          />
        </div>
      </div>
    </ExampleCard>
    <ExampleCard title="statuses">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24RadioGroup :items="items" legend="Default" aria-label="Default" default-value="1" />
          <B24RadioGroup :items="literalOptions" legend="Literal options" aria-label="Literal options" />
          <B24RadioGroup :items="items" legend="Required" required aria-label="Required" />
          <B24RadioGroup :items="items" legend="Disabled" disabled aria-label="Disabled" />
          <B24RadioGroup
            :items="items"
            legend="Horizontal"
            aria-label="Horizontal"
            orientation="horizontal"
            :b24ui="{ label: 'whitespace-nowrap' }"
          />
          <B24RadioGroup :items="items">
            <template #legend>
              <span class="italic font-bold">
                With slots
              </span>
            </template>
            <template #label="{ item }">
              <span class="italic">
                {{ item.label }}
              </span>
            </template>
          </B24RadioGroup>
        </div>
      </div>
    </ExampleCard>
    <ExampleCard title="size" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24RadioGroup
          v-for="size in sizes"
          :key="size"
          :size="size"
          :items="items"
          :legend="`legend for ${size}`"
          :aria-label="`legend for ${size}`"
        />
      </div>
      <ExampleCardSubTitle title="with description" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24RadioGroup
          v-for="size in sizes"
          :key="size"
          :size="size"
          :items="itemsWithDescription"
          :legend="`legend with description for ${size}`"
          :aria-label="`legend with description for ${size}`"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
