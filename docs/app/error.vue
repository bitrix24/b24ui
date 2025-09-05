<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework']))
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
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: String(props.error.statusCode)
})

useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

const { frameworks } = useSharedData()
const { mappedNavigation, filteredNavigation } = useContentNavigation(navigation)

provide('navigation', mappedNavigation)
</script>

<template>
  <B24App>
    <NuxtLoadingIndicator color="#FFF" />

    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <div Header :links="links" />

      <div B24Error :error="error" />

      <div Footer />

      <ClientOnly>
        <div LazyB4ContentSearch
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
    </div>
  </B24App>
</template>
