<script setup lang="ts">
import { vMaska } from 'maska/vue'
import theme from '#build/b24ui/input'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
// import FolderEmptyIcon from '@bitrix24/b24icons-vue/main/FolderEmptyIcon'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import CrossedEye2Icon from '@bitrix24/b24icons-vue/main/CrossedEye2Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'

usePageMeta.setPageTitle('Input')
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
      <ExampleCardSubTitle title="autofocus" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          autofocus
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          color="air-primary-success"
          underline
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          no-border
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          no-padding
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          highlight
          color="air-primary-alert"
          aria-invalid="true"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Input
          name="disabled"
          placeholder="Disabled"
          aria-label="Disabled"
          disabled
        />
        <B24Input
          name="required"
          placeholder="Required"
          aria-label="Required"
          required
        />
        <B24Input
          name="rounded"
          placeholder="Rounded"
          aria-label="Rounded"
          rounded
          :icon="ALetterIcon"
          :trailing-icon="TaskIcon"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="type" :use-bg="isUseBg">
      <ExampleCardSubTitle title="text" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Input
          type="text"
          name="text"
          aria-label="Some text"
          :icon="ALetterIcon"
        />
      </div>
      <ExampleCardSubTitle title="number" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Input
          type="number"
          name="number"
          aria-label="Some number"
          :icon="CalculatorIcon"
          :model-value="10"
        />
      </div>
      <ExampleCardSubTitle title="password" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Input
          type="password"
          name="password"
          aria-label="Some password"
          :icon="CrossedEye2Icon"
          model-value="E>]{78C(f+|9"
        />
      </div>
      <ExampleCardSubTitle title="search" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Input
          type="search"
          name="search"
          aria-label="Search"
          :icon="Search2Icon"
        />
      </div>

      <!-- / @memo types are supported but not used
      <ExampleCardSubTitle title="file" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="xss" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="xs" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="sm" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="md" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="lg" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="xl" />
      </div>

      <ExampleCardSubTitle title="make this" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input type="date" :model-value="new Date().toISOString().substring(0, 10)" />
        <B24Input type="checkbox" />
        <B24Input type="radio" />
        <B24Input type="week" />
        <B24Input type="hidden" />
        <B24Input type="range" />
        <B24Input type="image" />
        <B24Input type="color" />
        <B24Input type="submit" />
        <B24Input type="reset" />
      </div>
      / -->
    </ExampleCard>

    <ExampleCard title="loading" :use-bg="isUseBg">
      <ExampleCardSubTitle title="loading" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          loading
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
        <B24Input
          loading
          trailing
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
        <B24Input
          loading
          :icon="RocketIcon"
          :trailing-icon="TaskIcon"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
        <B24Input
          loading
          :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color" :use-bg="isUseBg">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Input
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :color="color"
            highlight
          />

          <B24Input
            :tag-color="color"
            tag="some text"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :color="color"
            highlight
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
              <B24Input
                name="some_value"
                placeholder="Insert value&hellip;"
                aria-label="Insert value"
                :color="color"
                highlight
              />

              <B24Input
                :tag-color="color"
                tag="some text"
                name="some_value"
                placeholder="Insert value&hellip;"
                aria-label="Insert value"
                :color="color"
                highlight
              />
            </div>
          </template>
        </template>
      </B24Collapsible>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Mask" type="dotted" />
  <B24Alert title="Memo" color="air-primary-warning" class="mb-4">
    <template #description>
      There's no built-in support for masks, but you can use libraries like <ProseA href="https://github.com/beholdr/maska" target="_blank"><ProseCode color="air-primary">maska</ProseCode></ProseA> to mask the Input.
    </template>
  </B24Alert>
  <ExampleGrid v-once>
    <ExampleCard title="mask" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-col gap-2 w-full max-w-[240px]">
        <B24Input
          v-maska="'#### #### #### ####'"
          placeholder="000 0000 0000 0000"
          :icon="CreditDebitCardIcon"
        />

        <div class="flex items-center gap-2">
          <B24Input
            v-maska="'##/##'"
            placeholder="MM/YY"
            :icon="CalendarIcon"
          />
          <B24Input
            v-maska="'###'"
            placeholder="CVC"
          />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Size" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="Some cases" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Input
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :icon="Search2Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :icon="Cross20Icon"
            trailing
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :icon="Search2Icon"
            :trailing-icon="Cross20Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :avatar="{ src: '/b24ui/demo/avatar/assistant.png' }"
            :trailing-icon="Cross20Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
