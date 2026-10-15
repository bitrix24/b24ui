<script setup lang="ts">
import theme from '#build/b24ui/chart'

const types = Object.keys(theme.variants.type) as Array<keyof typeof theme.variants.type>

const type = ref<keyof typeof theme.variants.type>('line')
const curve = ref<'linear' | 'monotone' | 'step'>('linear')
const stacked = ref(false)
const points = ref(false)
const grid = ref(true)
const xAxis = ref(true)
const yAxis = ref(true)
const legend = ref(true)
const thickness = ref(24)

// Each option only shows for the types it applies to
const isCartesian = computed(() => type.value !== 'donut')
const hasCurve = computed(() => type.value === 'line' || type.value === 'area')
const hasStacked = computed(() => type.value === 'area' || type.value === 'bar')

const data = [
  { month: 'January', desktop: 186, mobile: 80, tablet: 40, revenue: 18600 },
  { month: 'February', desktop: 305, mobile: 200, tablet: 90, revenue: 30500 },
  { month: 'March', desktop: 237, mobile: 120, tablet: 75, revenue: 23700 },
  { month: 'April', desktop: 73, mobile: 190, tablet: 60, revenue: 27300 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 110, revenue: 20900 },
  { month: 'June', desktop: 214, mobile: 140, tablet: 95, revenue: 31400 }
]

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' })
</script>

<template>
  <Navbar />

  <div class="flex flex-col gap-8 p-4">
    <div class="flex flex-wrap items-center gap-4">
      <B24SelectMenu v-model="type" :items="types" class="w-32" />
      <B24SelectMenu v-if="hasCurve" v-model="curve" :items="['linear', 'monotone', 'step']" class="w-32" />
      <B24Switch v-if="hasStacked" v-model="stacked" label="Stacked" />
      <B24Switch v-if="type === 'line'" v-model="points" label="Points" />
      <B24Switch v-if="isCartesian" v-model="grid" label="Grid" />
      <B24Switch v-if="isCartesian" v-model="xAxis" label="X axis" />
      <B24Switch v-if="isCartesian" v-model="yAxis" label="Y axis" />
      <B24Switch v-model="legend" label="Legend" />
      <B24InputNumber v-if="type === 'donut'" v-model="thickness" :min="4" :max="100" class="w-28" />
    </div>

    <div class="grid gap-8 w-full max-w-3xl">
      <B24Card>
        <B24Chart
          :type="type"
          :curve="curve"
          :stacked="stacked"
          :points="points"
          :grid="grid"
          :x-axis="xAxis"
          :y-axis="yAxis"
          :legend="legend"
          :thickness="thickness"
          :data="data"
          index="month"
          :categories="[{ key: 'desktop', label: 'Desktop' }, { key: 'mobile', label: 'Mobile' }, { key: 'tablet', label: 'Tablet' }]"
          aria-label="Visitors by device"
        />
      </B24Card>

      <B24Card>
        <B24Chart
          :type="type"
          :curve="curve"
          :points="points"
          :grid="grid"
          :x-axis="xAxis"
          :y-axis="yAxis"
          :legend="legend"
          :thickness="thickness"
          :data="data"
          index="month"
          :categories="[{ key: 'revenue', label: 'Revenue' }]"
          :colors="isCartesian ? ['air-primary-success'] : undefined"
          :format="value => currency.format(value)"
          aria-label="Revenue"
        />
      </B24Card>
    </div>
  </div>
</template>
