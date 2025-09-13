<script setup lang="ts">
import { joinURL } from 'ufo'
import EncloseTextInCodeTagIcon from '@bitrix24/b24icons-vue/editor/EncloseTextInCodeTagIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'

useHead({
  bodyAttrs: {
    class: `edge-dark`
  }
})

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { url } = useSiteConfig()

useSeoMeta({
  titleTemplate: `%s - Bitrix24 UI`,
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Bitrix24 UI`,
  ogDescription: page.value.description,
  // @todo fix this
  ogImage: joinURL(url, '/b24ui/og-image.png')
})

const iconFromIconName = (iconName?: string) => {
  if (!iconName) {
    return undefined
  }

  switch (iconName) {
    case 'EncloseTextInCodeTagIcon': return EncloseTextInCodeTagIcon
    case 'InfoCircleIcon': return InfoCircleIcon
  }

  return undefined
}
</script>

<template>
  <B24SidebarLayout
    :use-light-content="false"
  >
    <template #navbar>
      <Header show-logo-all-time />
    </template>

    <div v-if="page" class="mt-[22px] light bg-(--ui-color-design-outline-na-bg) overflow-hidden h-auto py-[10px] lg:h-[calc(100vh-200px)] rounded-[24px] grid content-center lg:grid-cols-12 gap-y-[54px] lg:gap-[22px]  items-center justify-between">
      <div class="col-span-12 lg:col-start-2 lg:col-span-4 flex flex-col gap-[12px] text-center lg:text-right">
        <ProseH1 class="mb-0 leading-(--ui-font-line-height-3xs)">
          <span class="text-primary">@bitrix24/b24ui</span> <br>Bitrix24 UI-Kit
        </ProseH1>
        <ProseP>
          {{ page.hero.description }}
        </ProseP>
        <B24Separator class="my-4" type="dashed" />
        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-[6px]">
          <B24Button
            v-for="link of page.hero.links"
            :key="link.label"
            v-bind="link"
            size="md"
            :icon="iconFromIconName(link?.iconName)"
          />
        </div>
      </div>
      <div class="col-span-12 lg:col-end-11 lg:col-span-5">
        <PromoV1 />
      </div>
    </div>

    <template #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
