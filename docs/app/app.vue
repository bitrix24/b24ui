<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const appConfig = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework', 'category']))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

const links = useHeaderLinks()
const searchLinks = useSearchLinks()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    // @todo test this
    { rel: 'canonical', href: `https://bitrix24.github.io${withoutTrailingSlash(route.path)}` }
  ],
  style: [],
  htmlAttrs: {
    lang: 'en'
  }
})

// @todo test this
useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

const { frameworks } = useSharedData()
const { mappedNavigation, filteredNavigation } = useContentNavigation(navigation)

provide('navigation', mappedNavigation)
</script>

<template>
  <B24App :toaster="appConfig.toaster">
    <NuxtLoadingIndicator color="var(--ui-color-accent-main-primary)" :height="2" />

    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <template v-if="!route.path.startsWith('/examples')">
        <Header :links="links" />
      </template>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <template v-if="!route.path.startsWith('/examples')">
        <Footer />
        <!-- / @todo test this / -->
        <ClientOnly>
          <LazyUContentSearch
            :links="searchLinks"
            :files="files"
            :groups="[{
              id: 'framework',
              label: 'Framework',
              items: frameworks
            }]"
            :navigation="filteredNavigation"
            :fuse="{ resultLimit: 120 }"
          />
        </ClientOnly>
      </template>
    </div>
  </B24App>
</template>

<style>
/* Safelist (do not remove): [&>div]:*:my-0 [&>div]:*:w-full h-64 !px-0 !py-0 !pt-0 !pb-0 !p-0 !justify-start !justify-end !min-h-96 h-136 max-h-[341px] */

@media (min-width: 1024px) {
  .root {
    --ui-header-height: 113px;
  }
}
</style>
