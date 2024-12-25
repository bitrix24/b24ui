<script setup lang="ts">
import theme from '#build/b24ui/range'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Range')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const value = ref(50)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="demo" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="tmp" />
      <div class="flex flex-col gap-6 items-center">
        <div class="flex flex-col gap-6 w-48">
          <B24Range v-model="value" />
          <B24Range color="success" :model-value="50" />
          <B24Range color="danger" :model-value="50" />
          <B24Range :default-value="100" />
          <B24Range inverted />
          <B24Range disabled />
          <B24Range :min="4" :max="12" :step="2" :model-value="6" />
        </div>

        <div class="flex flex-col gap-6 w-48">
          <B24Range :default-value="[0, 20]" />
          <B24Range :model-value="[0, 20]" />
          <B24Range :model-value="[0, 20, 80]" />
          <B24Range :model-value="[0, 80]" :min-steps-between-thumbs="20" />
        </div>

        <div class="flex items-center gap-6">
          <B24Range v-for="size in sizes" :key="size" v-model="value" :size="size" class="w-48" />
        </div>

        <div class="h-48 flex items-center gap-6">
          <B24Range :model-value="[0, 20, 80]" orientation="vertical" />
          <B24Range v-model="value" orientation="vertical" />
          <B24Range :model-value="[0, 80]" :min-steps-between-thumbs="20" orientation="vertical" />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
