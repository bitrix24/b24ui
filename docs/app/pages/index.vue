<script setup lang="ts">
// import { joinURL } from 'ufo'
import { navigateTo } from '#imports'
import EncloseTextInCodeTagIcon from '@bitrix24/b24icons-vue/editor/EncloseTextInCodeTagIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Bitrix24 UI`,
  ogDescription: page.value.description
})

const iconFromIconName = (iconName?: string) => {
  if (!iconName) {
    return undefined
  }

  switch (iconName) {
    case 'EncloseTextInCodeTagIcon': return EncloseTextInCodeTagIcon
    case 'InfoCircleIcon': return InfoCircleIcon
    case 'PlayLIcon': return PlayLIcon
    case 'DemonstrationOnIcon': return DemonstrationOnIcon
  }

  return undefined
}
</script>

<template>
  <main v-if="page">
    <B24Container class="px-[22px] lg:px-8 py-10 sm:py-16 lg:py-24 relative flex flex-col items-start sm:items-center justify-center gap-[20px]">
      <h1 class="relative text-label sm:text-center text-5xl sm:text-8xl font-bold mb-0">
        @bitrix24/b24ui <br> Bitrix24 UI-Kit
      </h1>

      <div class="sm:text-center sm:text-4xl mb-2 last:mb-0 text-pretty text-(length:--ui-font-size-xl) leading-(--ui-font-line-height-lg) text-label">
        {{ page.hero.description }}
      </div>

      <B24Separator class="my-4" type="dashed" accent="accent" />
      <div class="mt-2 flex flex-wrap items-start sm:items-center gap-4">
        <B24Button
          v-for="link of page.hero.links"
          :key="link.label"
          v-bind="link"
          size="md"
          :icon="iconFromIconName(link?.iconName)"
        />
      </div>
    </B24Container>

    <B24PageSection :b24ui="{ container: 'py-10 sm:py-10 lg:py-10 gap-0 sm:gap-0' }">
      <ComponentExample
        name="IndexPromoV1"
        :source="false"
        class="rounded-t w-full bg-(--ui-color-design-outline-bg-alt) backdrop-blur-md"
      />
      <div>
        <B24Badge
          label="source"
          use-link
          color="air-tertiary"
          @click.prevent="navigateTo({
            path: 'https://github.com/bitrix24/b24ui/blob/main/docs/app/components/content/examples/index/IndexPromoV1.vue',
            query: {}
          }, {
            external: true,
            open: { target: '_blank' }
          })"
        />
      </div>
    </B24PageSection>
  </main>
</template>
