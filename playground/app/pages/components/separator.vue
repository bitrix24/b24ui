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
    <ExampleCard title="Bitrix24 UI">
      <div class="mt-4 flex flex-col gap-4">
        <div>
          <ProseP small accent="thick">
            An open source UI components corresponding to the Bitrix24 interface.
          </ProseP>
        </div>

        <B24Separator :icon="Bitrix24Icon" type="dashed" size="thick" />

        <div class="h-24 flex gap-4 items-center">
          <div class="flex-1 text-center">
            <ProseP>Blog</ProseP>
          </div>

          <B24Separator
            :avatar="{ src: '/avatar/assistant.png' }"
            decorative
            orientation="vertical"
            size="thick"
          />

          <div class="flex-1 text-center">
            <ProseP>Docs</ProseP>
          </div>

          <B24Separator decorative orientation="vertical" size="thick">
            <B24Avatar size="sm" src="/avatar/employee.png" />
          </B24Separator>

          <div class="flex-1 text-center">
            <ProseP>Source</ProseP>
          </div>
        </div>

        <B24Separator label="As simple as it gets" type="dotted" size="thick" />
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
          size="thick"
          :color="color"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="type">
      <div class="mt-4 flex flex-col gap-4">
        <B24Separator label="solid" type="solid" size="thick" />
        <B24Separator label="dashed" type="dashed" size="thick" />
        <B24Separator label="dotted" type="dotted" size="thick" />
        <B24Separator label="double" type="double" size="thick" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
