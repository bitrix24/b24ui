<script setup lang="ts">
import theme from '#build/b24ui/input-number'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('InputNumber')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

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
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base" :use-bg="isUseBg">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          placeholder="Insert value&hellip;"
          class="w-40"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          color="air-primary-success"
          underline
          placeholder="Insert value&hellip;"
          class="w-40"
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          no-border
          placeholder="Insert value&hellip;"
          class="w-40"
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          no-padding
          placeholder="Insert value&hellip;"
          class="w-40"
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          placeholder="Insert value&hellip;"
          highlight
          color="air-primary-alert"
          class="w-40"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4">
        <B24InputNumber
          placeholder="Disabled"
          disabled
          class="w-40"
        />
        <B24InputNumber
          placeholder="Required"
          required
          class="w-40"
        />
        <B24InputNumber
          placeholder="Rounded"
          rounded
          class="w-40"
        />
        <B24InputNumber
          placeholder="Rounded"
          rounded
          orientation="vertical"
          class="w-40"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color" :use-bg="isUseBg" class="sm:col-span-2">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24InputNumber
            placeholder="Insert value&hellip;"
            :color="color"
            highlight
            class="w-40"
          />

          <B24InputNumber
            :tag-color="color"
            tag="some text"
            placeholder="Insert value&hellip;"
            :color="color"
            highlight
            class="w-40"
          />
        </div>
      </template>

      <B24Collapsible class="mb-2">
        <B24Button
          color="air-secondary-no-accent"
          label="Deprecate"
          use-dropdown
        />
        <template #content>
          <template v-for="color in oldColors" :key="color">
            <ExampleCardSubTitle :title="color as string" />
            <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
              <B24InputNumber
                placeholder="Insert value&hellip;"
                :color="color"
                highlight
                class="w-40"
              />

              <B24InputNumber
                :tag-color="color"
                tag="some text"
                placeholder="Insert value&hellip;"
                :color="color"
                highlight
                class="w-40"
              />
            </div>
          </template>
        </template>
      </B24Collapsible>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Size" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="Some cases" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24InputNumber
            placeholder="Insert value&hellip;"
            :size="size"
            class="w-40"
          />

          <B24InputNumber
            orientation="vertical"
            placeholder="Insert value&hellip;"
            :size="size"
            class="w-40"
          />

          <B24InputNumber
            placeholder="Insert value&hellip;"
            :size="size"
            class="w-40"
            :increment="{ color: 'air-primary-success' }"
            :decrement="{ color: 'air-primary-success' }"
          />

          <B24InputNumber
            orientation="vertical"
            placeholder="Insert value&hellip;"
            :size="size"
            class="w-40"
            :increment="{ color: 'air-secondary' }"
            :decrement="{ color: 'air-secondary' }"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
