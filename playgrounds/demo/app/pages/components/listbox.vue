<script setup lang="ts">
import type { ListboxItem } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/listbox'

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const value = ref()

const filter = ref(true)
const disabled = ref(false)
const loading = ref(false)
const multiple = ref(false)
const virtualize = ref(false)

const virtualItems = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}))

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'].map(f => ({ label: f }))
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'].map(v => ({ label: v }))

const items = [
  [{ label: 'Fruits', type: 'label' as const }, ...fruits],
  [{ label: 'Vegetables', type: 'label' as const }, ...vegetables]
] satisfies ListboxItem[]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" :items="colors" placeholder="Color" multiple size="xs" />
      <B24Select v-model="attrs.size" :items="sizes" placeholder="Size" multiple size="xs" />
      <B24Switch v-model="filter" label="Filter" size="xs" />
      <B24Switch v-model="disabled" label="Disabled" size="xs" />
      <B24Switch v-model="loading" label="Loading" size="xs" />
      <B24Switch v-model="multiple" label="Multiple" size="xs" />
      <B24Switch v-model="virtualize" label="Virtualize" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" container-class="w-48">
      <B24Listbox
        v-model="value"
        autofocus
        :items="virtualize ? virtualItems : items"
        :filter="filter"
        :disabled="disabled"
        :loading="loading"
        :multiple="multiple"
        :virtualize="virtualize"
        v-bind="props"
        class="w-full"
      />
    </Matrix>
  </PlaygroundPage>
</template>
