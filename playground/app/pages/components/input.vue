<script setup lang="ts">
import { upperFirst } from 'scule'
import theme from '#build/b24ui/input'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Input')

const colors = []
// const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const variants = []
// const variants = Object.keys(theme.variants.variant) as Array<keyof typeof theme.variants.variant>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="base" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input autofocus placeholder="Search..." />
      </div>
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4" />
      </template>
      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4" />
    </ExampleCard>
  </ExampleGrid>

  <!-- div class="flex flex-col items-center gap-4">
    <div class="flex flex-col gap-4 w-48">
      <B24Input autofocus placeholder="Search..." />
    </div>
    <div class="flex items-center gap-2">
      <B24Input v-for="variant in variants" :key="variant" :placeholder="upperFirst(variant)" :variant="variant" class="w-48" />
    </div>
    <div class="flex items-center gap-2">
      <B24Input
        v-for="variant in variants"
        :key="variant"
        :placeholder="upperFirst(variant)"
        :variant="variant"
        color="neutral"
        class="w-48"
      />
    </div>
    <div class="flex items-center gap-2">
      <B24Input
        v-for="variant in variants"
        :key="variant"
        :placeholder="upperFirst(variant)"
        :variant="variant"
        color="error"
        highlight
        class="w-48"
      />
    </div>
    <div class="flex flex-col gap-4 w-48">
      <B24Input placeholder="Disabled" disabled />
      <B24Input placeholder="Required" required />
      <B24Input file="i-lucide-calculator" type="number" :model-value="10" />
      <B24Input icon="i-lucide-folder" type="file" />
      <B24Input icon="i-lucide-calendar" type="date" :model-value="new Date().toISOString().substring(0, 10)" />
      <B24Input icon="i-lucide-lock" type="password" model-value="password" />
      <B24Input loading placeholder="Search..." />
      <B24Input loading trailing placeholder="Search..." />
      <B24Input loading icon="i-lucide-search" trailing-icon="i-lucide-chevron-down" placeholder="Search..." />
    </div>
    <div class="flex items-center gap-4">
      <B24Input
        v-for="size in sizes"
        :key="size"
        placeholder="Search..."
        :size="size"
        class="w-48"
      />
    </div>
    <div class="flex items-center gap-4">
      <B24Input
        v-for="size in sizes"
        :key="size"
        icon="i-lucide-search"
        placeholder="Search..."
        :size="size"
        class="w-48"
      />
    </div>
    <div class="flex items-center gap-4">
      <B24Input
        v-for="size in sizes"
        :key="size"
        icon="i-lucide-search"
        trailing
        placeholder="Search..."
        :size="size"
        class="w-48"
      />
    </div>
    <div class="flex items-center gap-4">
      <B24Input
        v-for="size in sizes"
        :key="size"
        :avatar="{ src: 'https://github.com/benjamincanac.png' }"
        icon="i-lucide-search"
        trailing
        placeholder="Search..."
        :size="size"
        class="w-48"
      />
    </div>
  </div -->
</template>
