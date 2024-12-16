<script setup lang="ts">
import { upperFirst } from 'scule'
import theme from '#build/b24ui/input'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import FolderEmptyIcon from '@bitrix24/b24icons-vue/main/FolderEmptyIcon'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import CrossedEye2Icon from '@bitrix24/b24icons-vue/main/CrossedEye2Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'

usePageMeta.setPageTitle('Input')

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const tagColors = Object.keys(theme.variants.tagColor) as Array<keyof typeof theme.variants.tagColor>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="autofocus" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input autofocus placeholder="Search..." class="w-3/4" />
      </div>
      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          v-for="color in colors"
          :key="color"
          :color="color"
          underline
          placeholder="Search..."
          class="w-3/4"
        />
      </div>
      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input no-border placeholder="Search..." class="w-3/4" />
      </div>
      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input no-padding placeholder="Search..." class="w-3/4" />
      </div>
      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input placeholder="Insert value ..." highlight color="danger" class="w-3/4" />
      </div>
      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input placeholder="Disabled" disabled />
        <B24Input placeholder="Required" required />
        <B24Input placeholder="Rounded" rounded :icon="ALetterIcon" :trailing-icon="TaskIcon" />
      </div>
      <ExampleCardSubTitle title="type" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input type="text" :icon="ALetterIcon" />
        <B24Input type="number" :icon="CalculatorIcon" :model-value="10" />
        <B24Input type="password" :icon="CrossedEye2Icon" model-value="password" />
        <B24Input type="search" :icon="Search2Icon" />
        <B24Input type="file" :icon="FolderEmptyIcon" size="xs" />
        <B24Input type="file" :icon="FolderEmptyIcon" size="sm" />
        <B24Input type="file" :icon="FolderEmptyIcon" />
        <B24Input type="file" :icon="FolderEmptyIcon" size="lg" />
        <!-- / @memo types are supported but not used
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
        / -->
      </div>
    </ExampleCard>
    <ExampleCard title="loading">
      <ExampleCardSubTitle title="loading" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input loading placeholder="Search..." class="w-3/4" />
        <B24Input loading trailing placeholder="Search..." class="w-3/4" />
        <B24Input loading :icon="RocketIcon" :trailing-icon="TaskIcon" placeholder="Search..." class="w-3/4" />
        <B24Input loading :avatar="{ src: 'https://github.com/IgorShevchik.png' }" placeholder="Search..." class="w-3/4" />
      </div>
    </ExampleCard>
    <ExampleCard title="color">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Input
            placeholder="Search..."
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
          <B24Input :tag-color="tagColor" tag="some text" placeholder="Search..." class="w-3/4" />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="size" class="sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Input placeholder="Search..." :size="size" class="w-40" />
          <B24Input :icon="Search2Icon" placeholder="Search..." :size="size" class="w-40" />
          <B24Input :icon="Cross20Icon" trailing placeholder="Search..." :size="size" class="w-40" />
          <B24Input :icon="Search2Icon" :trailing-icon="Cross20Icon" placeholder="Search..." :size="size" class="w-40" />
          <B24Input :avatar="{ src: 'https://github.com/IgorShevchik.png' }" placeholder="Search..." :size="size" class="w-40" />
          <B24Input :avatar="{ src: 'https://github.com/IgorShevchik.png' }" :trailing-icon="Cross20Icon" placeholder="Search..." :size="size" class="w-40" />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>

  <!-- div class="flex flex-col items-center gap-4">
    <div class="flex flex-col gap-4 w-3/4">
      <B24Input loading placeholder="Search..." />
      <B24Input loading trailing placeholder="Search..." />
      <B24Input loading icon="i-lucide-search" trailing-icon="i-lucide-chevron-down" placeholder="Search..." />
    </div>
  </div -->
</template>
