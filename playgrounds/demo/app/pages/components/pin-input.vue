<script setup lang="ts">
import theme from '#build/b24ui/pin-input'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('PinInput')

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const onComplete = (e: string[]) => {
  console.log(e)
}
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="simple" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex gap-4">
        <B24PinInput placeholder="○" autofocus @complete="onComplete" />
      </div>

      <div class="mt-3 flex items-center gap-2">
        <B24PinInput placeholder="○" />
      </div>
    </ExampleCard>

    <ExampleCard title="some color" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex items-center gap-2">
        <B24PinInput
          placeholder="○"
          color="air-primary"
        />
      </div>

      <div class="mt-3 flex items-center gap-2">
        <B24PinInput
          placeholder="○"
          highlight
          color="air-primary-alert"
          aria-invalid="true"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="some more" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex flex-col gap-4">
        <B24PinInput placeholder="○" disabled />
        <B24PinInput placeholder="○" required />
      </div>
    </ExampleCard>

    <ExampleCard title="size" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex flex-col gap-4">
        <B24PinInput
          v-for="size in sizes"
          :key="size"
          placeholder="○"
          :size="size"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
