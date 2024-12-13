<script setup lang="ts">
/**
 * @todo add B24Input
 */
import theme from '#build/b24ui/button'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('ButtonGroup')

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const depths = Object.keys(theme.variants.depth) as Array<keyof typeof theme.variants.depth>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
</script>

<template>
  <ExampleGrid custom-grid-cols class="mb-2 grid-cols-[repeat(auto-fill,minmax(460px,1fr))]">
    <ExampleCard title="base">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <template v-for="depth in depths" :key="depth">
            <B24ButtonGroup>
              <B24Button :color="color" :depth="depth">Button</B24Button>
              <B24Button :color="color" :depth="depth" use-dropdown />
            </B24ButtonGroup>
          </template>
          <B24ButtonGroup>
            <B24Button rounded :color="color">Button</B24Button>
            <B24Button rounded :color="color" use-dropdown />
          </B24ButtonGroup>
        </div>
      </template>
      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup>
          <B24Button color="default" label="Button" />
          <B24Button color="default" label="Button" />
          <B24Button color="default" label="Button" />
          <B24Button color="default" use-dropdown />
        </B24ButtonGroup>
      </div>
      <ExampleCardSubTitle title="size && no-split" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup size="sm" no-split>
          <B24Button color="default" depth="light">
            Button
          </B24Button>
          <B24Button color="default" depth="normal">
            Button
          </B24Button>
          <B24Button color="default" depth="dark">
            Button
          </B24Button>
        </B24ButtonGroup>
      </div>

      <ExampleCardSubTitle title="vertical" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24ButtonGroup orientation="vertical">
          <B24Button color="success" depth="light" label="Button" />
          <B24Button color="success" depth="normal" label="Button" loading use-wait />
          <B24Button color="success" depth="dark" label="Button" />
        </B24ButtonGroup>
      </div>
    </ExampleCard>
  </ExampleGrid>
  <!-- div class="flex flex-col gap-4 items-center">
      <B24ButtonGroup>
        <B24Input placeholder="Search..." />
      </B24ButtonGroup

      <B24ButtonGroup orientation="vertical">
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
        <B24Input placeholder="Search..." />
      </B24ButtonGroup>

      <B24ButtonGroup>
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
        <B24Input placeholder="Search..." />
      </B24ButtonGroup>

      <B24ButtonGroup>
        <B24Input placeholder="Search..." />
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
      </B24ButtonGroup>
    <div class="flex gap-4 items-center justify-center">
      <B24ButtonGroup v-for="size in sizes" :key="size" :size="size">
        <B24Input placeholder="Search..." />
        <B24Button color="neutral" variant="outline">
          Button
        </B24Button>
      </B24ButtonGroup>
    </div>
  </div -->
</template>
