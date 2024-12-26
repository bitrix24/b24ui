<script setup lang="ts">
import theme from '#build/b24ui/badge'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

usePageMeta.setPageTitle('Range')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

function onCloseClick(event: MouseEvent) {
  const parentNode = event.target.parentElement
 if(!!parentNode)
 {
   parentNode.classList.add('invisible')
   setTimeout(() => {
     parentNode.classList.remove('invisible')
   }, 3000)
 }
}
</script>

<template>
  <ExampleGrid v-once custom-grid-cols class="grid-cols-[repeat(auto-fill,minmax(412px,1fr))]">
    <ExampleCard title="default">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="`${color}`" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`${size} ${depth}`"
              :depth="depth"
            />
          </div>
        </template>
      </template>
    </ExampleCard>

    <ExampleCard title="fill">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="`${color}`" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`${size} ${depth}`"
              :depth="depth"
              use-fill
            />
          </div>
        </template>
      </template>
    </ExampleCard>

    <ExampleCard title="icon">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`${size} ${depth}`"
              :depth="depth"
              :icon="InfoIcon"
              to="/"
            />
          </div>
        </template>
      </template>
    </ExampleCard>

    <ExampleCard title="icon fill">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`${size} ${depth}`"
              :depth="depth"
              :icon="InfoIcon"
              use-fill
              use-close
              :onCloseClick="onCloseClick"
              to="/"
            />
          </div>
        </template>
      </template>
    </ExampleCard>

    <ExampleCard title="avatar">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`${size} ${depth}`"
              :depth="depth"
              :avatar="{ src: '/avatar/employee.png' }"
              to="/"
            />
          </div>
        </template>
      </template>
    </ExampleCard>

    <ExampleCard title="avatar fill">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`${size} ${depth}`"
              :depth="depth"
              :avatar="{ src: '/avatar/employee.png' }"
              use-fill
              use-close
              :onCloseClick="onCloseClick"
              to="/"
            />
          </div>
        </template>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
