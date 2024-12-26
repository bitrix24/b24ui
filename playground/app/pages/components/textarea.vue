<script setup lang="ts">
import theme from '#build/b24ui/textarea'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Textarea')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const rows = [1, 2, 3, 4]
const tagColors = Object.keys(theme.variants.tagColor) as Array<keyof typeof theme.variants.tagColor>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="autofocus" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Textarea autofocus name="something" aria-label="Type something" />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Textarea
          color="success"
          underline
          name="something"
          placeholder="Type something&hellip;"
          aria-label="Type something"
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Textarea
          no-border
          name="something"
          placeholder="Type something&hellip;"
          aria-label="Type something"
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Textarea
          no-padding
          name="something"
          placeholder="Type something&hellip;"
          aria-label="Type something"
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Textarea
          color="danger"
          highlight
          name="something"
          placeholder="Type something&hellip;"
          aria-label="Type something"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4 w-full">
        <B24Textarea name="disabled" placeholder="Disabled" aria-label="Disabled" disabled />
        <B24Textarea name="required" placeholder="Required" aria-label="Required" required />
        <B24Textarea name="rounded" placeholder="Rounded" aria-label="Rounded" rounded />
      </div>
    </ExampleCard>

    <ExampleCard title="color">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Textarea
            name="something"
            placeholder="Type something&hellip;"
            aria-label="Type something"
            :color="color"
            highlight
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="tag">
      <template v-for="tagColor in tagColors" :key="tagColor">
        <ExampleCardSubTitle :title="tagColor as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Textarea :tag-color="tagColor" tag="some text" name="something" placeholder="Type something&hellip;" aria-label="Type something" />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="rows autoresize" class="sm:col-span-2">
      <template v-for="row in rows" :key="row">
        <ExampleCardSubTitle :title="String(row)" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Textarea name="something" placeholder="Type something&hellip;" aria-label="Type something" class="w-3/4" autoresize :maxrows="5" :rows="row" />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
