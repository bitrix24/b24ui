<script setup lang="ts">
import theme from '#build/b24ui/progress'

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)
const animations = Object.keys(theme.variants.animation)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const value1 = ref(0)
const value2 = ref(0)
const max = ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  animation: [theme.defaultVariants.animation]
})

const singleAttrs = reactive({
  orientation: orientations[0] as keyof typeof theme.variants.orientation,
  inverted: false
})

onMounted(() => {
  setInterval(() => {
    if (value1.value === 100) {
      value1.value = 0
      return
    }

    value1.value += 25
  }, 600)

  setInterval(() => {
    if (value2.value === 4) {
      value2.value = 0
      return
    }

    value2.value += 1
  }, 400)
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="attrs.animation" class="w-40" :items="animations" placeholder="Animation" multiple />
      <B24Select v-model="singleAttrs.orientation" class="w-40" :items="orientations" placeholder="Orientation" />
      <B24Switch v-model="singleAttrs.inverted" label="Inverted" />
    </template>

    <Matrix
      v-slot="props"
      :attrs="attrs"
      :b24ui="{ root: 'max-w-80', body: ['gap-4', singleAttrs.orientation === 'vertical' ? 'w-48 h-48 flex-row' : ''] }"
    >
      <B24Progress v-bind="{ ...singleAttrs, ...props }" />
      <B24Progress
        v-model="value2"
        :max="max"
        status
        v-bind="{ ...singleAttrs, ...props }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
