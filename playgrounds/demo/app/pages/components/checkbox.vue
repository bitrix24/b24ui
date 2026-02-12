<script setup lang="ts">
import theme from '#build/b24ui/checkbox'

const checked = ref(true)

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const indicators = Object.keys(theme.variants.indicator)

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
  indicator: [theme.defaultVariants.indicator]
})

const singleAttrs = reactive({
  disabled: false,
  required: false
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
      <B24Select v-model="multipleAttrs.variant" class="w-40" :items="variants" placeholder="Variant" multiple />
      <B24Select v-model="multipleAttrs.indicator" class="w-44" :items="indicators" placeholder="Indicator" multiple />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.required" label="Required" />
      <B24Switch v-model="checked" label="Checked" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-80' }">
      <B24Checkbox
        v-model="checked"
        label="Check me"
        name="matrix"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24Checkbox
        default-value="indeterminate"
        label="With description"
        description="This is a description"
        name="matrix_desc"
        v-bind="{ ...singleAttrs, ...props }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
