<script setup lang="ts">
import theme from '#build/b24ui/pin-input'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

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
  highlight: false,
  disabled: false
})

const onComplete = (value: string[]) => {
  console.log(value)
}
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24PinInput placeholder="○" autofocus v-bind="{ ...singleAttrs, ...props }" @complete="onComplete" />
      <B24PinInput placeholder="○" required v-bind="{ ...singleAttrs, ...props }" />
    </Matrix>
  </PlaygroundPage>
</template>
