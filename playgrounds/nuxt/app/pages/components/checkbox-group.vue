<script setup lang="ts">
import theme from '#build/b24ui/checkbox-group'
import themeCheckbox from '#build/b24ui/checkbox'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
const variants = Object.keys(theme.variants.variant)
const indicators = Object.keys(themeCheckbox.variants.indicator)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
  indicator: [themeCheckbox.defaultVariants.indicator]
})

const singleAttrs = reactive({
  orientation: orientations[0],
  disabled: false
})

const value = ref(['1'])
const items = [
  { value: '1', label: 'System' },
  { value: '2', label: 'Light' },
  { value: '3', label: 'Dark' }
]
const itemsWithDesc = ref([
  {
    label: 'System',
    description: 'This is the first option.',
    value: 'system'
  },
  {
    label: 'Light',
    description: 'This is the second option.',
    value: 'light'
  },
  {
    label: 'Dark',
    description: 'This is the third option.',
    value: 'dark'
  }
])

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
      <B24Switch v-model="singleAttrs.disabled" class="w-24" label="Disabled" />
    </template>
    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'grow-0', body: 'overflow-x-auto' }">
      <B24CheckboxGroup v-model="value" :items="items" v-bind="{ ...singleAttrs, ...props }" />
      <B24CheckboxGroup :items="items" :default-value="value" v-bind="{ ...singleAttrs, ...props }" />
      <B24CheckboxGroup :items="itemsWithDesc" v-bind="{ ...singleAttrs, ...props }" />
      <B24CheckboxGroup v-model="value" :items="items" legend="Legend" v-bind="{ ...singleAttrs, ...props }" required />
      <B24CheckboxGroup v-model="value" :items="items" v-bind="{ ...singleAttrs, ...props }">
        <template #legend>
          <span class="italic font-bold">
            Legend with slots
          </span>
        </template>
        <template #label="{ item }">
          <span class="italic">
            {{ item.label }}
          </span>
        </template>
      </B24CheckboxGroup>
    </Matrix>
  </PlaygroundPage>
</template>
