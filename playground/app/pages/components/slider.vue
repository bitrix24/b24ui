<script setup lang="ts">
import theme from '#build/b24ui/slider'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Slider')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const value = ref(50)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="demo" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="tmp" />
      <div class="flex flex-col gap-6 items-center">
        <div class="flex flex-col gap-6 w-48">
          <B24Slider v-model="value" />
          <B24Slider color="success" :model-value="50" />
          <B24Slider color="danger" :model-value="50" />
          <B24Slider :default-value="100" />
          <B24Slider inverted />
          <B24Slider disabled />
          <B24Slider :min="4" :max="12" :step="2" :model-value="6" />
        </div>

        <div class="flex flex-col gap-6 w-48">
          <B24Slider :default-value="[0, 20]" />
          <B24Slider :model-value="[0, 20]" />
          <B24Slider :model-value="[0, 20, 80]" />
          <B24Slider :model-value="[0, 80]" :min-steps-between-thumbs="20" />
        </div>

        <div class="flex items-center gap-6">
          <B24Slider v-for="size in sizes" :key="size" v-model="value" :size="size" class="w-48" />
        </div>

        <div class="h-48 flex items-center gap-6">
          <B24Slider :model-value="[0, 20, 80]" orientation="vertical" />
          <B24Slider v-model="value" orientation="vertical" />
          <B24Slider :model-value="[0, 80]" :min-steps-between-thumbs="20" orientation="vertical" />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
