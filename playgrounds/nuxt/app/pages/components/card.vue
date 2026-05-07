<script setup lang="ts">
import theme from '#build/b24ui/card'

const variants = Object.keys(theme.variants.variant)
const sizes = Object.keys(theme.variants.size)
const attrs = reactive({
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size]
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
      <B24Select
        v-model="attrs.size"
        class="w-32"
        :items="sizes"
        placeholder="Size"
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
  </PlaygroundPage>
</template>
