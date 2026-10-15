<script setup lang="ts">
const data = [
  { month: 'January', revenue: 18600, expenses: 12400 },
  { month: 'February', revenue: 30500, expenses: 21800 },
  { month: 'March', revenue: 23700, expenses: 25100 },
  { month: 'April', revenue: 27300, expenses: 19600 },
  { month: 'May', revenue: 20900, expenses: 22300 },
  { month: 'June', revenue: 31400, expenses: 20700 }
]

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function profit(month?: string) {
  const row = data.find(row => row.month === month)

  return row ? row.revenue - row.expenses : 0
}
</script>

<template>
  <B24Chart
    type="bar"
    :data="data"
    index="month"
    :categories="[{ key: 'revenue', label: 'Revenue', color: 'air-primary-success' }, { key: 'expenses', label: 'Expenses', color: 'air-primary-alert' }]"
    :format="value => currency.format(value)"
    aria-label="Revenue and expenses"
  >
    <template #tooltip="{ title, rows }">
      <p class="font-(--ui-font-weight-medium)">
        {{ title }}
      </p>

      <div v-for="row in rows" :key="row.label" class="flex items-center gap-2">
        <span class="size-2 rounded-full" :style="{ backgroundColor: row.color }" />
        <span class="opacity-75">{{ row.label }}</span>
        <span class="ms-auto ps-4 tabular-nums">{{ row.value }}</span>
      </div>

      <B24Separator class="my-1" />

      <div class="flex items-center gap-2">
        <span class="opacity-75">Profit</span>
        <B24Badge
          :color="profit(title) >= 0 ? 'air-primary-success' : 'air-primary-alert'"
          :label="currency.format(profit(title))"
          size="sm"
          class="ms-auto tabular-nums"
        />
      </div>
    </template>
  </B24Chart>
</template>
