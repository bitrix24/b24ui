<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
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
const highlightColor = ref(theme.defaultVariants.highlightColor)

const orientation = ref('vertical' as keyof typeof theme.variants.orientation)
const reverse = ref(false)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="options">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Select v-model="attrs.variant" :items="variants" multiple />
        <B24Switch v-model="highlight" label="Highlight" />
        <B24Select v-model="highlightColor" :items="colors" />
        <B24Select v-model="orientation" :items="orientations" />
        <B24Switch v-model="reverse" label="Reverse" />
      </div>
    </ExampleCard>

    <Matrix v-slot="props" :attrs="attrs" class="flex-col gap-4">
      <ExampleCard :title="[props?.variant].join(' ')" :use-bg="isUseBg" class="col-span-2">
        <B24Separator class="my-3" type="dotted" />
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
          class="data-[orientation=vertical]:w-80"
        >
          <Placeholder class="size-full aspect-video" />
        </B24PageCard>
      </ExampleCard>
    </Matrix>
  </ExampleGrid>
</template>
