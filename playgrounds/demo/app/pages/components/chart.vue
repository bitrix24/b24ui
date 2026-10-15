<script setup lang="ts">
import theme from '#build/b24ui/chart'

const types = Object.keys(theme.variants.type) as Array<keyof typeof theme.variants.type>

const attrs = reactive({
  type: ['line', 'bar'] as Array<keyof typeof theme.variants.type>
})

const singleAttrs = reactive({
  curve: 'linear' as 'linear' | 'monotone' | 'step',
  stacked: false,
  points: false,
  grid: true,
  xAxis: true,
  yAxis: true,
  legend: true
})

const data = [
  { month: 'January', desktop: 186, mobile: 80, tablet: 40 },
  { month: 'February', desktop: 305, mobile: 200, tablet: 90 },
  { month: 'March', desktop: 237, mobile: 120, tablet: 75 },
  { month: 'April', desktop: 73, mobile: 190, tablet: 60 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 110 },
  { month: 'June', desktop: 214, mobile: 140, tablet: 95 }
]

const categories = [
  { key: 'desktop' as const, label: 'Desktop' },
  { key: 'mobile' as const, label: 'Mobile' },
  { key: 'tablet' as const, label: 'Tablet' }
]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.type"
        class="w-40"
        :items="types"
        placeholder="Type"
        multiple
        size="xs"
      />
      <B24Select v-model="singleAttrs.curve" class="w-32" :items="['linear', 'monotone', 'step']" placeholder="Curve" size="xs" />
      <B24Switch v-model="singleAttrs.stacked" label="Stacked" size="xs" />
      <B24Switch v-model="singleAttrs.points" label="Points" size="xs" />
      <B24Switch v-model="singleAttrs.grid" label="Grid" size="xs" />
      <B24Switch v-model="singleAttrs.xAxis" label="X axis" size="xs" />
      <B24Switch v-model="singleAttrs.yAxis" label="Y axis" size="xs" />
      <B24Switch v-model="singleAttrs.legend" label="Legend" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ body: 'gap-6' }">
      <B24Chart
        :data="data"
        index="month"
        :categories="categories"
        :aria-label="`Visitors by device (${props?.type})`"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-[36rem]"
      />
    </Matrix>
  </PlaygroundPage>
</template>
