<script setup lang="ts">
import type { PageCardProps } from '@bitrix24/b24ui-nuxt'
import usePageMeta from './../../composables/usePageMeta'
import theme from '#build/b24ui/page-card'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'

usePageMeta.setPageTitle('PageCard')

const isUseBg = ref(false)

const colors = Object.keys(theme.variants.highlightColor)
const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation)

const attrs = reactive({
  variant: [theme.defaultVariants.variant]
})

const highlight = ref(false)
const highlightColor = ref<PageCardProps['highlightColor']>(theme.defaultVariants.highlightColor)

const orientation = ref('vertical' as keyof typeof theme.variants.orientation)
const reverse = ref(false)
</script>

<template>
  <B24PageGrid v-once class="lg:grid-cols-4 gap-5">
    <B24Card variant="outline">
      <template #header>
        <div class="flex flex-row items-center justify-between gap-2">
          <ProseH5 class="mb-0">
            Options
          </ProseH5>
          <B24Switch v-model="isUseBg" label="isUseBg" size="xs" />
        </div>
      </template>
      <div class="mb-4 flex flex-col gap-4">
        <B24Select v-model="attrs.variant" :items="variants" multiple />
        <B24Switch v-model="highlight" label="Highlight" />
        <B24Select v-model="highlightColor" :items="colors" />
        <B24Select v-model="orientation" :items="orientations" />
        <B24Switch v-model="reverse" label="Reverse" />
      </div>
    </B24Card>

    <Matrix v-slot="props" :attrs="attrs">
      <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'">
        <template #header>
          <ProseH5 class="mb-0">
            {{ [props?.variant].join(' ') }}
          </ProseH5>
        </template>
        <B24PageCard
          :icon="PaletteIcon"
          title="Design system"
          description="Build faster with Bitrix24 UI's CSS-first design system powered by Tailwind CSS and its semantic color system combined with a runtime configuration."
          to="https://bitrix24.github.io/b24ui/docs/getting-started/theme/design-system/"
          target="_blank"
          :highlight="highlight"
          :highlight-color="highlightColor"
          :orientation="orientation"
          :reverse="reverse"
          v-bind="props"
        >
          <Placeholder class="size-full aspect-video" />
        </B24PageCard>
      </B24Card>
    </Matrix>
  </B24PageGrid>
</template>
