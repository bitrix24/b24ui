<script setup lang="ts">
import theme from '#build/b24ui/form-field'

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)

const attrs = reactive({
  size: [theme.defaultVariants.size],
  orientation: [theme.defaultVariants.orientation]
})

const feedbacks = [
  { description: 'This is a description' },
  { error: 'This is an error' },
  { hint: 'This is a hint' },
  { help: 'This is a help' },
  { required: true }
]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" multiple placeholder="Size" />
      <B24Select v-model="attrs.orientation" class="w-44" :items="orientations" multiple placeholder="Orientation" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-100' }">
      <template v-for="(feedback, index) in feedbacks" :key="index">
        <B24FormField label="Email" name="email" v-bind="{ ...feedback, ...props }" class="data-[orientation=horizontal]:w-full">
          <B24Input placeholder="john@lennon.com" />
        </B24FormField>
      </template>
    </Matrix>
  </PlaygroundPage>
</template>
