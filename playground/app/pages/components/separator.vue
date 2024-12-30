<script setup lang="ts">
import theme from '#build/b24ui/separator'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

usePageMeta.setPageTitle('Separator')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="default">
      <div class="mt-4 flex flex-col gap-4">
        <div>
          <p class="font-b24-secondary text-black dark:text-base-150 text-h6 font-semibold">
            Bitrix24 UI
          </p>
          <p class="font-b24-primary text-sm text-base-500">
            An open source UI components corresponding to the Bitrix24 interface.
          </p>
        </div>

        <B24Separator :icon="Bitrix24Icon" type="dashed" />

        <div class="h-24 flex gap-4 items-center">
          <div class="flex-1 text-center text-black dark:text-base-150">
            Blog
          </div>

          <B24Separator
            :avatar="{ src: '/avatar/assistant.png' }"
            decorative
            orientation="vertical"
          />

          <div class="flex-1 text-center text-black dark:text-base-150">
            Docs
          </div>

          <B24Separator decorative orientation="vertical">
            <B24Avatar size="md" src="/avatar/employee.png" />
          </B24Separator>

          <div class="flex-1 text-center text-black dark:text-base-150">
            Source
          </div>
        </div>

        <B24Separator label="As simple as it gets" type="dotted" />
      </div>
    </ExampleCard>

    <ExampleCard title="size">
      <div class="mt-4 flex flex-col gap-4">
        <B24Separator
          v-for="size in sizes"
          :key="size"
          :size="size"
          :label="size as string"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color">
      <div class="mt-4 flex flex-col gap-4">
        <B24Separator
          v-for="color in colors"
          :key="color"
          :label="color as string"
          size="xl"
          :color="color"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="type">
      <div class="mt-4 flex flex-col gap-4">
        <B24Separator label="solid" type="solid" size="md" />
        <B24Separator label="dashed" type="dashed" size="md" />
        <B24Separator label="dotted" type="dotted" size="md" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
