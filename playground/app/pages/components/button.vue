<script setup lang="ts">
/**
 * @todo remove  dd-color="neutral"
 */
import { upperFirst } from 'scule'
import theme from '#build/b24ui/button'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'

usePageMeta.setPageTitle('Button')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

function onClick() {
  return new Promise<void>(res => setTimeout(res, 5000))
}
</script>

<template>
  <ExampleGrid>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="class" />
      <div class="flex items-center justify-start gap-4">
        <B24Button class="font-bold">
          Button
        </B24Button>
      </div>
      <ExampleCardSubTitle title="link" />
      <div class="flex items-center justify-start gap-4">
        <B24Button to="/">
          Link
        </B24Button>
      </div>
      <ExampleCardSubTitle title="disabled" />
      <div class="flex items-center justify-start gap-4">
        <B24Button disabled>
          Disabled
        </B24Button>
        <B24Button to="#" disabled>
          Disabled Link
        </B24Button>
      </div>
      <ExampleCardSubTitle title="loading" />
      <div class="flex items-center justify-start gap-4">
        <B24Button loading>
          Loading
        </B24Button>
        <B24Button loading-auto @click="onClick">
          Loading auto
        </B24Button>
        <B24Button loading trailing>
          Loading trailing
        </B24Button>
      </div>
      <ExampleCardSubTitle title="Block" />
      <div class="flex items-center justify-start gap-4">
        <B24Button :icon="RocketIcon" :trailing-icon="ChevronDownIcon" label="Block" block />
      </div>
      <ExampleCardSubTitle title="group" />
      <div class="flex items-center justify-start gap-4">
        <B24Button
          :icon="DownloadDoubleIcon"
          label="Button"
          class="group"
          :b24ui="{ leadingIcon: 'group-hover:animate-pulse' }"
        />
      </div>
    </ExampleCard>
    <ExampleCard title="label" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :label="upperFirst(color as string)"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="label & icon" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :label="upperFirst(color as string)"
            :icon="RocketIcon"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="label & avatar" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :label="upperFirst(color as string)"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="icon" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :icon="RocketIcon"
            :label="upperFirst(color as string)"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="avatar" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            :label="upperFirst(color as string)"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="square icon" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :icon="RocketIcon"
            label="Square"
            square
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="square avatar" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            label="Square"
            square
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="no label & icon" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :icon="RocketIcon"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
    <ExampleCard title="no label & avatar" class="col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex items-center gap-4">
          <B24Button
            v-for="color in colors"
            :key="color"
            :avatar="{ src: 'https://github.com/IgorShevchik.png' }"
            :color="color"
            :size="size"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
