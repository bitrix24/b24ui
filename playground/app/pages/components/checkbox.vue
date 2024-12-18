<script setup lang="ts">
import theme from '#build/b24ui/checkbox'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Checkbox')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const checked = ref(true)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="Color">
      <ExampleCardSubTitle title="different color" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Checkbox label="Default" color="default" :default-value="true" />
          <B24Checkbox label="Danger" color="danger" :model-value="true" />
          <B24Checkbox label="Success" color="success" :model-value="true" />
          <B24Checkbox label="Warning" color="warning" :model-value="true" />
          <B24Checkbox v-model="checked" label="Primary" />
          <B24Checkbox label="Secondary" color="secondary" :model-value="true" />
          <B24Checkbox label="Ai" color="ai" :model-value="true" />
        </div>
      </div>
    </ExampleCard>
    <ExampleCard title="Statuses">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Checkbox label="Default value" :default-value="true" />
          <B24Checkbox label="Indeterminate" default-value="indeterminate" />
          <B24Checkbox label="Required" required />
          <B24Checkbox label="Disabled" disabled />
        </div>
      </div>
    </ExampleCard>
    <ExampleCard title="Size" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Checkbox v-for="size in sizes" :key="size" label="Check me" :size="size" />
      </div>
      <ExampleCardSubTitle title="with description" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Checkbox v-for="size in sizes" :key="size" label="Check me" description="This is a description" :size="size" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
