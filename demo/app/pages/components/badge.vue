<script setup lang="ts">
import theme from '#build/b24ui/badge'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

usePageMeta.setPageTitle('Badge')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

function onClick() {
  alert('Some action alert')
}

function onCloseClick(event: MouseEvent) {
  const { target } = event
  if (target) {
    const parentNode = (target as HTMLElement).closest('span')
    if (parentNode) {
      parentNode.classList.add('invisible')

      setTimeout(() => {
        parentNode.classList.remove('invisible')
      }, 3000)
    }
  }
}
</script>

<template>
  <ExampleGrid v-once custom-grid-cols class="grid-cols-[repeat(auto-fill,minmax(412px,1fr))]">
    <ExampleCard title="color">
      <ExampleCardSubTitle title="default" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Badge
            size="xl"
            color="primary"
            label="Employee Name"
            :avatar="{ src: '/b24ui/demo/avatar/employee.png', text: 'Employee Name' }"
            use-fill
            use-link
            use-close
            :on-close-click="onCloseClick"
            @click="onClick"
          />
        </div>
      </div>

      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="`${color}`" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <B24Badge
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :label="`${depth}`"
            :depth="depth"
            size="lg"
          />
        </div>
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <B24Badge
            v-for="depth in depths"
            :key="depth"
            :color="color"
            :label="`fill / ${depth}`"
            :depth="depth"
            use-fill
            size="lg"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="size">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="`${size}`" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <B24Badge
            v-for="depth in depths"
            :key="depth"
            :size="size"
            :label="`${depth}`"
            :depth="depth"
          />
        </div>
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <B24Badge
            v-for="depth in depths"
            :key="depth"
            :size="size"
            :label="`fill / ${depth}`"
            :depth="depth"
            use-fill
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="variants">
      <ExampleCardSubTitle title="link" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          v-for="depth in depths"
          :key="depth"
          :label="`${depth}`"
          :depth="depth"
          use-link
        />
      </div>
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          v-for="depth in depths"
          :key="depth"
          :label="`fill / ${depth}`"
          :depth="depth"
          use-link
          use-fill
        />
      </div>

      <ExampleCardSubTitle title="close icon" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          v-for="depth in depths"
          :key="depth"
          :label="`${depth}`"
          :depth="depth"
          use-close
        />
      </div>
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          v-for="depth in depths"
          :key="depth"
          :label="`fill / ${depth}`"
          :depth="depth"
          use-close
          use-fill
        />
      </div>

      <ExampleCardSubTitle title="icon" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          v-for="depth in depths"
          :key="depth"
          :label="`${depth}`"
          :depth="depth"
          :icon="InfoIcon"
        />
      </div>
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          v-for="depth in depths"
          :key="depth"
          :label="`fill / ${depth}`"
          :depth="depth"
          :icon="InfoIcon"
          use-fill
          size="lg"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>

  <ExampleGrid v-once custom-grid-cols class="mt-xs grid-cols-[repeat(auto-fill,minmax(532px,1fr))]">
    <ExampleCard title="avatar">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-2">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`${size} ${depth}`"
              :depth="depth"
              :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
              use-close
              use-link
            />
          </div>
        </template>
      </template>
    </ExampleCard>

    <ExampleCard title="filled avatar">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <template v-for="size in sizes" :key="size">
          <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
            <B24Badge
              v-for="depth in depths"
              :key="depth"
              :color="color"
              :size="size"
              :label="`fill / ${size} / ${depth}`"
              :depth="depth"
              :avatar="{ src: '/b24ui/demo/avatar/assistant.png' }"
              use-close
              use-link
              use-fill
            />
          </div>
        </template>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
