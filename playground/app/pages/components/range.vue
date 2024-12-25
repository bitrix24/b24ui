<script setup lang="ts">
import { onMounted, ref } from 'vue'
import theme from '#build/b24ui/range'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Range')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

const value = ref(50)
const value2 = ref([40, 80])
const value22 = ref([40, 80])
const value3 = ref([15, 40, 80])

const isDisabled = ref(false)

onMounted(() => {
  isDisabled.value = true
})
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="color">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-6 flex flex-col items-center gap-4">
          <B24Range v-model="value" :color="color" />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="statuses">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range v-model="value" />
        <B24Range :default-value="100" />
        <B24Range :default-value="40" inverted />
      </div>
      <ExampleCardSubTitle title="disabled" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range :disabled="isDisabled" />
        <B24Range v-model="value" :disabled="isDisabled" />
      </div>
      <ExampleCardSubTitle title="step" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range :min="4" :max="12" :step="2" :model-value="6" />
        <B24Range v-model="value22" :min-steps-between-thumbs="20" />
      </div>
      <ExampleCardSubTitle title="model" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range v-model="value2" />
        <B24Range v-model="value3" />
      </div>
    </ExampleCard>

    <ExampleCard title="size">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-6 flex flex-col items-center gap-4">
          <B24Range v-model="value" :size="size" />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="vertical">
      <div class="mb-6 h-48 flex flex-row items-center justify-center gap-16">
        <B24Range v-model="value" orientation="vertical" />
        <B24Range v-model="value2" :min-steps-between-thumbs="20" orientation="vertical" />
        <B24Range v-model="value3" orientation="vertical" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
