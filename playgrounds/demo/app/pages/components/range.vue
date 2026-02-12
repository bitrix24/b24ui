<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/range'

const value = ref(50)
const value2 = ref([40, 80])
const value22 = ref([40, 80])
const value3 = ref([15, 40, 80])

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  orientation: orientations[0],
  inverted: false,
  disabled: false
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="multipleAttrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="multipleAttrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="singleAttrs.orientation" class="w-44" :items="orientations" placeholder="Orientation" />

      <B24Switch v-model="singleAttrs.inverted" label="Inverted" />
      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
    </template>

    <Matrix
      v-slot="props"
      :attrs="multipleAttrs"
      :b24ui="{
        root: 'max-w-80',
        body: ['overflow-x-auto', singleAttrs.orientation === 'vertical' ? 'h-48 flex flex-row w-max' : 'w-64']
      }"
    >
      <B24Range v-model="value" v-bind="{ ...singleAttrs, ...props }" />
      <B24Range :default-value="80" v-bind="{ ...singleAttrs, ...props }" />
      <B24Separator label="Multiple" :orientation="singleAttrs.orientation" />
      <B24Range :default-value="value2" v-bind="{ ...singleAttrs, ...props }" />
      <B24Range :model-value="value22" v-bind="{ ...singleAttrs, ...props }" />
      <B24Range :model-value="value3" v-bind="{ ...singleAttrs, ...props }" />
      <B24Separator label="Steps" :orientation="singleAttrs.orientation" />
      <B24Range :min="4" :max="12" :step="2" :model-value="6" v-bind="{ ...singleAttrs, ...props }" />
      <B24Range :min-steps-between-thumbs="20" :model-value="value3" v-bind="{ ...singleAttrs, ...props }" />
    </Matrix>
  </PlaygroundPage>
</template>
