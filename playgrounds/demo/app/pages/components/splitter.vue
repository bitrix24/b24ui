<script setup lang="ts">
import theme from '#build/b24ui/splitter'
import type { SplitterItem } from '@bitrix24/b24ui-nuxt'

const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const orientation = ref(orientations[0] as keyof typeof theme.variants.orientation)
const disabled = ref(false)

const panel = 'bg-(--ui-color-bg-content-secondary) border border-(--ui-color-divider-default) rounded-(--ui-border-radius-md) items-center justify-center text-description font-(--ui-font-weight-medium)'

const items = computed<SplitterItem[]>(() => [
  { slot: 'a', minSize: 20, class: panel },
  { slot: 'bc', minSize: 20 }
])

const nested = computed<SplitterItem[]>(() => [
  { slot: 'b', minSize: 20, class: panel },
  { slot: 'c', minSize: 20, class: panel }
])
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'block' }">
    <template #controls>
      <B24Select v-model="orientation" class="w-40" :items="orientations" placeholder="Orientation" size="xs" />
      <B24Switch v-model="disabled" label="Disabled" size="xs" />
    </template>

    <B24Splitter
      id="splitter-playground"
      :items="items"
      :orientation="orientation"
      :disabled="disabled"
      class="w-full h-[420px]"
    >
      <template #a>
        Panel A
      </template>

      <template #bc>
        <B24Splitter
          id="splitter-playground-nested"
          :items="nested"
          :orientation="orientation === 'horizontal' ? 'vertical' : 'horizontal'"
        >
          <template #b>
            Panel B
          </template>

          <template #c>
            Panel C
          </template>
        </B24Splitter>
      </template>
    </B24Splitter>
  </PlaygroundPage>
</template>
