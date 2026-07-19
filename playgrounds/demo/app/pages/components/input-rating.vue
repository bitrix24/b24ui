<script setup lang="ts">
import theme from '#build/b24ui/input-rating'
import Plus30Icon from '@bitrix24/b24icons-vue/actions/Plus30Icon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation)

const value = ref(3)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" :items="colors" multiple size="xs" />
      <B24Select v-model="attrs.size" :items="sizes" multiple size="xs" />
      <B24Select v-model="orientation" :items="orientations" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" container-class="gap-8">
      <B24InputRating v-model="value" :orientation="orientation" v-bind="props" />
      <B24InputRating :step="0.5" :model-value="2.5" :orientation="orientation" v-bind="props" />
      <B24InputRating :length="10" :model-value="7" :orientation="orientation" v-bind="props" />
      <B24InputRating readonly :model-value="4" :orientation="orientation" v-bind="props" />
      <B24InputRating disabled :model-value="3" :orientation="orientation" v-bind="props" />
      <B24InputRating :icon="Plus30Icon" :model-value="4" :orientation="orientation" v-bind="props" />
    </Matrix>
  </PlaygroundPage>
</template>
