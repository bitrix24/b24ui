<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const route = useRoute()
const appConfig = useAppConfig()
const config = useRuntimeConfig()
const { isEnabled: isAssistantEnabled, panelWidth: assistantPanelWidth, shouldPushContent } = useAssistant()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework', 'category', 'description', 'badge']))
const { data: files } = useLazyAsyncData(
  'search',
  async () => {
    const data = await queryCollectionSearchSections('docs', {
      ignoredTags: ['style']
    })

    return data.map((file) => {
      return {
        ...file,
        id: file.id.replace(/([^/])(#.*)?$/, (_, char, hash = '') => `${char}/${hash}`)
      }
    })
  },
  {
    server: false
  }
)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(route.path)}` }
  ],
  style: [],
  htmlAttrs: { lang: 'en', class: '' }
})

useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

const { rootNavigation, navigationByFramework } = useNavigation(navigation)
provide('navigation', rootNavigation)
provide('files', files)
</script>

<template>
  <B24App :toaster="appConfig.toaster">
    <NuxtLoadingIndicator color="var(--ui-color-design-filled-warning-bg)" :height="3" />

    <div
      :class="[
        route.path.startsWith('/docs/') && 'root',
        'transition-[margin-right] duration-200 ease-linear will-change-[margin-right]'
        // { 'docus-sub-header': subNavigationMode === 'header' }
      ]"
      :style="{ marginRight: shouldPushContent ? `${assistantPanelWidth}px` : '0' }"
    >
      <template v-if="!route.path.startsWith('/examples')">
        <Banner />

        <Header />
      </template>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <template v-if="!route.path.startsWith('/examples')">
        <Footer />

        <ClientOnly>
          <Search :files="files" :navigation="navigationByFramework" />
          <template v-if="isAssistantEnabled">
            <LazyAssistantPanel />
            <LazyAssistantFloatingInput />
          </template>
        </ClientOnly>
      </template>
    </div>
  </B24App>
</template>

<style>
/* Safelist (do not remove): air-custom-bg [&>div]:*:my-0 [&>div]:*:w-full h-176 h-64 !px-0 !py-0 !pt-0 !pb-0 !p-0 p-0! !justify-start !justify-end !min-h-96 h-136 !min-h-98 h-140 max-h-[341px] max-w-[1000px] scrollbar-thin */

@media (min-width: 1024px) {
  .root {
    --b24ui-header-height: 112px;
  }
}
</style>
