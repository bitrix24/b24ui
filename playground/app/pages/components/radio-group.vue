<script setup lang="ts">
import theme from '#build/b24ui/radio-group'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('RadioGroup')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const variants = Object.keys(theme.variants.variant)
const variant = ref('list' as const)

const literalOptions = [
  'Basic',
  'Standard',
  'Professional',
  'Enterprise'
]
const items = [
  { value: '1', label: 'Basic' },
  { value: '2', label: 'Standard' },
  { value: '3', label: 'Professional' },
  { value: '4', label: 'Enterprise' }
]

const itemsWithDescription = [
  { value: '1', label: 'Basic', description: 'includes 5 users' },
  { value: '2', label: 'Standard', description: 'includes 50 users' },
  { value: '3', label: 'Professional', description: 'includes 100 users' },
  { value: '4', label: 'Enterprise', description: 'includes 250 users' }
]
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="settings">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Select
          v-model="variant"
          :items="variants"
          class="w-[100px]"
        />
      </div>
    </ExampleCard>

    <template v-for="color in colors" :key="color">
      <ExampleCard :title="color as string">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
          <B24RadioGroup
            :variant="variant"
            :items="items"
            :color="color"
            :legend="color"
            :aria-label="color"
            default-value="1"
          />
        </div>
      </ExampleCard>
    </template>

    <ExampleCard title="Default">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :variant="variant" :items="items" aria-label="Default" default-value="1" />
      </div>
    </ExampleCard>

    <ExampleCard title="Literal options">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :variant="variant" :items="literalOptions" aria-label="Literal options" />
      </div>
    </ExampleCard>

    <ExampleCard title="Required">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :variant="variant" :items="items" required aria-label="Required" />
      </div>
    </ExampleCard>

    <ExampleCard title="Disabled">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :variant="variant" :items="items" disabled aria-label="Disabled" />
      </div>
    </ExampleCard>

    <ExampleCard title="With slots">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :items="items" :variant="variant">
          <template #legend>
            <span class="italic font-bold">
              Legend slot
            </span>
          </template>
          <template #label="{ item }">
            <span class="italic">
              {{ item.label }}
            </span>
          </template>
        </B24RadioGroup>
      </div>
    </ExampleCard>

    <ExampleCard title="Indicator start">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :variant="variant" :items="items" default-value="3" indicator="start" />
      </div>
    </ExampleCard>

    <ExampleCard title="Indicator end">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :variant="variant" :items="items" default-value="3" indicator="end" />
      </div>
    </ExampleCard>

    <ExampleCard title="Indicator hidden">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup :variant="variant" :items="items" default-value="3" indicator="hidden" />
      </div>
    </ExampleCard>

    <ExampleCard title="Horizontal" class="md:col-span-2 overflow-x-auto">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup
          :items="items"
          aria-label="Horizontal"
          orientation="horizontal"
          :variant="variant"
          :b24ui="{ label: 'whitespace-nowrap' }"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>

  <ExampleGrid v-once class="mt-4">
    <template v-for="size in sizes" :key="size">
      <ExampleCard :title="size as string">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
          <B24RadioGroup
            :size="size"
            :items="items"
            :variant="variant"
            :legend="`legend for ${size}`"
            :aria-label="`legend for ${size}`"
          />
        </div>
      </ExampleCard>
      <ExampleCard :title="size as string">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
          <B24RadioGroup
            :size="size"
            :items="itemsWithDescription"
            :variant="variant"
            :legend="`legend with description for ${size}`"
            :aria-label="`legend with description for ${size}`"
          />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
</template>
