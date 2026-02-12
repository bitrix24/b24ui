<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import theme from '#build/b24ui/input-date'
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

const value = shallowRef(new CalendarDate(2022, 1, 10))
const range = shallowRef({
  start: new CalendarDate(2022, 1, 10),
  end: new CalendarDate(2022, 1, 20)
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24InputDate v-model="value" autofocus v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate :default-value="new CalendarDate(2022, 1, 10)" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate :default-value="new CalendarDate(2022, 1, 10)" locale="ru" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate v-model="range" range v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate :default-value="{ start: new CalendarDate(2022, 1, 10), end: new CalendarDate(2022, 1, 20) }" range v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate locale="ru" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate required v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate no-padding v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate no-border v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate underline v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate tag="note" tag-color="air-primary-alert" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate :icon="ClockIcon" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate :avatar="{ src: 'https://github.com/bitrix24.png' }" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputDate :icon="ClockIcon" :trailing-icon="ChevronDownLIcon" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
    </Matrix>
  </PlaygroundPage>
</template>
