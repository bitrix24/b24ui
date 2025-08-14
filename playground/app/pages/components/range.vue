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

const isUseBg = ref(true)

const oldColors = computed(() => {
  return colors.filter((color) => {
    return !color.includes('air')
  })
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

onMounted(() => {
  isDisabled.value = true
})
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="color" :use-bg="isUseBg">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-6 flex flex-col items-center gap-4">
          <B24Range v-model="value" :color="color" :aria-label="color" />
        </div>
      </template>
      <B24Collapsible class="my-4">
        <B24Button
          color="air-secondary-no-accent"
          label="Deprecate"
          use-dropdown
        />
        <template #content>
          <template v-for="color in oldColors" :key="color">
            <ExampleCardSubTitle :title="color as string" />
            <div class="mb-6 flex flex-col items-center gap-4">
              <B24Range v-model="value" :color="color" :aria-label="color" />
            </div>
          </template>
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="statuses" :use-bg="isUseBg">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range v-model="value" aria-label="Some range" />
        <B24Range :default-value="100" aria-label="Some range" />
        <B24Range :default-value="40" inverted aria-label="Some inverted range" />
      </div>
      <ExampleCardSubTitle title="disabled" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range :disabled="isDisabled" aria-label="Disabled" />
        <B24Range v-model="value" :disabled="isDisabled" aria-label="Disabled" />
      </div>
      <ExampleCardSubTitle title="step" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range :min="4" :max="12" :step="2" :model-value="6" aria-label="Some range" />
        <B24Range v-model="value22" :min-steps-between-thumbs="20" aria-label="Some range" />
      </div>
      <ExampleCardSubTitle title="model" />
      <div class="mb-6 flex flex-col items-center gap-8">
        <B24Range v-model="value2" aria-label="Some range" />
        <B24Range v-model="value3" aria-label="Some range" />
      </div>
    </ExampleCard>

    <ExampleCard title="size" :use-bg="isUseBg">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-6 flex flex-col items-center gap-4">
          <B24Range v-model="value" :size="size" :aria-label="size" />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="vertical" :use-bg="isUseBg">
      <div class="mb-6 h-48 flex flex-row items-center justify-center gap-16">
        <B24Range v-model="value" orientation="vertical" aria-label="Some vertical range" />
        <B24Range v-model="value2" :min-steps-between-thumbs="20" orientation="vertical" aria-label="Some vertical range" />
        <B24Range v-model="value3" orientation="vertical" aria-label="Some vertical range" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
