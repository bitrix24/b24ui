<script setup lang="ts">
import theme from '#build/b24ui/radio-group'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('RadioGroup')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const color = ref('air-primary' as const)
const variants = Object.keys(theme.variants.variant) as Array<keyof typeof theme.variants.variant>
const variant = ref('table' as const) // list | card | table
const indicators = Object.keys(theme.variants.indicator) as Array<keyof typeof theme.variants.indicator>
const indicator = ref('start' as const)

const isUseBg = ref(false)

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

const value = ref<string | null>(null)

const oldColors = computed(() => {
  return colors.filter((color) => {
    return !color.includes('air')
  })
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="settings" :use-bg="isUseBg" class="sm:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-col sm:flex-row items-center justify-start gap-4">
        <div class="w-[100px]">
          <B24Select
            v-model="variant"
            :items="variants"
            class="w-[100px]"
          />
        </div>
        <div class="w-[100px]">
          <B24Select
            v-model="indicator"
            :items="indicators"
            class="w-[100px]"
          />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Color" type="dotted" />
  <ExampleGrid v-once>
    <template v-for="color in airColors" :key="color">
      <ExampleCard :title="color as string" :use-bg="isUseBg">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
          <B24RadioGroup
            v-model="value"
            :items="items"
            :color="color"
            :legend="color"
            :variant="variant"
            :indicator="indicator"
            :aria-label="color"
            default-value="1"
          />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>

  <B24Collapsible class="my-4">
    <B24Button
      color="air-secondary-no-accent"
      label="Deprecate"
      use-dropdown
    />
    <template #content>
      <ExampleGrid v-once class="mt-4">
        <template v-for="color in oldColors" :key="color">
          <ExampleCard :title="color as string" :use-bg="isUseBg">
            <B24Separator class="my-3" type="dotted" />
            <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
              <B24RadioGroup
                v-model="value"
                :items="items"
                :color="color"
                :legend="color"
                :variant="variant"
                :indicator="indicator"
                :aria-label="color"
                default-value="1"
              />
            </div>
          </ExampleCard>
        </template>
      </ExampleGrid>
    </template>
  </B24Collapsible>

  <ExampleGrid v-once>
    <ExampleCard title="settings" :use-bg="isUseBg" class="sm:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-col sm:flex-row items-center justify-start gap-4">
        <div class="w-[200px]">
          <B24Select
            v-model="color"
            :items="colors"
            class="w-[200px]"
          />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Orientation" type="dotted" />
  <ExampleGrid v-once>
    <ExampleCard title="horizontal" :use-bg="isUseBg" class="md:col-span-4 overflow-x-auto">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup
          v-model="value"
          :items="items"
          aria-label="Horizontal"
          orientation="horizontal"
          :color="color"
          :variant="variant"
          :indicator="indicator"
          :b24ui="{ label: 'whitespace-nowrap' }"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>



  <B24Separator accent="accent" class="my-4" label="Size" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <template v-for="size in sizes" :key="size">
      <ExampleCard :title="size as string" :use-bg="isUseBg">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
          <B24RadioGroup
            v-model="value"
            :size="size"
            :items="items"
            :color="color"
            :variant="variant"
            :indicator="indicator"
            :legend="`legend for ${size}`"
            :aria-label="`legend for ${size}`"
          />
        </div>
      </ExampleCard>
    </template>
    <template v-for="size in sizes" :key="size">
      <ExampleCard :title="size as string" :use-bg="isUseBg">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
          <B24RadioGroup
            v-model="value"
            :size="size"
            :items="itemsWithDescription"
            :color="color"
            :variant="variant"
            :indicator="indicator"
            :legend="`legend with description for ${size}`"
            :aria-label="`legend with description for ${size}`"
          />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Cases" type="dotted" />
  <ExampleGrid v-once>
    <ExampleCard title="default" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup
          v-model="value"
          :items="items"
          :color="color"
          :variant="variant"
          :indicator="indicator"
          aria-label="Default"
          default-value="1"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="literal options" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup
          :items="literalOptions"
          :color="color"
          :variant="variant"
          :indicator="indicator"
          aria-label="Literal options"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="required" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup
          v-model="value"
          :items="items"
          :color="color"
          :variant="variant"
          :indicator="indicator"
          required
          aria-label="Required"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="disabled" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup
          v-model="value"
          :items="items"
          :color="color"
          :variant="variant"
          :indicator="indicator"
          disabled
          aria-label="Disabled"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="with slots" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24RadioGroup
          v-model="value"
          :items="items"
          :color="color"
          :variant="variant"
          :indicator="indicator"
        >
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
  </ExampleGrid>
</template>
