<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/page-section'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import FormIcon from '@bitrix24/b24icons-vue/outline/FormIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/common-service/SettingsIcon'

const orientations = Object.keys(theme.variants.orientation)

const orientation = ref('vertical' as keyof typeof theme.variants.orientation)
const reverse = ref(false)

const links = ref<ButtonProps[]>([
  { label: 'Customize design system', icon: ArrowRightLIcon, to: 'https://bitrix24.github.io/b24ui/docs/getting-started/theme/design-system/', color: 'air-primary-alert' }
])
const features = ref([
  { title: 'CSS-first configuration', description: 'Define fonts, colors, and breakpoints with the @theme directive directly in your CSS. This makes your theme portable, maintainable and easy to customize.', icon: FormIcon },
  { title: 'Semantic color system', description: 'Configure 7 semantic color aliases (primary, secondary, success, info, warning, error, neutral) that describe the purpose of colors rather than specific values.', icon: PaletteIcon },
  { title: 'Runtime color configuration', description: 'Change at runtime through AppConfig without rebuilding your application, perfect for multi-tenant applications.', icon: SettingsIcon }
])
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="orientation" :items="orientations" />
      <B24Switch v-model="reverse" label="Reverse" />
    </template>

    <B24PageSection
      :icon="PaletteIcon"
      headline="Theme"
      title="Flexible design system"
      description="Build faster with Bitrix24 UI CSS-first design system powered by Tailwind CSS"
      :links="links"
      :features="features"
      :orientation="orientation"
      :reverse="reverse"
      class="min-h-0"
    >
      <Placeholder v-if="orientation === 'horizontal'" class="size-full min-h-96" />
    </B24PageSection>
  </PlaygroundPage>
</template>
