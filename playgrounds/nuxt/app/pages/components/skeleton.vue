<script setup lang="ts">
import theme from '#build/b24ui/skeleton'

const accents = Object.keys(theme.variants.accent)

const attrs = reactive({
  accent: [theme.defaultVariants.accent]
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.accent" class="w-32" :items="accents" placeholder="Accent" multiple />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24Skeleton class="h-12 w-12 rounded-full" v-bind="props" />
      <div class="space-y-2">
        <B24Skeleton class="h-4 w-[150px]" v-bind="props" />
        <B24Skeleton class="h-4 w-[100px]" v-bind="props" />
      </div>
    </Matrix>
  </PlaygroundPage>
</template>
