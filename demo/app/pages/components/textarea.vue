<script setup lang="ts">
import theme from '#build/b24ui/textarea'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'

usePageMeta.setPageTitle('Textarea')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const rows = [1, 2, 3, 4]

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
      <ExampleCardSubTitle title="autofocus" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Textarea
          autofocus
          name="something"
          placeholder="Type something&hellip;"
          aria-label="Type something"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Textarea
          color="air-primary-success"
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
          highlight
          name="something"
          placeholder="Type something&hellip;"
          aria-label="Type something"
          color="air-primary-alert"
          aria-invalid="true"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="some more" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-col gap-4 w-full">
        <B24Textarea
          name="disabled"
          placeholder="Disabled"
          aria-label="Disabled"
          disabled
          :rows="2"
        />
        <B24Textarea
          name="required"
          placeholder="Required"
          aria-label="Required"
          required
          :rows="1"
        />
        <B24Textarea
          name="rounded"
          placeholder="Rounded"
          aria-label="Rounded"
          rounded
          :rows="3"
        />
        <B24Textarea
          :icon="RocketIcon"
          placeholder="Type something&hellip;"
          autoresize
          :rows="1"
        />
        <B24Textarea
          :icon="RocketIcon"
          trailing
          placeholder="Type something&hellip;"
          autoresize
          :rows="2"
        />

        <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
          <B24Textarea
            :icon="RocketIcon"
            :trailing-icon="TaskIcon"
            placeholder="Textarea"
            autoresize
            :rows="1"
            :maxrows="0"
          />
          <B24Input
            :icon="RocketIcon"
            :trailing-icon="TaskIcon"
            name="some_value"
            placeholder="Input"
            aria-label="Insert value"
            size="md"
            class="w-40"
          />
        </div>
        <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
          <B24Textarea
            :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
            :trailing-icon="TaskIcon"
            placeholder="Textarea"
            autoresize
            :rows="1"
            :maxrows="0"
          />
          <B24Input
            :avatar="{ src: '/b24ui/demo/avatar/assistant.png' }"
            :trailing-icon="TaskIcon"
            name="some_value"
            placeholder="Input"
            aria-label="Insert value"
            size="md"
            class="w-40"
          />
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="loading" :use-bg="isUseBg">
      <ExampleCardSubTitle title="loading" />
      <div class="mb-4 flex flex-col gap-4 w-full">
        <B24Textarea
          loading
          name="some_value"
          placeholder="Type something&hellip;"
          aria-label="Type something"
          :rows="2"
        />
        <B24Textarea
          loading
          trailing
          name="some_value"
          placeholder="Type something&hellip;"
          aria-label="Type something"
          :rows="1"
        />
        <B24Textarea
          loading
          :icon="RocketIcon"
          :trailing-icon="TaskIcon"
          name="some_value"
          placeholder="Type something&hellip;"
          aria-label="Type something"
          :rows="3"
        />
        <B24Textarea
          loading
          :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
          name="some_value"
          placeholder="Type something&hellip;"
          aria-label="Type something"
          :rows="2"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color" :use-bg="isUseBg">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Textarea
            name="something"
            placeholder="Type something&hellip;"
            aria-label="Type something"
            :color="color"
            highlight
            :rows="2"
          />

          <B24Textarea
            :tag-color="color"
            tag="some text"
            name="something"
            placeholder="Type something&hellip;"
            aria-label="Type something"
            :color="color"
            highlight
            :rows="2"
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
              <B24Textarea
                name="something"
                placeholder="Type something&hellip;"
                aria-label="Type something"
                :color="color"
                highlight
                :rows="2"
              />

              <B24Textarea
                :tag-color="color"
                tag="some text"
                name="something"
                placeholder="Type something&hellip;"
                aria-label="Type something"
                :color="color"
                highlight
                :rows="2"
              />
            </div>
          </template>
        </template>
      </B24Collapsible>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Autoresize" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="Some cases" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <template v-for="row in rows" :key="row">
        <ExampleCardSubTitle :title="String(row)" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Textarea
            name="something"
            placeholder="Type something&hellip;"
            aria-label="Type something"
            class="w-[250px]"
            autoresize
            :maxrows="5"
            :rows="row"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
