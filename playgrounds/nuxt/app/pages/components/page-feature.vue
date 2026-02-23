<script setup lang="ts">
import theme from '#build/b24ui/page-feature'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'

const orientations = Object.keys(theme.variants.orientation)

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="orientation" :items="orientations" />
    </template>

    <B24PageFeature
      title="Theme"
      description="Customize Nuxt UI with your own colors, fonts, and more."
      :icon="PaletteIcon"
      :orientation="orientation"
      to="https://ui.nuxt.com/docs/getting-started/theme/design-system"
      target="_blank"
    />
  </PlaygroundPage>
</template>
