<script setup lang="ts">
// import { joinURL } from 'ufo'
import { navigateTo, useColorMode } from '#imports'
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

const colorMode = useColorMode()
const isDark = computed(() => {
  return colorMode.value === 'dark'
})
const isMounted = ref(false)
const cardColorContext = computed(() => {
  if (import.meta.server || !isMounted.value) {
    return 'light'
  }
  return isDark.value ? 'dark' : 'light'
})

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <B24DashboardPanel
    id="home"
    :b24ui="{ body: 'items-stretch justify-between scrollbar-transparent' }"
  >
    <template #header>
      <Header />
    </template>

    <template #body>
      <B24Card
        v-if="page"
        as="main"
        class="min-h-[calc(100%-100px)]"
        :class="cardColorContext"
        :b24ui="{
          body: 'min-h-[300px] h-full flex flex-col gap-5 items-center justify-stretch lg:justify-center'
        }"
      >
        <div class="w-full flex-1 flex flex-col text-center">
          <ProseH1 class="mt-[24px] mb-0 leading-(--ui-font-line-height-3xs)">
            <span class="text-(--ui-color-accent-main-primary)">@bitrix24/b24ui</span> <br>Bitrix24 UI-Kit
          </ProseH1>
          <ProseP>
            {{ page.hero.description }}
          </ProseP>
          <B24Separator class="my-4" type="dashed" />
          <div class="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-2">
            <B24Button
              v-for="link of page.hero.links"
              :key="link.label"
              v-bind="link"
              size="md"
              :icon="iconFromIconName(link?.iconName)"
            />
          </div>
        </div>
        <div class="w-full flex-1 flex flex-col text-center">
          <ComponentExample
            name="IndexPromoV1"
            :source="false"
            class="w-full"
          />
          <div class="mb-4 -mt-4">
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
        </div>
      </B24Card>

      <Footer />
    </template>
  </B24DashboardPanel>
</template>
