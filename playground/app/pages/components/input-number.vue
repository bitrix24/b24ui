<script setup lang="ts">
import theme from '#build/b24ui/input-number'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('InputNumber')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const tagColors = Object.keys(theme.variants.tagColor) as Array<keyof typeof theme.variants.tagColor>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          placeholder="Insert value&hellip;"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          color="success"
          underline
          placeholder="Insert value&hellip;"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          no-border
          placeholder="Insert value&hellip;"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          no-padding
          placeholder="Insert value&hellip;"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputNumber
          placeholder="Insert value&hellip;"
          highlight
          color="danger"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24InputNumber placeholder="Disabled" disabled />
        <B24InputNumber placeholder="Required" required />
        <B24InputNumber
          placeholder="Rounded"
          rounded
        />
        <B24InputNumber
          placeholder="Rounded"
          rounded
          orientation="vertical"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24InputNumber
            placeholder="Insert value&hellip;"
            :color="color"
            highlight
            class="w-3/4"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="tag">
      <template v-for="tagColor in tagColors" :key="tagColor">
        <ExampleCardSubTitle :title="tagColor as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24InputNumber
            :tag-color="tagColor"
            tag="some text"
            placeholder="Insert value&hellip;"
            class="w-3/4"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="size" class="sm:col-span-3">
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
            :increment="{
              color: 'collab',
              depth: 'light'
            }"
            :decrement="{
              color: 'collab',
              depth: 'light'
            }"
          />

          <B24InputNumber
            orientation="vertical"
            placeholder="Insert value&hellip;"
            :size="size"
            class="w-40"
            :increment="{
              color: 'secondary',
              depth: 'dark'
            }"
            :decrement="{
              color: 'secondary',
              depth: 'dark'
            }"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
