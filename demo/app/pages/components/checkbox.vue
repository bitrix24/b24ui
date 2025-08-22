<script setup lang="ts">
import theme from '#build/b24ui/checkbox'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Checkbox')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

const checked = ref(true)
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
    <ExampleCard title="color" :use-bg="isUseBg">
      <ExampleCardSubTitle title="default" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Checkbox v-model="checked" name="color_primary" label="default" />
        </div>
      </div>

      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="px-2 flex flex-col gap-4">
          <B24Checkbox
            v-for="color in airColors"
            :key="color"
            :color="color"
            :label="color"
            :default-value="true"
            name="color"
          />
        </div>
      </div>

      <B24Collapsible class="mb-2">
        <B24Button
          color="air-secondary-no-accent"
          label="Deprecate"
          use-dropdown
        />

        <template #content>
          <div class="my-4 flex flex-wrap flex-col items-start justify-start gap-4">
            <div class="px-2 flex flex-col gap-4">
              <B24Checkbox
                v-for="color in oldColors"
                :key="color"
                :color="color"
                :label="color"
                :default-value="true"
                name="color"
              />
            </div>
          </div>
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="statuses" :use-bg="isUseBg" class="mb-4">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Checkbox name="default_value" label="default value" :default-value="true" />
          <B24Checkbox name="indeterminate" label="indeterminate" default-value="indeterminate" />
          <B24Checkbox name="required" label="required" required />
          <B24Checkbox name="disabled" label="disabled" disabled />
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="simple" :use-bg="isUseBg" class="mb-4">
      <ExampleCardSubTitle title="size" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Checkbox
          v-for="size in sizes"
          :key="size"
          label="Check me"
          :size="size"
          name="size"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="with description" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <ExampleCardSubTitle title="card" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Checkbox
          v-for="size in sizes"
          :key="size"
          v-model="checked"
          label="Check me"
          description="This is a description"
          :size="size"
          variant="card"
          name="size_with_description"
        />
      </div>
      <ExampleCardSubTitle title="list" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Checkbox
          v-for="size in sizes"
          :key="size"
          v-model="checked"
          label="Check me"
          description="This is a description"
          :size="size"
          variant="list"
          name="size_with_description"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="indicator" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <ExampleCardSubTitle title="card" />

      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <B24Checkbox
            v-model="checked"
            label="Check me"
            :size="size"
            variant="card"
            indicator="start"
            name="size_with_description"
          />
          <B24Checkbox
            v-model="checked"
            label="Check me"
            :size="size"
            variant="card"
            indicator="end"
            name="size_with_description"
          />
          <B24Checkbox
            v-model="checked"
            label="Check me"
            :size="size"
            variant="card"
            indicator="hidden"
            name="size_with_description"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="indicator" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <ExampleCardSubTitle title="list" />

      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <B24Checkbox
            v-model="checked"
            label="Check me"
            :size="size"
            variant="list"
            indicator="start"
            name="size_with_description"
          />
          <B24Checkbox
            v-model="checked"
            label="Check me"
            :size="size"
            variant="list"
            indicator="end"
            name="size_with_description"
          />
          <B24Checkbox
            v-model="checked"
            label="Check me"
            :size="size"
            variant="list"
            indicator="hidden"
            name="size_with_description"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
