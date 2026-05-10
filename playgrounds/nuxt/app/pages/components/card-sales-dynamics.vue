<script setup lang="ts">
const rows = [
  { label: 'Active deals', count: 10, amount: '$46,500' },
  { label: 'Won deals', count: 1, amount: '$10,000' }
]

const highlight = {
  label: 'Conversion',
  count: '10%',
  amount: '17.7%',
  info: 'Today vs. last 30 days'
}
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col max-w-md mx-auto' }">
    <SalesDynamicsWidget
      title="Repeat sales dynamics"
      total-line="Total deals created: 10"
      today-line="Today: 10 deals"
      range-label="Last 30 days"
      :rows="rows"
      :highlight="highlight"
      @range="() => console.log('range click')"
      @configure="() => console.log('configure click')"
      @feedback="() => console.log('feedback click')"
    />
  </PlaygroundPage>
</template>
