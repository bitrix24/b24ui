<script setup lang="ts">
import theme from '#build/b24ui/page-card'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'

const colors = Object.keys(theme.variants.highlightColor)
const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const attrs = reactive({
  variant: [theme.defaultVariants.variant]
})

const singleAttrs = reactive({
  orientation: orientations[1],
  reverse: false,
  highlight: false,
  highlightColor: theme.defaultVariants.highlightColor
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.variant" class="w-32" :items="variants" multiple placeholder="Variant" />
      <B24Select v-model="singleAttrs.highlightColor" class="w-44" :items="colors" placeholder="Highlight color" />
      <B24Select v-model="singleAttrs.orientation" class="w-44" :items="orientations" placeholder="Orientation" />

      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.reverse" label="Reverse" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'grow-0' }">
      <B24PageCard
        :icon="PaletteIcon"
        title="Design system"
        description="Build faster with Bitrix24 UI's CSS-first design system powered by Tailwind CSS and its semantic color system combined with a runtime configuration."
        to="https://bitrix24.github.io/b24ui/docs/getting-started/theme/design-system/"
        target="_blank"
        v-bind="{ ...props, ...singleAttrs }"
        class="data-[orientation=vertical]:max-w-80"
      >
        <Placeholder class="size-full aspect-video" />
      </B24PageCard>
    </Matrix>
  </PlaygroundPage>
</template>
