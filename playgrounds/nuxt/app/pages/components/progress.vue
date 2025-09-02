<script setup lang="ts">
import { onMounted, ref } from 'vue'
import theme from '#build/b24ui/progress'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Progress')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const animations = Object.keys(theme.variants.animation) as Array<keyof typeof theme.variants.animation>

const value1 = ref(0)
const value2 = ref(0)
const max = ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']

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
  <ExampleGrid v-once>
    <ExampleCard title="color" :use-bg="isUseBg">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-6 flex flex-col items-center gap-4">
          <B24Progress :color="color" animation="elastic" />
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
              <B24Progress :color="color" animation="elastic" />
            </div>
          </template>
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="animation" :use-bg="isUseBg">
      <template v-for="animation in animations" :key="animation">
        <ExampleCardSubTitle :title="animation as string" />
        <div class="mb-6 flex flex-col items-center gap-4">
          <B24Progress :animation="animation" />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="status" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-6 flex flex-col items-center gap-4">
        <B24Progress v-model="value2" :max="max" status size="xs" />
      </div>

      <ExampleCardSubTitle title="inverted" />
      <div class="mb-6 flex flex-col items-center gap-4">
        <B24Progress v-model="value2" :max="max" status inverted />
      </div>
    </ExampleCard>

    <ExampleCard title="size" :use-bg="isUseBg">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-6 flex flex-col items-center gap-4">
          <B24Progress v-model="value1" :size="size" />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Vertical" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="color" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-6 h-48 flex flex-row items-center justify-center gap-8">
        <template v-for="color in airColors" :key="color">
          <B24Progress orientation="vertical" :color="color" animation="swing" />
        </template>
      </div>
    </ExampleCard>

    <ExampleCard title="animation" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-6 h-48 flex flex-row items-center justify-center gap-8">
        <template v-for="animation in animations" :key="animation">
          <B24Progress orientation="vertical" :animation="animation" />
        </template>
      </div>
    </ExampleCard>

    <ExampleCard title="status" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-6 h-48 flex flex-row items-center justify-start gap-2">
        <B24Progress v-model="value2" orientation="vertical" :max="max" status class="w-48 justify-start" />
        <B24Progress
          v-model="value2"
          orientation="vertical"
          :max="max"
          status
          inverted
          size="xs"
          class="w-48 justify-start"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="size" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-6 h-48 flex flex-row items-center justify-center gap-8">
        <template v-for="size in sizes" :key="size">
          <B24Progress v-model="value1" orientation="vertical" :size="size" />
        </template>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
