<script setup lang="ts">
import { upperFirst } from 'scule'
import theme from '#build/b24ui/badge'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

usePageMeta.setPageTitle('Range')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="tmp" class="col-span-4">
      <ExampleCardSubTitle title="tmp2" />
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <B24Badge class="font-bold">
            Badge
          </B24Badge>
        </div>
        <div class="flex items-center gap-2">
          <B24Badge
            v-for="depth in depths"
            :key="depth"
            :icon="RocketIcon"
            :label="upperFirst(depth)"
            :depth="depth"
          />
        </div>
        <div class="flex items-center gap-2">
          <B24Badge
            v-for="depth in depths"
            :key="depth"
            :icon="RocketIcon"
            :label="upperFirst(depth)"
            :depth="depth"
            color="neutral"
          />
        </div>
        <div class="flex items-center gap-2">
          <B24Badge
            v-for="depth in depths"
            :key="depth"
            :avatar="{ src: '/avatar/employee.png' }"
            :label="upperFirst(depth)"
            :depth="depth"
            color="neutral"
          />
        </div>
        <div class="flex items-center gap-2">
          <B24Badge v-for="size in sizes" :key="size" label="Badge" :size="size" />
        </div>
        <div class="flex items-center gap-2">
          <B24Badge v-for="size in sizes" :key="size" :icon="RocketIcon" label="Badge" :size="size" />
        </div>
        <div class="flex items-center gap-2">
          <B24Badge v-for="size in sizes" :key="size" :avatar="{ src: '/avatar/assistant.png' }" label="Badge" :size="size" />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
