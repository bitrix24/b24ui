<script setup lang="ts">
import { Time } from '@internationalized/date'
import theme from '#build/b24ui/input-time'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import ChevronDownLIcon from '@bitrix24/b24icons-vue/outline/ChevronDownLIcon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  disabled: false,
  loading: false,
  highlight: false,
  rounded: false
})

const value = shallowRef(new Time(12, 30))
const range = shallowRef({
  start: new Time(8, 0),
  end: new Time(16, 30)
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.color"
        size="xs"
        class="w-44"
        :items="airColors"
        placeholder="Color"
        multiple
      />
      <B24Select
        v-model="attrs.size"
        size="xs"
        class="w-32"
        :items="sizes"
        placeholder="Size"
        multiple
      />

      <B24Switch v-model="singleAttrs.disabled" size="xs" label="Disabled" />
      <B24Switch v-model="singleAttrs.loading" size="xs" label="Loading" />
      <B24Switch v-model="singleAttrs.highlight" size="xs" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" size="xs" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-70' }">
      <B24InputTime v-model="value" autofocus v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :default-value="new Time(12, 30)" v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :default-value="new Time(12, 30)" :hour-cycle="24" v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :default-value="new Time(12, 30)" locale="ru" v-bind="{ ...singleAttrs, ...props }" />

      <B24InputTime v-model="range" range v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :default-value="{ start: new Time(8, 0), end: new Time(16, 30) }" range v-bind="{ ...singleAttrs, ...props }" />

      <B24InputTime required v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :hour-cycle="24" v-bind="props" />
      <B24InputTime no-padding v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime no-border v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime underline v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime tag="note" tag-color="air-primary-copilot" v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :icon="ClockIcon" v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :avatar="{ src: 'https://github.com/bitrix24.png' }" trailing v-bind="{ ...singleAttrs, ...props }" />
      <B24InputTime :icon="ClockIcon" :trailing-icon="ChevronDownLIcon" v-bind="{ ...singleAttrs, ...props }" />
    </Matrix>
  </PlaygroundPage>
</template>
