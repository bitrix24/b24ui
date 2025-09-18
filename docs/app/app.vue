<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const appConfig = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework', 'category', 'description']))
// const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
//   server: false
// })
// const searchLinks = useSearchLinks()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'canonical', href: `https://bitrix24.github.io/b24ui${withoutTrailingSlash(route.path)}` }
  ],
  style: [],
  htmlAttrs: {
    lang: 'en'
  }
  // bodyAttrs: {
  //   class: `edge-dark`
  // }
})

useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

// const { frameworks } = useFrameworks()
const { rootNavigation } = useNavigation(navigation)
// const { links } = useSearch()

provide('navigation', rootNavigation)
</script>

<template>
  <B24App :toaster="appConfig.toaster">
    <NuxtLoadingIndicator color="var(--ui-color-accent-main-primary)" :height="2" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </B24App>
</template>
