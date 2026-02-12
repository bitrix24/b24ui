<script setup lang="ts">
import theme from '#build/b24ui/input-number'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  orientation: orientations[0],
  increment: true,
  decrement: true,
  disabled: false,
  highlight: false,
  rounded: false
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="singleAttrs.orientation" class="w-44" :items="orientations" placeholder="Orientation" />

      <B24Switch v-model="singleAttrs.increment" label="Increment" />
      <B24Switch v-model="singleAttrs.decrement" label="Decrement" />
      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-60' }">
      <B24InputNumber placeholder="Insert value&hellip;" class="w-full" v-bind="{ ...props, ...singleAttrs }" />
      <B24InputNumber placeholder="Underline" underline class="w-full" v-bind="{ ...props, ...singleAttrs }" />
      <B24InputNumber placeholder="No border" no-border class="w-full" v-bind="{ ...props, ...singleAttrs }" />
      <B24InputNumber placeholder="No padding" no-padding class="w-full" v-bind="{ ...props, ...singleAttrs }" />
      <B24InputNumber placeholder="Required" required class="w-full" v-bind="{ ...props, ...singleAttrs }" />
      <B24InputNumber
        placeholder="Tag"
        :tag-color="props?.color || 'air-primary'"
        tag="some text"
        class="w-full"
        v-bind="{ ...props, ...singleAttrs }"
      />
      <B24InputNumber
        placeholder="Accent controls"
        class="w-full"
        v-bind="{ ...props, ...singleAttrs }"
        :increment="{ color: 'air-primary-success' }"
        :decrement="{ color: 'air-primary-success' }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
