<script setup lang="ts">
import theme from '#build/b24ui/radio-group'
import type { RadioGroupItem } from '@bitrix24/b24ui-nuxt'

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const indicators = Object.keys(theme.variants.indicator)
const orientations = Object.keys(theme.variants.orientation)

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
  indicator: [theme.defaultVariants.indicator]
})

const singleAttrs = reactive({
  orientation: theme.defaultVariants.orientation,
  required: false,
  disabled: false
})

const items: RadioGroupItem[] = [
  { value: '1', label: 'Basic' },
  { value: '2', label: 'Standard' },
  { value: '3', label: 'Professional' },
  { value: '4', label: 'Enterprise' }
]

const itemsWithDescription: RadioGroupItem[] = [
  { value: '1', label: 'Basic', description: 'includes 5 users' },
  { value: '2', label: 'Standard', description: 'includes 50 users' },
  { value: '3', label: 'Professional', description: 'includes 100 users' },
  { value: '4', label: 'Enterprise', description: 'includes 250 users' }
]

const value = ref<string | undefined>(undefined)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="multipleAttrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="multipleAttrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="multipleAttrs.variant" class="w-32" :items="variants" placeholder="Variant" multiple />
      <B24Select v-model="multipleAttrs.indicator" class="w-32" :items="indicators" placeholder="Indicator" multiple />
      <B24Select v-model="singleAttrs.orientation" class="w-32" :items="orientations" placeholder="Orientation" />

      <B24Switch v-model="singleAttrs.required" label="Required" />
      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-80' }">
      <B24RadioGroup v-model="value" :items="items" default-value="2" v-bind="{ ...singleAttrs, ...props }" />
      <B24RadioGroup v-model="value" legend="Items with description" :items="itemsWithDescription" v-bind="{ ...singleAttrs, ...props }" />
      <B24RadioGroup v-model="value" :items="items" v-bind="{ ...singleAttrs, ...props }">
        <template #legend>
          <span class="italic font-(--ui-font-weight-bold)">
            With legend and label slots
          </span>
        </template>
        <template #label="{ item }">
          <span class="italic">
            {{ item.label }}
          </span>
        </template>
      </B24RadioGroup>
    </Matrix>
  </PlaygroundPage>
</template>
