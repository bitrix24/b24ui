<script setup lang="ts">
import theme from '#build/b24ui/card'

const variants = Object.keys(theme.variants.variant)
const attrs = reactive({
  variant: [theme.defaultVariants.variant]
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.variant"
        class="w-56"
        :items="variants"
        placeholder="Variant"
        multiple
        size="xs"
      />
    </template>

    <Matrix :attrs="attrs">
      <template #item="props">
        <B24Card
          title="Card title"
          description="A short description for the card."
          v-bind="props"
          :b24ui="{ footer: 'flex justify-end' }"
          class="w-60"
        >
          <Placeholder class="h-32" />

          <template #footer>
            <B24Button size="lg" color="air-primary" label="Save" />
          </template>
        </B24Card>
      </template>
    </Matrix>

    <SalesDynamicsWidget
      class="max-w-md mx-auto"
      title="Repeat sales dynamics"
      total-line="Total deals created: 10"
      today-line="Today: 10 deals"
      range-label="Last 30 days"
      :rows="[
        { label: 'Active deals', count: 10, amount: '$46,500' },
        { label: 'Won deals', count: 1, amount: '$10,000' }
      ]"
      :highlight="{
        label: 'Conversion',
        count: '10%',
        amount: '17.7%',
        info: 'Today vs. last 30 days'
      }"
    />
  </PlaygroundPage>
</template>
