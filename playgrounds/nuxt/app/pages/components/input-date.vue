<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import usePageMeta from './../../composables/usePageMeta'
import theme from '#build/b24ui/input-date'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import ChevronDownLIcon from '@bitrix24/b24icons-vue/outline/ChevronDownLIcon'

usePageMeta.setPageTitle('InputDate')

const isUseBg = ref(false)

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const value = shallowRef(new CalendarDate(2022, 1, 10))
const range = shallowRef({
  start: new CalendarDate(2022, 1, 10),
  end: new CalendarDate(2022, 1, 20)
})
</script>

<template>
  <B24PageGrid v-once class="lg:grid-cols-4 gap-5">
    <B24Card variant="outline">
      <template #header>
        <div class="flex flex-row items-center justify-between gap-2">
          <ProseH5 class="mb-0">
            Options
          </ProseH5>
          <B24Switch v-model="isUseBg" label="isUseBg" size="xs" />
        </div>
      </template>
      <div class="mb-4 flex flex-col gap-4">
        <B24Select v-model="attrs.color" :items="colors" multiple />
        <B24Select v-model="attrs.size" :items="sizes" multiple />
      </div>
    </B24Card>

    <Matrix v-slot="props" :attrs="attrs">
      <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'">
        <template #header>
          <ProseH5 class="mb-0">
            {{ [props?.color, props?.size].join(' ') }}
          </ProseH5>
        </template>
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24InputDate v-model="value" autofocus v-bind="props" />
          <B24InputDate :default-value="new CalendarDate(2022, 1, 10)" v-bind="props" />
          <B24InputDate :default-value="new CalendarDate(2022, 1, 10)" locale="ru" v-bind="props" />
          <B24InputDate v-model="range" range v-bind="props" />
          <B24InputDate :default-value="{ start: new CalendarDate(2022, 1, 10), end: new CalendarDate(2022, 1, 20) }" range v-bind="props" />
          <B24InputDate locale="ru" v-bind="props" />
          <B24InputDate highlight v-bind="props" />
          <B24InputDate disabled v-bind="props" />
          <B24InputDate required v-bind="props" />
          <B24InputDate no-padding v-bind="props" />
          <B24InputDate no-border v-bind="props" />
          <B24InputDate underline v-bind="props" />
          <B24InputDate rounded v-bind="props" />
          <B24InputDate tag="note" tag-color="air-primary-alert" v-bind="props" />
          <B24InputDate :icon="ClockIcon" v-bind="props" />
          <B24InputDate :avatar="{ src: 'https://github.com/bitrix24.png' }" v-bind="props" />
          <B24InputDate loading v-bind="props" />
          <B24InputDate loading :icon="ClockIcon" :trailing-icon="ChevronDownLIcon" v-bind="props" />
        </div>
      </B24Card>
    </Matrix>
  </B24PageGrid>
</template>
