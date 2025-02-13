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
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="color">
      <ExampleCardSubTitle title="default" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Checkbox v-model="checked" name="color_primary" label="primary" />
        </div>
      </div>

      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Checkbox
            v-for="color in colors"
            :key="color"
            :color="color"
            :label="color"
            :default-value="true"
            name="color"
          />
        </div>
      </div>
    </ExampleCard>
    <ExampleCard title="statuses">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Checkbox name="default_value" label="Default value" :default-value="true" />
          <B24Checkbox name="indeterminate" label="Indeterminate" default-value="indeterminate" />
          <B24Checkbox name="required" label="Required" required />
          <B24Checkbox name="disabled" label="Disabled" disabled />
        </div>
      </div>
    </ExampleCard>
    <ExampleCard title="size" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Checkbox
          v-for="size in sizes"
          :key="size"
          label="Check me"
          :size="size"
          name="size"
        />
      </div>
      <ExampleCardSubTitle title="with description" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Checkbox
          v-for="size in sizes"
          :key="size"
          label="Check me"
          description="This is a description"
          :size="size"
          name="size_with_description"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
